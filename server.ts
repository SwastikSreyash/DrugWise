import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config();

const app = express();
app.use(express.json({ limit: '10mb' }));

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || '',
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

export interface DrugDetails {
  brandName?: string;
  genericName?: string;
  manufacturer?: string;
  activeIngredients?: string;
  purpose?: string;
  indications?: string;
  sideEffects?: string;
  warnings?: string;
  dosage?: string;
  summary?: string;
  source: 'openFDA' | 'Gemini AI' | 'openFDA + Gemini AI';
}

// Fetch details from openFDA API
async function fetchOpenFdaData(medicineQuery: string): Promise<Partial<DrugDetails> | null> {
  try {
    const apiKey = process.env.OPENFDA_API_KEY ? `&api_key=${process.env.OPENFDA_API_KEY}` : '';
    const cleanQuery = medicineQuery.trim().replace(/[^a-zA-Z0-9\s]/g, '');
    if (!cleanQuery) return null;

    const searchParam = `openfda.brand_name:"${cleanQuery}"+OR+openfda.generic_name:"${cleanQuery}"+OR+brand_name:"${cleanQuery}"+OR+generic_name:"${cleanQuery}"+OR+openfda.substance_name:"${cleanQuery}"`;
    const url = `https://api.fda.gov/drug/label.json?search=${encodeURIComponent(searchParam)}&limit=1${apiKey}`;

    const res = await fetch(url);
    if (!res.ok) {
      // Try a looser search if exact field search returned 404
      const fallbackUrl = `https://api.fda.gov/drug/label.json?search=${encodeURIComponent(cleanQuery)}&limit=1${apiKey}`;
      const fallbackRes = await fetch(fallbackUrl);
      if (!fallbackRes.ok) return null;
      const fallbackData = await fallbackRes.json();
      return parseOpenFdaResult(fallbackData);
    }

    const data = await res.json();
    return parseOpenFdaResult(data);
  } catch (err) {
    console.error('Error fetching openFDA API:', err);
    return null;
  }
}

function parseOpenFdaResult(data: any): Partial<DrugDetails> | null {
  if (!data.results || data.results.length === 0) return null;
  const item = data.results[0];
  const openfda = item.openfda || {};

  const cleanText = (arr?: string[]) => {
    if (!arr || arr.length === 0) return undefined;
    return arr.join('\n\n').replace(/^[0-9\.\s]*[A-Z\s]+:\s*/, '');
  };

  return {
    brandName: openfda.brand_name?.[0] || openfda.substance_name?.[0],
    genericName: openfda.generic_name?.[0],
    manufacturer: openfda.manufacturer_name?.[0],
    activeIngredients: cleanText(item.active_ingredient) || cleanText(item.active_ingredient_table),
    purpose: cleanText(item.purpose),
    indications: cleanText(item.indications_and_usage),
    sideEffects: cleanText(item.adverse_reactions),
    warnings: cleanText(item.warnings) || cleanText(item.warnings_and_cautions),
    dosage: cleanText(item.dosage_and_administration),
    source: 'openFDA'
  };
}

// Search endpoint supporting openFDA + Gemini AI
app.post('/api/lookup', async (req, res) => {
  const { medicine } = req.body;
  if (!medicine || typeof medicine !== 'string') {
    return res.status(400).json({ error: 'Please enter a valid medicine name.' });
  }

  try {
    // 1. First, attempt openFDA Lookup
    const fdaData = await fetchOpenFdaData(medicine);

    // 2. If Gemini API key is available, use Gemini to refine or synthesize missing details
    let aiSummary = '';
    if (process.env.GEMINI_API_KEY) {
      try {
        const prompt = fdaData 
          ? `Summarize the key information for the medicine "${medicine}" based on this official FDA record:
             Brand: ${fdaData.brandName || medicine}
             Generic: ${fdaData.genericName || 'N/A'}
             Active Ingredients: ${fdaData.activeIngredients || 'N/A'}
             Indications/Uses: ${fdaData.indications || 'N/A'}
             Side Effects: ${fdaData.sideEffects || 'N/A'}
             Warnings: ${fdaData.warnings || 'N/A'}
             Provide a 2-sentence patient-friendly summary and highlight any major warnings.`
          : `Provide detailed medical information for "${medicine}" in JSON format with fields: activeIngredients, indications (what it treats/uses), sideEffects (adverse reactions), warnings, dosage.`;

        const response = await ai.models.generateContent({
          model: 'gemini-flash-latest',
          contents: prompt,
        });

        aiSummary = response.text || '';
      } catch (geminiErr) {
        console.error('Gemini synthesis warning:', geminiErr);
      }
    }

    if (fdaData) {
      const result: DrugDetails = {
        brandName: fdaData.brandName || medicine,
        genericName: fdaData.genericName,
        manufacturer: fdaData.manufacturer,
        activeIngredients: fdaData.activeIngredients || 'Consult product package or doctor.',
        purpose: fdaData.purpose,
        indications: fdaData.indications || 'Treats conditions as prescribed by healthcare provider.',
        sideEffects: fdaData.sideEffects || 'Consult product label or physician for side effects.',
        warnings: fdaData.warnings || 'Keep out of reach of children. Use as directed.',
        dosage: fdaData.dosage,
        summary: aiSummary,
        source: process.env.GEMINI_API_KEY ? 'openFDA + Gemini AI' : 'openFDA'
      };
      return res.json(result);
    }

    // 3. Fallback if openFDA doesn't have the exact record (e.g. non-US or brand name variant)
    if (process.env.GEMINI_API_KEY) {
      const aiResponse = await ai.models.generateContent({
        model: 'gemini-flash-latest',
        contents: `You are a medical pharmacology assistant. Provide detailed information for "${medicine}" in raw JSON format with strictly these keys:
        {
          "brandName": string,
          "genericName": string,
          "activeIngredients": string,
          "purpose": string,
          "indications": string,
          "sideEffects": string,
          "warnings": string,
          "dosage": string
        }`,
      });

      const text = aiResponse.text || '';
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        const result: DrugDetails = {
          ...parsed,
          source: 'Gemini AI'
        };
        return res.json(result);
      } else {
        const result: DrugDetails = {
          brandName: medicine,
          activeIngredients: text,
          indications: 'Information generated via AI search.',
          source: 'Gemini AI'
        };
        return res.json(result);
      }
    }

    return res.status(444).json({
      error: `No records found in openFDA for "${medicine}". Please check spelling or configure GEMINI_API_KEY for expanded AI search.`
    });

  } catch (error) {
    console.error('Lookup Error:', error);
    res.status(500).json({ error: 'Failed to lookup drug details: ' + (error instanceof Error ? error.message : 'Unknown error') });
  }
});

// Image OCR Label Scanning endpoint using Gemini Vision
app.post('/api/lookup-image', async (req, res) => {
  const { imageBase64, mimeType } = req.body;
  if (!imageBase64) {
    return res.status(400).json({ error: 'No image provided.' });
  }

  if (!process.env.GEMINI_API_KEY) {
    return res.status(500).json({ error: 'GEMINI_API_KEY is required for label image analysis.' });
  }

  try {
    const imagePart = {
      inlineData: {
        data: imageBase64.replace(/^data:image\/\w+;base64,/, ''),
        mimeType: mimeType || 'image/jpeg',
      },
    };

    const textPart = {
      text: 'Examine this medicine prescription or label image. Identify the brand name, generic name, active ingredients, dosage, and warnings. Return JSON with keys: medicineName, activeIngredients, indications, sideEffects, warnings.',
    };

    const response = await ai.models.generateContent({
      model: 'gemini-flash-latest',
      contents: { parts: [imagePart, textPart] },
    });

    const text = response.text || '';
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    let extractedName = '';
    let details: Partial<DrugDetails> = {};

    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      extractedName = parsed.medicineName || parsed.brandName || '';
      details = {
        brandName: parsed.medicineName || parsed.brandName,
        genericName: parsed.genericName,
        activeIngredients: parsed.activeIngredients,
        indications: parsed.indications,
        sideEffects: parsed.sideEffects,
        warnings: parsed.warnings,
        source: 'Gemini AI'
      };
    }

    // Attempt openFDA lookup if a medicine name was recognized
    if (extractedName) {
      const fdaData = await fetchOpenFdaData(extractedName);
      if (fdaData) {
        return res.json({
          detectedMedicine: extractedName,
          ...fdaData,
          activeIngredients: fdaData.activeIngredients || details.activeIngredients,
          source: 'openFDA + Gemini AI'
        });
      }
    }

    return res.json({
      detectedMedicine: extractedName || 'Label Analyzed',
      ...details,
      source: 'Gemini AI'
    });

  } catch (error) {
    console.error('OCR Error:', error);
    res.status(500).json({ error: 'Failed to analyze label image: ' + (error instanceof Error ? error.message : 'Unknown error') });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
  }

  app.listen(3000, () => {
    console.log('Server running on port 3000');
  });
}

startServer();

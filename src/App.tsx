import { useState, ChangeEvent } from 'react';
import { Search, Bell, Plus, Check, User, Camera, ShieldCheck, AlertTriangle, Pill, Activity, Info, FileText, TrendingUp, Calendar, Flame, CheckCircle2, XCircle, Sparkles, ChevronDown, ChevronUp, Copy, CheckCheck } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';
import { motion, AnimatePresence } from 'motion/react';

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
  source?: string;
  detectedMedicine?: string;
}

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  
  return (
    <div className="flex flex-col min-h-screen bg-[#f5f2eb] text-[#1c1d1b] font-sans selection:bg-[#224438] selection:text-white antialiased">
      {/* Sleek Top Navigation Contract */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-[#e5e0d4] bg-[#faf8f5]/90 backdrop-blur-xl sticky top-0 z-40 shadow-sm">
        <a href="/" className="flex items-center gap-3 group">
          <div className="relative">
            <img src="/src/assets/images/drugwise_logo_1793199238160.jpg" alt="DrugWise Logo" className="w-10 h-10 rounded-2xl border border-[#224438]/20 object-cover shadow-sm group-hover:scale-105 transition-transform" />
            <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-[#224438] rounded-full border-2 border-[#faf8f5]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-black tracking-tight text-[#1c3a32] italic">DrugWise</span>
            </div>
            <p className="text-[11px] text-[#6e6a5f] font-medium">Smart Pharmacology & Adherence Engine</p>
          </div>
        </a>

        <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-[#6e6a5f]">
          <span className="text-[#224438] flex items-center gap-1 font-bold"><Sparkles size={14} /> AI Active</span>
          <span>·</span>
          <span>FDA Label DB Sync</span>
        </div>
      </header>
      
      <main className="flex-1 pb-24">
        {/* Dynamic Hero Section */}
        <div className="relative h-60 md:h-72 w-full overflow-hidden">
          <img src="/src/assets/images/wellness_activity_lifestyle_1793199796881.jpg" alt="Wellness Lifestyle" className="w-full h-full object-cover filter brightness-[0.75] contrast-[1.05]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1c2d26] via-[#1c2d26]/60 to-transparent flex flex-col justify-end p-6 md:p-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-2"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#224438]/40 backdrop-blur-md border border-[#cbe0d3]/30 text-[#e0f0e6] rounded-full text-xs font-bold tracking-wide">
                <ShieldCheck size={14} /> Official FDA Pharmacology Data
              </div>
              <h1 className="text-3xl md:text-4xl font-black tracking-tight italic text-white leading-tight">
                Drug Safety, Ingredients & Adherence
              </h1>
              <p className="text-xs md:text-sm text-[#e5ebd8] max-w-xl font-medium leading-relaxed">
                Lookup active ingredients, side effects, and warnings from official FDA labels, and track weekly medication adherence with real-time analytics.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Dynamic Tab Body Container */}
        <div className="p-4 md:p-6 space-y-6 max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            {activeTab === 'home' && (
              <motion.div 
                key="home"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                <IngredientLookup />
                
                {/* Visual Showcase Card */}
                <div className="rounded-3xl border border-[#e5e0d4] bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="relative h-44 overflow-hidden">
                    <img src="/src/assets/images/medicine_pills_close_up_1793199796438.jpg" alt="Medicine" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
                  </div>
                  <div className="p-6 space-y-2">
                    <div className="flex items-center gap-2 text-[#224438] text-xs font-bold uppercase tracking-wider">
                      <ShieldCheck size={16} /> Verified openFDA Records
                    </div>
                    <h3 className="font-bold text-lg text-[#1c1d1b]">Full Product Labeling & Function Insights</h3>
                    <p className="text-[#6e6a5f] text-xs md:text-sm leading-relaxed">
                      Search any brand or generic medication to view FDA-mandated usage indications, exact active ingredients, warnings, adverse reactions, and dosage schedules.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'reminders' && (
              <motion.div 
                key="reminders"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                <Reminders />
              </motion.div>
            )}

            {activeTab === 'profile' && (
              <motion.div 
                key="profile"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                <ProfileEdit />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Floating Glassmorphic Nav Contract */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#faf8f5]/95 backdrop-blur-xl border-t border-[#e5e0d4] grid grid-cols-3 items-center h-16 pb-safe px-2 shadow-lg">
        <button 
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center justify-center transition-all ${activeTab === 'home' ? 'text-[#224438] font-bold scale-105' : 'text-[#6e6a5f] hover:text-[#1c1d1b]'}`}
        >
          <Search size={22} />
          <span className="text-[10px] font-semibold mt-1">Home / Search</span>
        </button>
        <button 
          onClick={() => setActiveTab('reminders')}
          className={`flex flex-col items-center justify-center transition-all ${activeTab === 'reminders' ? 'text-[#224438] font-bold scale-105' : 'text-[#6e6a5f] hover:text-[#1c1d1b]'}`}
        >
          <Bell size={22} />
          <span className="text-[10px] font-semibold mt-1">Reminders & Adherence</span>
        </button>
        <button 
          onClick={() => setActiveTab('profile')}
          className={`flex flex-col items-center justify-center transition-all ${activeTab === 'profile' ? 'text-[#224438] font-bold scale-105' : 'text-[#6e6a5f] hover:text-[#1c1d1b]'}`}
        >
          <User size={22} />
          <span className="text-[10px] font-semibold mt-1">Profile / Settings</span>
        </button>
      </nav>
    </div>
  );
}

function IngredientLookup() {
  const [query, setQuery] = useState('');
  const [drugData, setDrugData] = useState<DrugDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  
  // Accordion Expand States
  const [expandedSections, setExpandedSections] = useState({
    ingredients: true,
    uses: true,
    effects: true,
    warnings: true
  });

  const popularMeds = ['Ibuprofen', 'Advil', 'Amoxicillin', 'Tylenol', 'Metformin', 'Lipitor', 'Omeprazole'];

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleLookup = async (text: string) => {
    if (!text.trim()) return;
    setLoading(true);
    setDrugData(null);
    setErrorMsg(null);

    try {
      const response = await fetch('/api/lookup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ medicine: text.trim() }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Drug lookup failed.');
      setDrugData(data);
    } catch (error) {
      setErrorMsg(error instanceof Error ? error.message : 'An error occurred while fetching drug details.');
    } finally {
      setLoading(false);
    }
  };

  const handleImageScan = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setDrugData(null);
    setErrorMsg(null);

    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        const base64 = reader.result as string;
        const res = await fetch('/api/lookup-image', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ imageBase64: base64, mimeType: file.type }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to scan image label.');
        setDrugData(data);
        if (data.detectedMedicine) {
          setQuery(data.detectedMedicine);
        }
        setLoading(false);
      };
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Failed to process label image.');
      setLoading(false);
    }
  };

  const handleCopySummary = () => {
    if (!drugData) return;
    const textToCopy = `Drug: ${drugData.brandName || query}\nGeneric: ${drugData.genericName || 'N/A'}\nActive Ingredients: ${drugData.activeIngredients || 'N/A'}\nUses: ${drugData.indications || 'N/A'}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Minimalist High-Intent Search Box */}
      <div className="bg-white border border-[#e5e0d4] rounded-3xl p-3 shadow-md space-y-3">
        <div className="flex items-center gap-2 bg-[#faf8f5] rounded-2xl border border-[#e5e0d4] p-2 focus-within:border-[#224438] transition-colors">
          <Search className="ml-2 text-[#224438] shrink-0" size={22} />
          <input 
            type="text" 
            value={query} 
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleLookup(query)}
            placeholder="Search brand or generic medicine (e.g. Advil, Ibuprofen)..."
            className="flex-1 p-2 outline-none text-[#1c1d1b] text-sm md:text-base placeholder:text-[#9e998c] font-medium bg-transparent"
          />
          <label className="cursor-pointer p-2 rounded-xl text-[#6e6a5f] hover:text-[#224438] hover:bg-[#eaf1ec] transition-colors flex items-center gap-1.5 text-xs font-semibold shrink-0" title="Scan or Upload Label Photo">
            <input type="file" accept="image/*" className="hidden" onChange={handleImageScan} />
            <Camera size={20} className="text-[#224438]" />
            <span className="hidden sm:inline">Scan Label</span>
          </label>
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleLookup(query)}
            disabled={loading}
            className="px-5 py-2.5 bg-[#224438] text-white rounded-xl font-bold text-sm hover:bg-[#1a352c] transition-colors shadow-md disabled:opacity-50 shrink-0"
          >
            {loading ? 'Searching...' : 'Search FDA'}
          </motion.button>
        </div>

        {/* Quick Suggestion Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-1 pb-1 text-xs text-[#6e6a5f] px-1">
          <span className="font-semibold text-[#9e998c] shrink-0">Popular:</span>
          {popularMeds.map((med) => (
            <button
              key={med}
              onClick={() => {
                setQuery(med);
                handleLookup(med);
              }}
              className="px-2.5 py-1 bg-[#f0ede4] hover:bg-[#eaf1ec] hover:text-[#1c3a32] rounded-lg shrink-0 font-medium border border-[#e5e0d4] transition-colors"
            >
              {med}
            </button>
          ))}
        </div>
      </div>

      {loading && (
        <div className="p-8 bg-white/90 rounded-3xl border border-[#e5e0d4] shadow-sm text-center space-y-3 backdrop-blur-md">
          <div className="w-10 h-10 border-4 border-[#224438] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm font-semibold text-[#1c1d1b]">Querying openFDA Label Database & AI...</p>
          <p className="text-xs text-[#6e6a5f]">Retrieving active ingredients, indications, functions, and side effects</p>
        </div>
      )}

      {errorMsg && (
        <div className="p-5 bg-[#fdf2f0] border border-[#f0d0cb] rounded-3xl text-[#6b251e] space-y-2">
          <div className="flex items-center gap-2 font-bold text-sm text-[#8c2318]">
            <AlertTriangle size={18} /> Lookup Request Error
          </div>
          <p className="text-xs leading-relaxed">{errorMsg}</p>
          <button 
            onClick={() => handleLookup(query)}
            className="px-4 py-2 bg-[#8c2318] text-white text-xs font-bold rounded-xl hover:bg-[#731a11] transition-colors mt-2 shadow-sm"
          >
            Retry Search
          </button>
        </div>
      )}

      {/* FDA Drug Card Result */}
      {drugData && (
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl border border-[#e5e0d4] shadow-lg overflow-hidden space-y-6"
        >
          {/* Top Header Card */}
          <div className="bg-gradient-to-r from-[#1c3a32] via-[#224438] to-[#1c3a32] p-6 border-b border-[#142e27] text-white space-y-4 relative">
            <div className="flex items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 border border-white/20 text-[#e0f0e6] rounded-full text-xs font-semibold">
                <ShieldCheck size={14} /> Source: {drugData.source || 'openFDA'}
              </span>

              <button 
                onClick={handleCopySummary}
                className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 border border-white/20 transition-colors"
                title="Copy Drug Summary"
              >
                {copied ? <CheckCheck size={14} className="text-[#a2e0bd]" /> : <Copy size={14} />}
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-black tracking-tight text-white">{drugData.brandName || query}</h2>
              {drugData.genericName && (
                <p className="text-xs md:text-sm text-[#bce3cc] font-semibold mt-0.5">Generic Name: {drugData.genericName}</p>
              )}
              {drugData.manufacturer && (
                <p className="text-xs text-white/80 mt-1 font-medium">Manufacturer: {drugData.manufacturer}</p>
              )}
            </div>

            {drugData.summary && (
              <div className="p-3.5 bg-black/20 rounded-2xl text-xs text-white/95 border border-white/10 backdrop-blur-sm leading-relaxed">
                <span className="font-bold text-[#bce3cc]">AI Summary: </span>{drugData.summary}
              </div>
            )}
          </div>

          {/* Expandable Interactive Section Cards */}
          <div className="p-6 pt-0 space-y-4">
            {/* Active Ingredients Section */}
            <div className="border border-[#d2e3d8] rounded-2xl bg-[#f2f7f4] overflow-hidden">
              <button 
                onClick={() => toggleSection('ingredients')}
                className="w-full p-4 flex items-center justify-between text-left hover:bg-[#e6f0ea] transition-colors"
              >
                <div className="flex items-center gap-2 text-[#1c3a32] font-bold text-sm">
                  <Pill size={18} /> Active Ingredients
                </div>
                {expandedSections.ingredients ? <ChevronUp size={18} className="text-[#6e6a5f]" /> : <ChevronDown size={18} className="text-[#6e6a5f]" />}
              </button>
              {expandedSections.ingredients && (
                <div className="p-4 pt-0 text-[#1c1d1b] text-xs md:text-sm font-medium leading-relaxed border-t border-[#d2e3d8]">
                  {drugData.activeIngredients || 'Information unavailable in openFDA database.'}
                </div>
              )}
            </div>

            {/* Indications & Uses Section */}
            <div className="border border-[#e5e0d4] rounded-2xl bg-[#faf8f5] overflow-hidden">
              <button 
                onClick={() => toggleSection('uses')}
                className="w-full p-4 flex items-center justify-between text-left hover:bg-[#f2efe6] transition-colors"
              >
                <div className="flex items-center gap-2 text-[#1c3a32] font-bold text-sm">
                  <Activity size={18} /> Indications & What It Treats
                </div>
                {expandedSections.uses ? <ChevronUp size={18} className="text-[#6e6a5f]" /> : <ChevronDown size={18} className="text-[#6e6a5f]" />}
              </button>
              {expandedSections.uses && (
                <div className="p-4 pt-0 text-[#1c1d1b] text-xs md:text-sm leading-relaxed whitespace-pre-line max-h-60 overflow-y-auto border-t border-[#e5e0d4]">
                  {drugData.indications || drugData.purpose || 'Used for conditions as directed by a healthcare professional.'}
                </div>
              )}
            </div>

            {/* Adverse Reactions & Side Effects Section */}
            <div className="border border-[#f0d0cb] rounded-2xl bg-[#fdf2f0] overflow-hidden">
              <button 
                onClick={() => toggleSection('effects')}
                className="w-full p-4 flex items-center justify-between text-left hover:bg-[#fce5e1] transition-colors"
              >
                <div className="flex items-center gap-2 text-[#7a2318] font-bold text-sm">
                  <AlertTriangle size={18} className="text-[#a83222]" /> Side Effects & Adverse Reactions
                </div>
                {expandedSections.effects ? <ChevronUp size={18} className="text-[#6e6a5f]" /> : <ChevronDown size={18} className="text-[#6e6a5f]" />}
              </button>
              {expandedSections.effects && (
                <div className="p-4 pt-0 text-[#1c1d1b] text-xs md:text-sm leading-relaxed whitespace-pre-line max-h-60 overflow-y-auto border-t border-[#f0d0cb]">
                  {drugData.sideEffects || 'Consult product label or doctor regarding potential adverse reactions.'}
                </div>
              )}
            </div>

            {/* Warnings & Dosage Section */}
            <div className="border border-[#f0e3c8] rounded-2xl bg-[#fcf8ee] overflow-hidden">
              <button 
                onClick={() => toggleSection('warnings')}
                className="w-full p-4 flex items-center justify-between text-left hover:bg-[#f7eed8] transition-colors"
              >
                <div className="flex items-center gap-2 text-[#6e4e19] font-bold text-sm">
                  <Info size={18} className="text-[#996a1e]" /> FDA Warnings & Dosage
                </div>
                {expandedSections.warnings ? <ChevronUp size={18} className="text-[#6e6a5f]" /> : <ChevronDown size={18} className="text-[#6e6a5f]" />}
              </button>
              {expandedSections.warnings && (
                <div className="p-4 pt-0 grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-[#f0e3c8] text-xs text-[#1c1d1b] leading-relaxed">
                  <div>
                    <h4 className="font-bold text-[#8a2a1e] mb-1">Warnings</h4>
                    <p className="max-h-40 overflow-y-auto">{drugData.warnings || 'Follow package instructions.'}</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-[#1c3a32] mb-1">Dosage</h4>
                    <p className="max-h-40 overflow-y-auto">{drugData.dosage || 'Take strictly as instructed.'}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

function Reminders() {
  const [reminders, setReminders] = useState([
    { id: 1, name: 'Paracetamol 500mg', time: '08:00 AM', taken: true, note: 'After breakfast' },
    { id: 2, name: 'Vitamin D3 1000 IU', time: '10:00 AM', taken: true, note: 'Daily dose' },
    { id: 3, name: 'Omega-3 Fish Oil', time: '01:00 PM', taken: false, note: 'With lunch' },
    { id: 4, name: 'Magnesium Citrate', time: '09:00 PM', taken: false, note: 'Before bed' },
  ]);

  const [weeklyHistory, setWeeklyHistory] = useState([
    { day: 'Mon', taken: 3, missed: 0 },
    { day: 'Tue', taken: 2, missed: 1 },
    { day: 'Wed', taken: 3, missed: 0 },
    { day: 'Thu', taken: 4, missed: 0 },
    { day: 'Fri', taken: 2, missed: 1 },
    { day: 'Sat', taken: 3, missed: 0 },
    { day: 'Sun (Today)', taken: 2, missed: 2 },
  ]);

  const [newName, setNewName] = useState('');
  const [newTime, setNewTime] = useState('12:00 PM');
  const [newNote, setNewNote] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const handleToggleDose = (id: number) => {
    setReminders(prev => {
      const updated = prev.map(item => item.id === id ? { ...item, taken: !item.taken } : item);
      
      const todayTaken = updated.filter(r => r.taken).length;
      const todayMissed = updated.filter(r => !r.taken).length;

      setWeeklyHistory(history => history.map(item => 
        item.day.includes('Sun') ? { ...item, taken: todayTaken, missed: todayMissed } : item
      ));

      return updated;
    });
  };

  const handleAddReminder = () => {
    if (!newName.trim()) return;
    const newRem = {
      id: Date.now(),
      name: newName,
      time: newTime,
      taken: false,
      note: newNote || 'As scheduled'
    };
    
    setReminders(prev => {
      const next = [...prev, newRem];
      const todayTaken = next.filter(r => r.taken).length;
      const todayMissed = next.filter(r => !r.taken).length;

      setWeeklyHistory(history => history.map(item => 
        item.day.includes('Sun') ? { ...item, taken: todayTaken, missed: todayMissed } : item
      ));

      return next;
    });

    setNewName('');
    setNewNote('');
    setShowAddModal(false);
  };

  const totalTaken = weeklyHistory.reduce((acc, curr) => acc + curr.taken, 0);
  const totalMissed = weeklyHistory.reduce((acc, curr) => acc + curr.missed, 0);
  const totalDoses = totalTaken + totalMissed;
  const adherenceRate = totalDoses > 0 ? Math.round((totalTaken / totalDoses) * 100) : 100;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black tracking-tight text-[#1c1d1b]">Medication Dashboard</h2>
          <p className="text-xs text-[#6e6a5f] font-medium">Daily schedules & weekly adherence summary</p>
        </div>
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowAddModal(!showAddModal)}
          className="px-4 py-2.5 bg-[#224438] text-white rounded-2xl text-xs font-bold flex items-center gap-1.5 hover:bg-[#1a352c] transition-colors shadow-md"
        >
          <Plus size={16} /> Add Reminder
        </motion.button>
      </div>

      {/* Medication Adherence Recharts Dashboard */}
      <div className="bg-white rounded-3xl border border-[#e5e0d4] shadow-sm p-6 space-y-6">
        <div className="flex items-center justify-between border-b border-[#e5e0d4] pb-4">
          <div className="flex items-center gap-2 text-[#1c3a32] font-bold text-base">
            <TrendingUp size={22} /> Weekly Adherence Analytics
          </div>
          <span className="text-xs font-bold px-3 py-1 bg-[#eaf1ec] text-[#1c3a32] rounded-full border border-[#cbe0d3]">
            {adherenceRate}% Rate
          </span>
        </div>

        {/* Adherence KPI Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-4 bg-[#f0f5f2] rounded-2xl border border-[#cfe0d6]">
            <div className="flex items-center gap-1.5 text-[#1c3a32] text-xs font-semibold mb-1">
              <CheckCircle2 size={16} /> Taken Doses
            </div>
            <p className="text-2xl font-black text-[#1c3a32]">{totalTaken}</p>
            <span className="text-[10px] text-[#2c574b] font-medium">Logged 7 Days</span>
          </div>

          <div className="p-4 bg-[#fdf2f0] rounded-2xl border border-[#f0d0cb]">
            <div className="flex items-center gap-1.5 text-[#8c2318] text-xs font-semibold mb-1">
              <XCircle size={16} /> Missed/Pending
            </div>
            <p className="text-2xl font-black text-[#8c2318]">{totalMissed}</p>
            <span className="text-[10px] text-[#a82e22] font-medium">Needs attention</span>
          </div>

          <div className="p-4 bg-[#faf8f5] rounded-2xl border border-[#e5e0d4]">
            <div className="flex items-center gap-1.5 text-[#1c1d1b] text-xs font-semibold mb-1">
              <Calendar size={16} /> Total Scheduled
            </div>
            <p className="text-2xl font-black text-[#1c1d1b]">{totalDoses}</p>
            <span className="text-[10px] text-[#6e6a5f] font-medium">Weekly Total</span>
          </div>

          <div className="p-4 bg-[#fcf8ee] rounded-2xl border border-[#f0e3c8]">
            <div className="flex items-center gap-1.5 text-[#8a5d14] text-xs font-semibold mb-1">
              <Flame size={16} /> Active Streak
            </div>
            <p className="text-2xl font-black text-[#8a5d14]">5 Days</p>
            <span className="text-[10px] text-[#a8741e] font-medium">Active streak</span>
          </div>
        </div>

        {/* Recharts Component */}
        <div className="space-y-2 pt-2">
          <h4 className="text-xs font-bold text-[#6e6a5f] uppercase tracking-wider">7-Day Dose History (Taken vs Missed)</h4>
          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyHistory} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e0d4" />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#6e6a5f' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#6e6a5f' }} axisLine={false} tickLine={false} allowDecimals={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#224438', borderRadius: '16px', color: '#fff', fontSize: '12px', border: 'none' }}
                  itemStyle={{ color: '#fff' }}
                  cursor={{ fill: 'rgba(34, 68, 56, 0.06)' }}
                />
                <Legend wrapperStyle={{ paddingTop: '10px', fontSize: '12px' }} />
                <Bar dataKey="taken" name="Taken Doses" fill="#224438" radius={[6, 6, 0, 0]} />
                <Bar dataKey="missed" name="Missed / Pending" fill="#c2410c" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Add Reminder Modal Form */}
      {showAddModal && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-5 bg-white rounded-3xl border border-[#224438] shadow-md space-y-3"
        >
          <h3 className="font-bold text-sm text-[#1c1d1b]">Set New Medicine Reminder</h3>
          <input 
            type="text" 
            placeholder="Medicine name (e.g. Amoxicillin 500mg)"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="w-full p-3 rounded-xl border border-[#e5e0d4] bg-[#faf8f5] text-[#1c1d1b] text-sm outline-none focus:border-[#224438] font-medium"
          />
          <div className="grid grid-cols-2 gap-2">
            <input 
              type="text" 
              placeholder="Time (e.g. 02:00 PM)"
              value={newTime}
              onChange={(e) => setNewTime(e.target.value)}
              className="p-3 rounded-xl border border-[#e5e0d4] bg-[#faf8f5] text-[#1c1d1b] text-sm outline-none focus:border-[#224438] font-medium"
            />
            <input 
              type="text" 
              placeholder="Note (e.g. With food)"
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              className="p-3 rounded-xl border border-[#e5e0d4] bg-[#faf8f5] text-[#1c1d1b] text-sm outline-none focus:border-[#224438] font-medium"
            />
          </div>
          <div className="flex gap-2 pt-1">
            <button 
              onClick={handleAddReminder}
              className="flex-1 py-2.5 bg-[#224438] text-white text-xs font-bold rounded-xl hover:bg-[#1a352c] transition-colors shadow-sm"
            >
              Save Schedule
            </button>
            <button 
              onClick={() => setShowAddModal(false)}
              className="px-4 py-2.5 bg-[#f0ede4] text-[#6e6a5f] text-xs font-semibold rounded-xl hover:bg-[#e5e0d4] transition-colors"
            >
              Cancel
            </button>
          </div>
        </motion.div>
      )}

      {/* Today's Scheduled Reminders */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-[#1c1d1b]">Today's Scheduled Doses</h3>
        {reminders.map(r => (
          <div key={r.id} className="flex items-center justify-between p-5 bg-white rounded-3xl border border-[#e5e0d4] shadow-sm transition-all hover:border-[#c5bea9]">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${r.taken ? 'bg-[#eaf1ec] text-[#1c3a32] border border-[#cbe0d3]' : 'bg-[#faf8f5] text-[#6e6a5f]'}`}>
                <Bell size={20} />
              </div>
              <div>
                <p className="font-semibold text-[#1c1d1b]">{r.name}</p>
                <div className="flex items-center gap-2 text-xs text-[#6e6a5f] mt-0.5">
                  <span className="font-semibold text-[#1c3a32]">{r.time}</span>
                  <span>·</span>
                  <span>{r.note}</span>
                </div>
              </div>
            </div>
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleToggleDose(r.id)}
              className={`min-h-[44px] px-4 flex items-center gap-1.5 rounded-2xl text-xs font-bold transition-all ${
                r.taken ? 'bg-[#224438] text-white shadow-sm' : 'bg-[#faf8f5] text-[#1c1d1b] border border-[#e5e0d4] hover:bg-[#f2efe6]'
              }`}
            >
              <Check size={18} /> {r.taken ? 'Dose Taken' : 'Mark Taken'}
            </motion.button>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProfileEdit() {
  const [profile, setProfile] = useState({
    height: '175',
    weight: '70',
    allergies: 'Penicillin',
    openFdaKey: ''
  });

  const [savedMsg, setSavedMsg] = useState(false);

  const handleSave = () => {
    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 3000);
  };

  return (
    <div className="bg-white p-6 rounded-3xl border border-[#e5e0d4] shadow-sm space-y-6">
      <div>
        <h2 className="text-2xl font-black text-[#1c1d1b] tracking-tight">User Profile & API Settings</h2>
        <p className="text-xs text-[#6e6a5f]">Manage personal medical metrics and openFDA configuration</p>
      </div>

      <div className="space-y-4 text-sm">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block font-medium text-[#1c1d1b] mb-1">Height (cm)</label>
            <input 
              type="number" 
              value={profile.height}
              onChange={(e) => setProfile({...profile, height: e.target.value})}
              className="w-full p-3 rounded-xl border border-[#e5e0d4] bg-[#faf8f5] text-[#1c1d1b] outline-none focus:border-[#224438] font-medium"
            />
          </div>
          <div>
            <label className="block font-medium text-[#1c1d1b] mb-1">Weight (kg)</label>
            <input 
              type="number" 
              value={profile.weight}
              onChange={(e) => setProfile({...profile, weight: e.target.value})}
              className="w-full p-3 rounded-xl border border-[#e5e0d4] bg-[#faf8f5] text-[#1c1d1b] outline-none focus:border-[#224438] font-medium"
            />
          </div>
        </div>

        <div>
          <label className="block font-medium text-[#1c1d1b] mb-1">Known Drug Allergies</label>
          <input 
            type="text" 
            value={profile.allergies}
            onChange={(e) => setProfile({...profile, allergies: e.target.value})}
            className="w-full p-3 rounded-xl border border-[#e5e0d4] bg-[#faf8f5] text-[#1c1d1b] outline-none focus:border-[#224438] font-medium"
            placeholder="e.g. Penicillin, Sulfa"
          />
        </div>

        <div className="pt-2 border-t border-[#e5e0d4]">
          <label className="block font-medium text-[#1c1d1b] mb-1">Optional openFDA API Key</label>
          <input 
            type="password" 
            value={profile.openFdaKey}
            onChange={(e) => setProfile({...profile, openFdaKey: e.target.value})}
            className="w-full p-3 rounded-xl border border-[#e5e0d4] bg-[#faf8f5] text-[#1c1d1b] outline-none focus:border-[#224438] font-mono text-xs"
            placeholder="Enter custom openFDA key (Optional)"
          />
          <p className="text-[11px] text-[#6e6a5f] mt-1">
            OpenFDA public API works out-of-the-box for free without an API key (up to 240 requests/min). You can optionally provide an API key in secrets (`OPENFDA_API_KEY`) for higher limits.
          </p>
        </div>

        {savedMsg && (
          <div className="p-3 bg-[#eaf1ec] text-[#1c3a32] border border-[#cbe0d3] text-xs font-semibold rounded-xl text-center">
            Profile & Settings Saved Successfully!
          </div>
        )}

        <motion.button 
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          onClick={handleSave}
          className="w-full h-12 flex items-center justify-center rounded-2xl bg-[#224438] text-white font-bold hover:bg-[#1a352c] transition-colors shadow-md"
        >
          Save Profile & Settings
        </motion.button>
      </div>
    </div>
  );
}

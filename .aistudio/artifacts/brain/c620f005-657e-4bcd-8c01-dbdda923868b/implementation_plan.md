# DrugWise Revised Implementation Plan

DrugWise is a medication management assistant designed for demonstration purposes. It focuses on two core features: ingredient lookup (using AI) and a simulated medication reminder system, all operating without a database.

## User Review & Critical Decisions

> [!IMPORTANT]
> The following revisions have been made based on your feedback:
> 
> - **Database Removed**: All persistent storage requirements have been removed. The app uses client-side state for demo functionality.
> - **Focus**: The app now exclusively centers on:
>     1. **Medicine Ingredient Lookup**: Uses Gemini AI to provide ingredient information.
>     2. **Simulated Reminders**: A functional demonstration of scheduling and triggering reminders for medicine intake.

---

## 1. Overview & Core Concept

- **What It Does**: Provides a search interface for medicine ingredients and a simulated reminder system to ensure timely medication intake.
- **Key Value**: Demonstrates core functionality of a medication assistant without complex backend or database infrastructure.

## 2. User Experience & Visual Design

- **Key User Flows**:
    1. **Ingredient Lookup**: User enters a medicine name, Gemini fetches ingredients, displayed clearly in the UI.
    2. **Medication Schedule/Reminders**:
        - User adds a medicine with a specific time.
        - The app demonstrates a countdown/reminder trigger to indicate when medicine is due.
- **Visual Identity**:
    - Mobile-first layout optimized for touch interaction.
    - Clean, uncluttered interface focusing on search results and active reminders.

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: No Persistence**
    - *Chosen Approach*: React `useState` and `localStorage` (for session persistence).
    - *Why*: User request for a "dummy" demonstration website without a database.
- **Decision 2: Ingredient Lookup AI**
    - *Chosen Approach*: Server-side Proxy to Gemini API.
    - *Why*: Securely handles API requests as per technical guidelines, ensuring safe ingredient data retrieval.

## 4. Technical Architecture & Data Strategy

```
┌─────────────────────────────────────────────────────────────┐
│                       Client (React)                        │
├───────────────────┬───────────────────┬─────────────────────┤
│ Search UI         │ Medication Log    │ Reminder Service    │
├───────────────────┴───────────────────┴─────────────────────┤
│                          │                                  │
│                Express Proxy Server                         │
│                          │                                  │
└──────────────────────────┼──────────────────────────────────┘
                           │
                 Gemini API (Search)
```

- **Data Model**:
    - Client-side arrays for "Medications" and "Ingredients".
- **Key Sequences**:
    - **Lookup**: Client -> Express Proxy -> Gemini -> Express Proxy -> Client (Display).
    - **Reminder**: Client state holds medication schedule -> React Effect triggers visual reminder when current time matches.

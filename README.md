# Begreppslista

Här finns korta förklaringar av några tekniska termer som används i vårt projekt.

## Termer

### QuerySnapshot

En `QuerySnapshot` är ett objekt som returneras från en fråga mot en Firestore-databas, innehållande data om frågeresultatet inklusive alla dokument som matchar frågan.

### createAsyncThunk

Funktion från Redux Toolkit som används för att skapa thunk-actions. Dessa är funktioner som hanterar asynkrona operationer och dispatchar actions baserat på om operationen lyckades eller misslyckades.

### Builder

En builder används inom Redux Toolkit för att konstruera response handlers i `extraReducers`. Den ger metoder som `addCase`, vilket tillåter definiering av vad som händer för specifika actions.

### Serialiserbar data

Data som kan konverteras till och från ett format som kan lagras och återuppbyggas, såsom JSON. Viktigt i Redux för att möjliggöra funktioner som tidresor och logging.

### rejectedWithValue

En funktion tillgänglig inom `createAsyncThunk`'s `payloadCreator` som tillåter en thunk att avvisa ett promise med ett specifikt värde, oftast för att skicka ett anpassat felmeddelande.

### extraReducers

Ett fält i `createSlice` där man kan ange hur olika delar av tillståndet ska hanteras i respons till actions skapade av andra slices eller externa actions, oftast de som genereras av asynkrona thunks.

## Användning

Dessa termer används genomgående i vår kodbas och att förstå dem kan hjälpa till att förstå hur vår applikation hanterar data och tillstånd.

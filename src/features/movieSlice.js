import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs, addDoc, deleteDoc, updateDoc, doc } from 'firebase/firestore';
import { db } from '../app/firebase';

// Asynkron thunk för att hämta alla filmer från databasen.
export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async () => {
    const querySnapshot = await getDocs(collection(db, "movies"));
    // Mappar över varje dokument i samlingen och returnerar en ny array av filmer.
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }
);

// Asynkron thunk för att lägga till en ny film i databasen.
export const addMovie = createAsyncThunk(
  'movies/addMovie',
  async ({ title, releaseDate, receivedAnOscar }, { rejectWithValue }) => {
    try {
      const response = await addDoc(collection(db, "movies"), {
        title,
        releaseDate,
        receivedAnOscar,
      });
      // Returnerar det nya filmobjektet inklusive dess genererade ID från Firebase.
      return { id: response.id, title, releaseDate, receivedAnOscar };
    } catch (err) {
      // Returnerar ett felmeddelande om operationen misslyckas.
      return rejectWithValue(err.toString());
    }
  }
);

// Asynkron thunk för att uppdatera en films titel.
export const updateMovie = createAsyncThunk(
  'movies/updateMovie',
  async ({ id, title }, { rejectWithValue }) => {
    try {
      const movieRef = doc(db, "movies", id);
      await updateDoc(movieRef, { title });
      // Returnerar den uppdaterade filmens ID och nya titel.
      return { id, title };
    } catch (err) {
      // Hanterar eventuella fel vid uppdatering av filmen.
      return rejectWithValue(err.toString());
    }
  }
);

// Asynkron thunk för att radera en film från databasen.
export const deleteMovie = createAsyncThunk(
  'movies/deleteMovie',
  async (id, { rejectWithValue }) => {
    try {
      const movieRef = doc(db, "movies", id);
      await deleteDoc(movieRef);
      // Returnerar ID:t på den raderade filmen.
      return id;
    } catch (err) {
      // Hanterar fel som kan uppstå vid försök att radera filmen.
      return rejectWithValue(err.toString());
    }
  }
);

// Skapar en slice för filmdata med ett initialt tillstånd.
const movieSlice = createSlice({
  name: 'movies',
  initialState: {
    entities: [], // Lista av filmer
    loading: false, // Laddningsstatus
    error: null // Felmeddelanden
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true; // Sätter laddningsstatus till true när filmhämtning startar
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.entities = action.payload; // Lagrar de hämtade filmerna i tillståndet
        state.loading = false; // Återställer laddningsstatus när filmerna är hämtade
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.error = action.payload || 'Failed to load movies'; // Sätter ett felmeddelande om hämtningen misslyckas
        state.loading = false;
      })
      .addCase(addMovie.fulfilled, (state, action) => {
        state.entities.push(action.payload); // Lägger till en ny film i listan
      })
      .addCase(updateMovie.fulfilled, (state, action) => {
        const index = state.entities.findIndex(movie => movie.id === action.payload.id);
        if (index !== -1) {
          state.entities[index].title = action.payload.title; // Uppdaterar titeln för en befintlig film
        }
      })
      .addCase(deleteMovie.fulfilled, (state, action) => {
        state.entities = state.entities.filter(movie => movie.id !== action.payload); // Tar bort filmen från listan
      });
  }
});

// Exporterar reducer från slicen för användning i store.
export default movieSlice.reducer;

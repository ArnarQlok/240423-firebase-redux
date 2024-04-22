// Importerar nödvändiga verktyg från Redux Toolkit och Firebase.
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../app/firebase';

// Skapar en asynkron thunk för att registrera en ny användare med email och lösenord.
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // Returnerar enbart serialiserbar information om användaren.
      return { uid: userCredential.user.uid, email: userCredential.user.email, displayName: userCredential.user.displayName };
    } catch (error) {
      // Returnerar ett felmeddelande om registreringen misslyckas.
      return rejectWithValue(error.message);
    }
  }
);

// Skapar en asynkron thunk för att logga in en användare med email och lösenord.
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      // Returnerar enbart serialiserbar information om användaren.
      return { uid: userCredential.user.uid, email: userCredential.user.email, displayName: userCredential.user.displayName };
    } catch (error) {
      // Returnerar ett felmeddelande om inloggningen misslyckas.
      return rejectWithValue(error.message);
    }
  }
);

// Asynkron thunk för att logga in med Google.
export const loginUserWithGoogle = createAsyncThunk(
  'auth/loginUserWithGoogle',
  async (_, { rejectWithValue }) => {
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      // Returnerar enbart serialiserbar information om användaren.
      return {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: userCredential.user.displayName,
        photoURL: userCredential.user.photoURL
      };
    } catch (error) {
      // Returnerar ett felmeddelande om Google-inloggningen misslyckas.
      return rejectWithValue(error.message);
    }
  }
);

// Asynkron thunk för att logga ut användaren.
export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      await signOut(auth);
      // Returnerar null eftersom användaren har loggats ut.
      return null;
    } catch (error) {
      // Returnerar ett felmeddelande om utloggningen misslyckas.
      return rejectWithValue('Unable to log out');
    }
  }
);

// Skapar en slice för autentisering med initialt tillstånd och reducers.
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null, // Ingen användare är inloggad från början.
    loading: false, // Anger om en begäran bearbetas.
    error: null // Lagrar felmeddelanden vid misslyckade operationer.
  },
  reducers: {},
  extraReducers: (builder) => {
    // Hanterar färdigställda states för varje thunk för att uppdatera tillståndet med resultatet.
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginUserWithGoogle.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.error = null;
      });
  }
});

// Exporterar actions och reducer från slicen.
export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;

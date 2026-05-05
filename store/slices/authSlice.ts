import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { generateUserProfile, UserProfile } from '@/lib/fakerData';

interface AuthState {
  isAuthenticated: boolean;
  user: UserProfile | null;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ email: string; password: string }>) {
      state.isAuthenticated = true;
      state.user = generateUserProfile();
      state.user.email = action.payload.email;
      state.error = null;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    updateProfile(state, action: PayloadAction<Partial<UserProfile>>) {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
  },
});

export const { login, logout, setError, updateProfile } = authSlice.actions;
export default authSlice.reducer;

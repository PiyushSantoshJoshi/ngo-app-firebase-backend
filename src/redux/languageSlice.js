import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentLanguage: localStorage.getItem('selectedLanguage') || 'en',
  isGoogleTranslateLoaded: false,
  availableLanguages: [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
    { code: 'mr', name: 'Marathi', nativeName: 'मराठी' },
    { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
    { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
    { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം' },
    { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
  ],
};

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.currentLanguage = action.payload;
      localStorage.setItem('selectedLanguage', action.payload);
    },
    setGoogleTranslateLoaded: (state, action) => {
      state.isGoogleTranslateLoaded = action.payload;
    },
  },
});

export const { setLanguage, setGoogleTranslateLoaded } = languageSlice.actions;
export default languageSlice.reducer;


import AsyncStorage from '@react-native-async-storage/async-storage';

const THEME_KEY = 'APP_THEME';

export const saveTheme = async (theme) => {
  try {
    await AsyncStorage.setItem(THEME_KEY, theme);
  } catch (error) {
    console.error('Erro ao salvar o tema:', error);
  }
};

export const loadTheme = async () => {
  try {
    const theme = await AsyncStorage.getItem(THEME_KEY);
    return theme; // 'dark', 'light', ou null
  } catch (error) {
    console.error('Erro ao carregar o tema:', error);
    return null;
  }
};

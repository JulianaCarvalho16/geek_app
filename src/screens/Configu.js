import { StatusBar } from 'expo-status-bar';
import { Text, View, Switch } from 'react-native';
import { useColorScheme } from 'nativewind';
import { useEffect, useState } from 'react';
import { saveTheme, loadTheme } from '../components/themeStorage';
import "../components/global.css";

export default function Configu() {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const [isEnabled, setIsEnabled] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initTheme = async () => {
      const savedTheme = await loadTheme();

      // Se não tiver tema salvo, define claro
      if (!savedTheme) {
        if (colorScheme === 'dark') {
          toggleColorScheme(); // força claro
        }
        setIsEnabled(false);
        await saveTheme('light');
      } else {
        // Sincroniza o switch com o tema salvo
        setIsEnabled(savedTheme === 'dark');

        // Se o tema atual não bate com o salvo, troca
        if (savedTheme !== colorScheme) {
          toggleColorScheme();
        }
      }
      setIsInitialized(true);
    };

    initTheme();
  }, []);

  // Sempre que o colorScheme mudar, sincroniza o switch (evita bugs se tema for alterado fora do switch)
  useEffect(() => {
    if (isInitialized) {
      setIsEnabled(colorScheme === 'dark');
    }
  }, [colorScheme]);

  const toggleSwitch = async () => {
    const newTheme = isEnabled ? 'light' : 'dark';
    await saveTheme(newTheme);
    toggleColorScheme();
    setIsEnabled(!isEnabled);
  };

  return (
    <View className="flex-1 items-center justify-center dark:bg-neutral-900 bg-white">
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      <Text className="mb-4 text-black dark:text-white">Mudar tema</Text>
      <Switch
        value={isEnabled}
        onValueChange={toggleSwitch}
      />
    </View>
  );
}

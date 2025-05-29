import { StatusBar } from 'expo-status-bar';
import { Text, View, Switch } from 'react-native';
import { useColorScheme } from 'nativewind';
import "../components/global.css";

export default function Configu() {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  console.log(colorScheme)

  return (
    <View className="flex-1 items-center justify-center dark:bg-neutral-900">
      <StatusBar style={colorScheme=='dark'? 'light': 'dark'}/>
      <Text className="mb-4 dark:text-white">Mudar tema</Text>
      <Switch 
        value={colorScheme === 'dark'} 
        onValueChange={toggleColorScheme} // Use onValueChange em vez de onChange
      />
    </View>

  );
}
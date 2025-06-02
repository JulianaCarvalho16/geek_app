import { StyleSheet, Text, View } from 'react-native';

export default function InProgress() {
  return (
    <View className="flex-1 items-center justify-center bg-white dark:bg-neutral-900">
      <Text className="text-xl font-bold text-black dark:text-white">Em progresso</Text>
    </View>
  );
}


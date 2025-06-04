import { createDrawerNavigator } from "@react-navigation/drawer";
import { useEffect } from 'react';
import { loadTheme } from '../components/themeStorage';
import { useColorScheme } from 'nativewind';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { Entypo } from "@expo/vector-icons";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Home from "../screens/Home";
import ToDo from "../screens/ToDo";
import InProgress from "../screens/InProgress";
import Done from "../screens/Done";
import Profile from "../screens/Profile";
import criartarefa from "../screens/criartarefa";
import Configu from "../screens/Configu";
import Denotas from "../screens/Denotas";

const Drawer = createDrawerNavigator();

export default function DrawerNavigation() {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  useEffect(() => {
    const fetchTheme = async () => {
      const savedTheme = await loadTheme();
      if (savedTheme && savedTheme !== colorScheme) {
        toggleColorScheme(); // aplica o tema salvo
      }
    };
    fetchTheme();
  }, []);

  const isDark = colorScheme === 'dark';

  return (
      <Drawer.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: isDark ? '#1a1a1a' : '#ffffff',
          },
          headerTintColor: isDark ? '#ffffff' : '#000000',
          drawerStyle: {
            backgroundColor: isDark ? '#121212' : '#fff',
          },
          drawerActiveTintColor: isDark ? '#ffffff' : '#000000',
          drawerInactiveTintColor: isDark ? '#888' : '#333',
          title: '',
        }}
      >
        <Drawer.Screen
          name="Home"
          component={Home}
          options={{
            drawerIcon: ({ color }) => <Entypo name="home" size={24} color={color} />,
            drawerLabel: 'Home',
          }}
        />
        <Drawer.Screen
          name="To do"
          component={ToDo}
          options={{
            drawerIcon: ({ color }) => <MaterialCommunityIcons name="bookshelf" size={24} color={color} />,
            drawerLabel: 'À fazer',
          }}
        />
        <Drawer.Screen
          name="In progress"
          component={InProgress}
          options={{
            drawerIcon: ({ color }) => <MaterialCommunityIcons name="book-open-page-variant-outline" size={24} color={color} />,
            drawerLabel: 'Em progresso',
          }}
        />
        <Drawer.Screen
          name="Done"
          component={Done}
          options={{
            drawerIcon: ({ color }) => <MaterialIcons name="done" size={24} color={color} />,
            drawerLabel: 'Concluído',
          }}
        />
        <Drawer.Screen
          name="Profile"
          component={Profile}
          options={{
            drawerIcon: ({ color }) => <FontAwesome name="user" size={24} color={color} />,
            drawerLabel: 'Perfil',
          }}
        />
        <Drawer.Screen
          name="criartarefa"
          component={criartarefa}
          options={{
            drawerIcon: ({ color }) => <Entypo name="plus" size={24} color={color} />,
            drawerLabel: 'Criar tarefas',
          }}
        />
        <Drawer.Screen
          name="Denotas"
          component={Denotas}
          options={{
            drawerIcon: ({ color }) => <Entypo name="plus" size={24} color={color} />,
            drawerLabel: 'Ultima',
          }}
        />
        <Drawer.Screen
          name="Config"
          component={Configu}
          options={{
            drawerIcon: ({ color }) => <FontAwesome name="gear" size={24} color={color} />,
            drawerLabel: 'Configurações',
          }}
        />
      </Drawer.Navigator>
  );
}

import { createDrawerNavigator } from "@react-navigation/drawer";
import { Entypo } from "@expo/vector-icons";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import Home from "../screens/Home";
import ToDo from "../screens/ToDo";
import InProgress from "../screens/InProgress";
import Done from "../screens/Done";
import Profile from "../screens/Profile";
import Configu from "../screens/Configu";

const Drawer = createDrawerNavigator();

export default function DrawerNavigation(){
    return(
        <Drawer.Navigator screenOptions={{ title: '' }}>
            <Drawer.Screen
               name= "Home"
               component={Home}
               options={{
                  drawerIcon: () => <Entypo name="home" size={24} color="black" />,
                  drawerLabel: 'Home'
               }}
            />
            <Drawer.Screen
               name= "To do"
               component={ToDo}
               options={{
                  drawerIcon: () => <MaterialCommunityIcons name="bookshelf" size={24} color="black" />,
                  drawerLabel: 'À fazer'
               }}
            />
            <Drawer.Screen
               name= "In progress"
               component={InProgress}
               options={{
                  drawerIcon: () => <MaterialCommunityIcons name="book-open-page-variant-outline" size={24} color="black" />,
                  drawerLabel: 'Em progresso'
               }}
            />
            <Drawer.Screen
               name= "Done"
               component={Done}
               options={{
                  drawerIcon: () => <MaterialIcons name="done" size={24} color="black" />,
                  drawerLabel: 'Concluido'
               }}
            />
            <Drawer.Screen
               name= "Profile"
               component={Profile}
               options={{
                  drawerIcon: () => <FontAwesome name="user" size={24} color="black" />,
                  drawerLabel: 'Perfil'
               }}
            />
            <Drawer.Screen
               name= "Config"
               component={Configu}
               options={{
                  drawerIcon: () => <FontAwesome name="gear" size={24} color="black" />,
                  drawerLabel: 'Config'
               }}
            />
        </Drawer.Navigator>
    )
}
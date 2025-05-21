import { DrawerRouter, NavigationContainer} from '@react-navigation/native'
import DrawerRoutes from './DrawerNavigation'

export default function Routes(){
    return(
        <NavigationContainer>
            <DrawerRoutes/>
        </NavigationContainer>
    )
}
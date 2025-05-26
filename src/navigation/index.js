import { DrawerRouter, NavigationContainer} from '@react-navigation/native'
import DrawerNavigation from './DrawerNavigation'

export default function Routes(){
    return(
        <NavigationContainer>
            <DrawerNavigation/>
        </NavigationContainer>
    )
}
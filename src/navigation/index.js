import { DrawerRouter, NavigationContainer} from '@react-navigation/native'
import DrawerNavigation from './DrawerNavigation'
import StackNavigation from './StarkNavegation'

export default function Routes(){
    return(
        <NavigationContainer>
            <StackNavigation />
        </NavigationContainer>
    )
}
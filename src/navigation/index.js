import { NavigationContainer} from '@react-navigation/native'
import StackNavigation from './StarkNavegation'

export default function Routes(){
    return(
        <NavigationContainer>
            <StackNavigation />
        </NavigationContainer>
    )
}
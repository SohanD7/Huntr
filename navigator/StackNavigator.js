import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/Login';
import Explore from '../screens/Explore';

const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Explore" component={Explore} />
    </Stack.Navigator>
  );
}

export default AppNavigator;
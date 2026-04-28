import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { colors } from '../constants/theme';
import { HomeScreen } from '../screens/HomeScreen';
import { UserDetailScreen } from '../screens/UserDetailScreen';
import { RootStackParamList } from '../types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTitleStyle: {
          color: colors.text,
          fontWeight: '700',
        },
        headerTintColor: colors.primary,
        contentStyle: {
          backgroundColor: colors.background,
        },
      }}
    >
      <Stack.Screen
        component={HomeScreen}
        name="Home"
        options={{
          title: 'Usuarios',
        }}
      />
      <Stack.Screen
        component={UserDetailScreen}
        name="UserDetail"
        options={{
          title: 'Detalle del usuario',
        }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

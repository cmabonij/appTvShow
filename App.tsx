import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ListEpisode } from './src/screens/listEpisode';
import { EpisodeDetail } from './src/screens/episodeDetail';

const Stack = createStackNavigator();

class App extends React.Component {
    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen
                        name="List"
                        component={ListEpisode}
                    />
                    <Stack.Screen
                        name="Detail"
                        component={EpisodeDetail}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}

export default App;

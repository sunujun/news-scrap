import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RootStackNavigation } from './src/navigation/RootStackNavigation';
import { Provider } from 'react-redux';
import store from './src/store/store';

function App(): JSX.Element {
    return (
        <Provider store={store}>
            <SafeAreaProvider>
                <NavigationContainer>
                    <RootStackNavigation />
                </NavigationContainer>
            </SafeAreaProvider>
        </Provider>
    );
}

export default App;

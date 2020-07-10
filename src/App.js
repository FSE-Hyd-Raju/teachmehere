import React, { Component } from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import { NetworkProvider } from 'react-native-offline';
import store from './redux/store';
import TabNavigation from './TabNavigation';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: 'black',
    accent: 'white',
  },
};

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PaperProvider theme={theme}>
          <View style={{ flex: 1 }}>
            <TabNavigation />
          </View>
        </PaperProvider>
      </Provider>
    );
  }
}

export default App;

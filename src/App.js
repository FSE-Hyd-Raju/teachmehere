import React, { Component } from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import { NetworkProvider } from 'react-native-offline';
import store from './redux/store';
import TabNavigation from './TabNavigation';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <NetworkProvider>
          <View style={{ flex: 1 }}>
            <TabNavigation />
          </View>
        </NetworkProvider>
      </Provider>
    );
  }
}

export default App;

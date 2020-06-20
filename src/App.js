import React, { Component } from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import { NetworkProvider } from 'react-native-offline';
import { RootStack } from './Routes';
import store from './store';

class App extends Component {

   console=(function(oldCons){
    return {
    log: function(text){
    
    },
    info: function (text) {
    
    },
    warn: function (text) {
    
    },
    error: function (text) {
    oldCons.error(text);
    
    }
    };
    }(window.console));
  render() {
    console.disableYellowBox = true
    window.console = console;

    return (
      <Provider store={store}>
        <NetworkProvider>
          <View style={{ flex: 1 }}>
            <RootStack />
          </View>
        </NetworkProvider>
      </Provider>
    );
  }
}

export default App;

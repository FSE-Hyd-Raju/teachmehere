import React, { Component } from 'react';
import { View } from 'react-native';
import { NetworkProvider } from 'react-native-offline';
import TabNavigation from './TabNavigation';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

import { configureStore } from '@reduxjs/toolkit';
import { Provider, connect } from 'react-redux';
import rootReducer from './redux/slices';
import { getAsyncData, stGetUser } from './components/common/asyncStorage'
import dispatch from 'redux'
// import { useDispatch, useSelector } from 'react-redux'
// import loginSelector from './redux/slices/loginSlice';
import loadUserInfo from './redux/slices/loginSlice';


const store = configureStore({ reducer: rootReducer });

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: 'black',
    accent: 'white',
  },
};
// const dispatch = useDispatch()
// const { loadUserInfo } = useSelector(loginSelector)


class App extends Component {



  componentDidMount() {
    this.userInfo();
  }

  userInfo = async () => {
    console.log("inside userInfo")
    const { navigation, loadUserInfo } = this.props;
    const userData = await getAsyncData('userInfo');
    // if (userData) {

    // dispatch(loadUserInfo(userData))

    loadUserInfo(userData)
    navigation.navigate("Profile");
    // } else {
    //   navigation.navigate("Signin");
    // }
  };

  render() {
    console.disableYellowBox = true
    window.console = console;

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

const mapStateToProps = state => ({
  counter: state.counter
});

const mapDispatchToProps = () => {
  return {
    loadUserInfo: dispatch(loadUserInfo)

  };
};


// export default App;
export default connect(
  mapStateToProps,
  mapDispatchToProps()
)(App);

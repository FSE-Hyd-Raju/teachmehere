import React from 'react';
import {
  createAppContainer,
  createStackNavigator,
  createSwitchNavigator,
  createBottomTabNavigator,
  StackActions,
} from 'react-navigation';

import Splash from './screens/Splash';
import AuthLogin from './screens/login/Login';
import Home from './screens/tabs/Home';
import Search from './screens/tabs/Search';
import Profile from './screens/tabs/Profile';
import Post from './screens/tabs/post/Post';
import Chat from './screens/tabs/Chat';
import SkillsListScreen from './screens/skill/SkillsListScreen';
import SkillDetailsScreen from './screens/skill/SkillDetailsScreen';

import NavbarWrapper from './components/NavbarWrapper';
import NavbarButtonWrapper from './components/NavbarButtonWrapper';
import Header from './components/Header';
import {
  getNavbarHomeIcon,
  getNavbarSearchIcon,
  getNavbarProfileIcon,
  getNavbarChatIcon,
  getNavbarPostIcon,
} from './utils/icons';
import { getFontStyleObject } from './utils/font';
import { fromRightWithFade } from './utils/navigation';
import RouteNames from './RouteNames';
import Theme from './Theme';

const TabNames = {
  home: 'Home',
  search: 'Search',
  profile: 'Profile',
  chat: 'Chat',
  post: 'Post',
};

const defaultHeaderObject = {
  header: props => <Header scene={props.scene} />,
};

const createDefaultStackNavigator = (screensObject, customOptions) =>
  createStackNavigator(screensObject, {
    defaultNavigationOptions: { ...defaultHeaderObject },
    cardStyle: {
      backgroundColor: '#000',
    },
    headerMode: 'screen',
    transitionConfig: () => fromRightWithFade(),
    ...customOptions,
  });

// Navigation
const BottomTabs = createBottomTabNavigator(
  {
    [TabNames.home]: {
      screen: createDefaultStackNavigator({
        Home,
        [RouteNames.SkillListScreen]: SkillsListScreen,
        [RouteNames.SkillDetailsScreen]: SkillDetailsScreen,
      }),
    },
    [TabNames.search]: {
      screen: createDefaultStackNavigator({ Search }),
    },
    [TabNames.post]: {
      screen: createDefaultStackNavigator({
        Post,
      }),
    },
    [TabNames.chat]: {
      screen: createDefaultStackNavigator({
        Chat,
      }),
    },
    [TabNames.profile]: {
      screen: createDefaultStackNavigator({
        Profile,
      }),
    },
  },
  {
    tabBarOptions: {
      activeBackgroundColor: Theme.colors.bottomNavbar,
      inactiveBackgroundColor: Theme.colors.bottomNavbar,
      activeTintColor: Theme.gray.lightest,
      inactiveTintColor: Theme.gray.light,
      labelStyle: { ...getFontStyleObject() },
      style: {
        borderTopColor: Theme.colors.bottomNavbar,
        height: Theme.specifications.bottomNavbarHeight,
        backgroundColor: Theme.colors.bottomNavbar,
      },
    },
    defaultNavigationOptions: ({ navigation }) => ({
      lazy: false,
      tabBarIcon: ({ tintColor }) => {
        const { routeName } = navigation.state;
        switch (routeName) {
          case TabNames.home:
            return getNavbarHomeIcon({ tintColor });
          case TabNames.search:
            return getNavbarSearchIcon({ tintColor });
          case TabNames.post:
            return getNavbarPostIcon({ tintColor });
          case TabNames.chat:
            return getNavbarChatIcon({ tintColor });
          case TabNames.profile:
            return getNavbarProfileIcon({ tintColor });
          default:
            return null;
        }
      },
      tabBarComponent: NavbarWrapper,
      tabBarButtonComponent: NavbarButtonWrapper,
      tabBarOnPress: ({ navigation, defaultHandler }) => {
        navigation.dispatch(StackActions.popToTop());
        defaultHandler();
      },
    }),
  },
);

const AuthStack = createDefaultStackNavigator({
  [RouteNames.AuthLogin]: { screen: AuthLogin },
});

const HomeStack = createStackNavigator(
  { [RouteNames.BottomTabs]: { screen: BottomTabs } },
  { defaultNavigationOptions: () => ({ header: null }) },
);

export const RootStack = createAppContainer(
  createSwitchNavigator({
    [RouteNames.Splash]: { screen: Splash },
    [RouteNames.AuthStack]: { screen: AuthStack },
    [RouteNames.HomeStack]: { screen: HomeStack },
  }),
);

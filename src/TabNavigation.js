import React, { useEffect } from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { withTheme } from 'react-native-paper';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from './screens/tabs/home/Home';
import Search from './screens/tabs/search/Search';
import Post from './screens/tabs/post/Post'
import Chat from './screens/tabs/chat/Chat';
import ChatRoom from './screens/tabs/chat/ChatRoom';
import NewChat from './screens/tabs/chat/newChat';
import Profile from './screens/tabs/profile/Profile';
import ProfileSettingsPage from './screens/tabs/profile/profileSettingsPage';
import RequestedCoursesPage from './screens/tabs/profile/requestedCourses';
import WishlistCoursesPage from './screens/tabs/profile/wishlistCourses';
import PostedCoursesPage from './screens/tabs/profile/postedCourses';
import GuestPage from './screens/tabs/profile/guestPage';
import LoginPage from './screens/tabs/userauth/login';
import signupPage from './screens/tabs/userauth/signup';
import forgotPassword from './screens/tabs/userauth/forgotPassword';
import { getAsyncData, stGetUser } from './components/common/asyncStorage';
import { useDispatch, useSelector } from 'react-redux';
import { loginSelector, loadUserInfo, setDeviceToken } from './redux/slices/loginSlice';
import { getRecentSearches, fetchTopCategories } from './redux/slices/searchSlice';
import messaging from "@react-native-firebase/messaging";

const TabNavigation = props => {
  const dispatch = useDispatch();
  const { colors } = props.theme;

  const ProfileStack = createStackNavigator();
  const ChatStack = createStackNavigator();
  const Tab = createMaterialBottomTabNavigator();


  useEffect(() => {
    loadInitialData()
  });

  const loadInitialData = () => {
    userInfo();
    searchInitialData();
    checkPermission();
  }

  const searchInitialData = () => {
    dispatch(getRecentSearches())
    dispatch(fetchTopCategories())
  }

  const userInfo = async () => {
    const userData = await getAsyncData('userInfo');
    // dispatch(loadUserInfo(userData));
  };

  const checkPermission = async () => {
    const enabled = await messaging().hasPermission();
    if (enabled) {
      getFcmToken();
    } else {
      requestPermission();
    }
  }

  const getFcmToken = async () => {
    fcmToken = await messaging().getToken();
    if (fcmToken) {
      // alert(fcmToken)
      dispatch(setDeviceToken(fcmToken))
      console.log(fcmToken);
      // this.showAlert("Your Firebase Token is:", fcmToken);
    } else {
      alert("Failed", "No token received");
    }
  }

  const requestPermission = async () => {
    try {
      await messaging().requestPermission();
      getFcmToken()
      // User has authorised
    } catch (error) {
      // User has rejected permissions
    }
  }


  function ProfileStackScreen() {
    return (
      <ProfileStack.Navigator
        headerMode={'none'}
        initialRouteName={'GuestPage'}>
        <ProfileStack.Screen name="Profile" component={Profile} />
        <ProfileStack.Screen name="GuestPage" component={GuestPage} />
        <ProfileStack.Screen name="Login" component={LoginPage} />
        <ProfileStack.Screen name="Signup" component={signupPage} />
        <ProfileStack.Screen name="ForgotPassword" component={forgotPassword} />
        <ProfileStack.Screen name="ProfileSettings" component={ProfileSettingsPage} />
        <ProfileStack.Screen name="RequestedCourses" component={RequestedCoursesPage} />
        <ProfileStack.Screen name="WishlistCourses" component={WishlistCoursesPage} />
        <ProfileStack.Screen name="PostedCourses" component={PostedCoursesPage} />
      </ProfileStack.Navigator>
    );
  }

  function ChatStackScreen() {
    return (
      <ChatStack.Navigator
        headerMode={'none'}
        initialRouteName={'ChatPage'}>
        <ChatStack.Screen name="ChatPage" component={Chat} />
        <ChatStack.Screen name="ChatRoom" component={ChatRoom} />
        <ChatStack.Screen name="NewChat" component={NewChat} />
      </ChatStack.Navigator>
    );
  }

  function MyTabs() {
    return (
      <Tab.Navigator
        initialRouteName="Home"
        activeColor={"black"}
        inactiveColor="grey"
        barStyle={{ backgroundColor: colors.primary }}
        sceneAnimationEnabled={false}
      >
        <Tab.Screen name="Home" component={Home} options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home-outline" color={color} size={26} />)
        }}
        />
        <Tab.Screen name="Search" component={Search} options={{
          tabBarLabel: 'Search',
          tabBarIcon: ({ color }) => (<MaterialCommunityIcons name="magnify" color={color} size={26} />)
        }}
        />
        <Tab.Screen name="Post" component={Post} options={{
          tabBarLabel: 'Post',
          tabBarIcon: ({ color }) => (<MaterialCommunityIcons name="plus-circle-outline" color={color} size={26} />),
        }}
        />
        <Tab.Screen name="Chat" component={ChatStackScreen} options={{
          tabBarLabel: 'Chat',
          tabBarIcon: ({ color }) => (<MaterialCommunityIcons name="message-outline" color={color} size={26} />),
        }}
        />
        <Tab.Screen name="Profile" component={ProfileStackScreen} options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (<MaterialCommunityIcons name="account-outline" color={color} size={26} />),
        }}
        />

      </Tab.Navigator>
    );
  }

  return (
    <NavigationContainer>
      {MyTabs()}
    </NavigationContainer>
  );
};

export default withTheme(TabNavigation);

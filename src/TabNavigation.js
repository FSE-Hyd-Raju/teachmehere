import React, { useEffect } from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import { withTheme } from 'react-native-paper';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
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
import loginSelector, { loadUserInfo } from './redux/slices/loginSlice';
import { getRecentSearches, fetchTopCategories } from './redux/slices/searchSlice';
import Home from './screens/tabs/home/Home';
import Search from './screens/tabs/search/Search';
import Post from './screens/tabs/post/Post';
import Chat from './screens/tabs/chat/Chat';
import ChatRoom from './screens/tabs/chat/ChatRoom';
import NewChat from './screens/tabs/chat/newChat';
import Profile from './screens/tabs/profile/Profile';

const TabNavigation = props => {
  const dispatch = useDispatch();

  const { colors } = props.theme;
  const [index, setIndex] = React.useState(3);

  const ProfileStack = createStackNavigator();
  const ChatStack = createStackNavigator();


  useEffect(() => {
    loadInitialData()
  });

  const loadInitialData = () => {
    userInfo();
    searchInitialData();

  }

  const searchInitialData = () => {
    dispatch(getRecentSearches())
    dispatch(fetchTopCategories())
  }

  const userInfo = async () => {
    const userData = await getAsyncData('userInfo');
    // dispatch(loadUserInfo(userData));
  };


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

  const [routes] = React.useState([
    { key: 'home', title: 'Home', icon: 'home-outline', color: colors.primary },
    { key: 'search', title: 'Search', icon: 'magnify', color: colors.primary },
    { key: 'post', title: 'Post', icon: 'plus-circle-outline', color: colors.primary },
    { key: 'chat', title: 'Chat', icon: 'message-outline', color: colors.primary },
    { key: 'profile', title: 'Profile', icon: 'account-outline', color: colors.primary },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: Home,
    search: Search,
    post: Post,
    chat: ChatStackScreen,
    profile: ProfileStackScreen,
  });

  return (
    <NavigationContainer>
      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
        sceneAnimationEnabled={false}
      />
    </NavigationContainer>
  );
};

export default withTheme(TabNavigation);

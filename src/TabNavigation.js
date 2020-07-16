import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import Home from './screens/tabs/Home';
import Search from './screens/tabs/search/Search';
import Post from './screens/tabs/post/Post';
import Chat from './screens/tabs/Chat';
import Profile from './screens/tabs/profile/Profile';
import { withTheme } from 'react-native-paper';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import ProfileSettingsPage from './screens/tabs/profile/profileSettingsPage';
import RequestedCoursesPage from './screens/tabs/profile/requestedCourses';
import WishlistCoursesPage from './screens/tabs/profile/wishlistCourses';
import PostedCoursesPage from './screens/tabs/profile/postedCourses';
import GuestPage from './screens/tabs/profile/guestPage';
import LoginPage from './screens/tabs/userauth/login';

const TabNavigation = props => {
  const { colors } = props.theme;
  const [index, setIndex] = React.useState(4);

  const ProfileStack = createStackNavigator();

  function ProfileStackScreen() {
    return (
      <ProfileStack.Navigator
        headerMode={'none'}
        initialRouteName={'GuestPage'}>
        <ProfileStack.Screen name="Profile" component={Profile} />
        <ProfileStack.Screen name="GuestPage" component={GuestPage} />
        <ProfileStack.Screen name="Login" component={LoginPage} />
        <ProfileStack.Screen
          name="ProfileSettings"
          component={ProfileSettingsPage}
        />
        <ProfileStack.Screen
          name="RequestedCourses"
          component={RequestedCoursesPage}
        />
        <ProfileStack.Screen
          name="WishlistCourses"
          component={WishlistCoursesPage}
        />
        <ProfileStack.Screen
          name="PostedCourses"
          component={PostedCoursesPage}
        />
      </ProfileStack.Navigator>
    );
  }

  const [routes] = React.useState([
    { key: 'home', title: 'Home', icon: 'home', color: colors.primary },
    { key: 'search', title: 'Search', icon: 'search', color: colors.primary },
    { key: 'post', title: 'Post', icon: 'plus', color: colors.primary },
    { key: 'chat', title: 'Chat', icon: 'chat', color: colors.primary },
    { key: 'profile', title: 'Profile', icon: 'user', color: colors.primary },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: Home,
    search: Search,
    post: Post,
    chat: Chat,
    profile: ProfileStackScreen,
  });

  return (
    <NavigationContainer>
      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
      />
    </NavigationContainer>
  );
};

export default withTheme(TabNavigation);

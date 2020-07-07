import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import Home from './screens/tabs/Home';
import Search from './screens/tabs/Search';
import Post from './screens/tabs/post/Post';
import Chat from './screens/tabs/Chat';
import Profile from './screens/tabs/Search';

const TabNavigation = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'home', title: 'Home', icon: 'home', color: 'black' },
    { key: 'search', title: 'Search', icon: 'search', color: 'black' },
    { key: 'post', title: 'Post', icon: 'plus', color: 'black' },
    { key: 'chat', title: 'Chat', icon: 'chat', color: 'black' },
    { key: 'profile', title: 'Profile', icon: 'user', color: 'black' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: Home,
    search: Search,
    post: Post,
    chat: Chat,
    profile: Profile,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

export default TabNavigation;

import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import Home from './screens/tabs/Home';
import Search from './screens/tabs/Search';
import Post from './screens/tabs/post/Post';
import Chat from './screens/tabs/Chat';
import Profile from './screens/tabs/Search';
import { withTheme } from 'react-native-paper';

const TabNavigation = props => {
  const { colors } = props.theme;
  const [index, setIndex] = React.useState(0);
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

export default withTheme(TabNavigation);

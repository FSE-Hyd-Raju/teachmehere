import React from 'react';
import { View, StyleSheet } from 'react-native';
import CategoryFlatList from '../../../components/common/CategoryFlatList';
import CategoryWrapper from '../../../components/common/CategoryWrapper';

const Home = props => {
  const categories = [
    { key: 1, value: 'Singing' },
    { key: 2, value: 'Dancing' },
    { key: 3, value: 'Other' },
    { key: 4, value: 'Another' },
  ];
  const showMore = () => {
    console.log('===> more');
  };
  return (
    <View style={[styles.container]}>
      <CategoryWrapper
        title={'Top Categories'}
        btnText={'More'}
        onButtonPress={() => showMore()}
      />
      <CategoryFlatList categories={categories} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
    marginBottom: 24,
  },
});

export default Home;

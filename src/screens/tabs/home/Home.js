import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  Image,
  Platform,
} from 'react-native';
import { Chip } from 'react-native-paper';
import SkillFlatList from '../../../components/common/SkillFlatList';
import CategoryWrapper from '../../../components/common/CategoryWrapper';
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
import { ScrollView } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
const categories = require('../post/categories.json');

import { random_rgba } from '../../../utils/random_rgba';
import CategoryFlatList from '../../../components/common/CategoryFlatList';

const { labelColor } = random_rgba();

const ENTRIES1 = [
  {
    title: 'IT & Software',
    subTitle: 'Learn Now',
    icon: 'laptop',
    illustration: 'https://i.imgur.com/UYiroysl.jpg',
  },
  {
    title: 'Finance & Accounting',
    subTitle: 'Learn from experts',
    icon: 'account_balance',
    illustration: 'https://i.imgur.com/UPrs1EWl.jpg',
  },
  {
    title: 'Marketing',
    subTitle: 'Learn Marketing',
    icon: 'marketing',
    illustration: 'https://i.imgur.com/MABUbpDl.jpg',
  },
  {
    title: 'Designing',
    subTitle: 'Learn to design',
    illustration: 'https://i.imgur.com/KZsmUi2l.jpg',
  },
  {
    title: 'Business',
    subTitle: 'Learn & Earn',
    illustration: 'https://i.imgur.com/2nCt3Sbl.jpg',
  },
];

const { width: screenWidth } = Dimensions.get('window');

const Home = props => {
  const categories = [
    { key: 1, value: 'Singing' },
    { key: 2, value: 'Dancing' },
    { key: 3, value: 'Other' },
    { key: 4, value: 'Another' },
  ];
  const showMore = () => {
    const data = {};
    props.navigation.navigate('SkillListView', {
      title: 'Featured Skills',
      data,
    });
  };

  const [entries, setEntries] = useState([]);
  const carouselRef = useRef(null);

  const goForward = () => {
    carouselRef.current.snapToNext();
  };

  useEffect(() => {
    setEntries(ENTRIES1);
  }, []);

  const { index } = useState(0);
  const renderItem = ({ item, index }, parallaxProps) => {
    return (
      <View>
        <ParallaxImage
          source={{ uri: item.illustration }}
          containerStyle={styles.imageContainer}
          style={styles.image}
          parallaxFactor={0.4}
          showSpinner={true}
          {...parallaxProps}
        />
        <Text style={styles.title} numberOfLines={2}>
          {item.title}
        </Text>
        <View style={styles.subTitleContainer}>
          <Text style={styles.subTitle} numberOfLines={2}>
            {item.subTitle}
          </Text>
          <IconMaterialIcons
            name={'school'}
            size={24}
            color={'white'}
            style={{ marginLeft: 10 }}
          />
        </View>
      </View>
    );
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.logo}>
        <Image
          source={require('../../../assets/img/logo.png')}
          style={{ height: 60, width: 150 }}
        />
      </View>
      <Carousel
        ref={carouselRef}
        containerCustomStyle={styles.carouselContainer}
        sliderWidth={screenWidth}
        sliderHeight={screenWidth}
        itemWidth={screenWidth - 60}
        data={entries}
        firstItem={0}
        renderItem={renderItem}
        hasParallaxImages={true}
        autoplay={true}
        autoplayDelay={2000}
        autoplayInterval={5000}
        enableMomentum={false}
        lockScrollWhileSnapping={true}
        loop={true}
        pagingEnabled={true}
      />
      <View style={{ marginTop: 7 }}>
        <CategoryWrapper
          title={'Featured Skills'}
          btnText={'See All'}
          onButtonPress={() => showMore()}
        />
        <SkillFlatList categories={categories} />
      </View>
      <View style={{ marginTop: 5 }}>
        <CategoryWrapper
          title={'Top Categories'}
          btnText={'See All'}
          onButtonPress={() => showMore()}
        />
        <View style={{ marginLeft: 15 }}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {entries &&
              entries.map(cat => {
                return (
                  <Chip
                    style={{ margin: 5, padding: 3 }}
                    avatar={<IconMaterialIcons name={cat.icon} size={20} />}
                    onPress={() => console.log('Pressed')}>
                    {cat.title}
                  </Chip>
                );
              })}
          </ScrollView>
        </View>
      </View>
      <View style={{ marginTop: 5 }}>
        <CategoryWrapper
          title={'Recomended Skills'}
          btnText={'See All'}
          onButtonPress={() => showMore()}
        />
        <CategoryFlatList categories={entries} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginBottom: 20,
    flex: 1,
  },
  logo: {
    alignItems: 'center',
  },
  carouselContainer: {
    marginTop: 25,
  },
  imageContainer: {
    marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
    backgroundColor: 'white',
    borderRadius: 8,
    height: 250,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
  title: {
    position: 'absolute',
    alignSelf: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 100,
    color: 'white',
  },
  subTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
  },
  subTitleContainer: {
    flexDirection: 'row',
    position: 'absolute',
    alignSelf: 'center',
    marginVertical: 150,
  },
});

export default Home;

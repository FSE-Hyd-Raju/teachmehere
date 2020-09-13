import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  Image,
  Platform,
} from 'react-native';
import SkillFlatList from '../../../components/common/SkillFlatList';
import CategoryWrapper from '../../../components/common/CategoryWrapper';
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';

//const categories = require('../post/categories.json');

import { random_rgba } from '../../../utils/random_rgba';
import CategoryFlatList from '../../../components/common/CategoryFlatList';
import CategoryChipView from '../../../components/common/CategoryChipView';
import { useDispatch, useSelector } from 'react-redux';
import {
  homeSelector,
  fetchInitialDataWhenAppLoading,
} from '../../../redux/slices/homeSlice';

const { labelColor } = random_rgba();

const { width: screenWidth } = Dimensions.get('window');

const Home = props => {
  const dispatch = useDispatch();
  const { categories = [], featuredSkills = [] } = useSelector(homeSelector);
  const showMore = (title, skills) => {
    props.navigation.navigate('SkillListView', {
      title: 'TEST',
      category: {},
      skills,
    });
  };

  const showCategorySkills = skills => {
    props.navigation.navigate('SkillListView', {
      title: skills.category,
      category: skills,
      skills: featuredCourses,
    });
  };

  const [entries, setEntries] = useState([]);
  const [featuredCourses, setFeaturedCourses] = useState([]);
  const carouselRef = useRef(null);

  const goForward = () => {
    carouselRef.current.snapToNext();
  };

  useEffect(() => {
    dispatch(fetchInitialDataWhenAppLoading());
    setEntries(categories);
    setFeaturedCourses(featuredSkills);
  }, []);

  const { index } = useState(0);
  const renderItem = ({ item, index }, parallaxProps) => {
    return (
      <TouchableOpacity onPress={() => showCategorySkills(item)}>
        <ParallaxImage
          source={{ uri: item.illustration }}
          containerStyle={styles.imageContainer}
          style={styles.image}
          parallaxFactor={0.4}
          showSpinner={true}
          {...parallaxProps}
        />
        <Text style={styles.title} numberOfLines={2}>
          {item.category}
        </Text>
        <View style={styles.subTitleContainer}>
          <Text style={styles.subTitle} numberOfLines={2}>
            {item.helpText}
          </Text>
          <IconMaterialIcons
            name={item.icon}
            size={24}
            color={'white'}
            style={{ marginLeft: 10 }}
          />
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.logo}>
        <View style={{ flex: 0.9, alignItems: 'center' }}>
          <Image
            source={require('../../../assets/img/logo.png')}
            style={{ height: 60, width: 150, flex: 0.8 }}
          />
        </View>
        <Icons
          style={{ marginTop: 25 }}
          name={'bell-outline'}
          // color="#fff"
          size={27}
          onPress={() => props.navigation.navigate('Notification')}
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
        enableMomentum={true}
        lockScrollWhileSnapping={false}
        loop={true}
      />
      <View style={{ marginTop: 7 }}>
        <CategoryWrapper
          title={'Featured Skills'}
          btnText={'See All'}
          onButtonPress={() => showMore({})}
        />
        <SkillFlatList skills={featuredCourses} />
      </View>
      <View style={{ marginTop: 5 }}>
        <CategoryWrapper
          title={'Top Categories'}
          btnText={'See All'}
          onButtonPress={() => showMore({})}
        />
        <View style={{ marginLeft: 15 }}>
          <CategoryChipView data={categories} keyProp={'category'} />
        </View>
      </View>
      <View style={{ marginTop: 5 }}>
        <CategoryWrapper
          title={'Recomended Skills'}
          btnText={'See All'}
          onButtonPress={() => showMore({})}
        />
        <SkillFlatList skills={featuredCourses} />
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
    flexDirection: 'row',
    justifyContent: 'space-evenly',
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

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
import { random_rgba } from '../../../utils/random_rgba';
import CategoryFlatList from '../../../components/common/CategoryFlatList';
import CategoryChipView from '../../../components/common/CategoryChipView';
import { useDispatch, useSelector } from 'react-redux';
import {
  homeSelector,
  fetchInitialDataWhenAppLoading,
} from '../../../redux/slices/homeSlice';
const { width: screenWidth } = Dimensions.get('window');

const Home = props => {
  const dispatch = useDispatch();
  const { homeData } = useSelector(homeSelector);
  const carouselRef = useRef(null);

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
      // skills: featuredCourses,
    });
  };

  useEffect(() => {
    dispatch(fetchInitialDataWhenAppLoading());
  }, []);

  const headerComponent = () => {
    return (
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
          size={27}
          onPress={() => props.navigation.navigate('Notification')}
        />
      </View>
    )
  }

  const carouselComponent = () => {

    const renderItem = ({ item, index }, parallaxProps) => {
      return (
        <TouchableOpacity onPress={() => showCategorySkills(item)} style={{ borderColor: "lightgrey", borderRadius: 11, borderWidth: 1, backgroundColor: "rgba(243, 246, 252, 0.7)" }}>
          <ParallaxImage
            source={{ uri: item.illustration }}
            containerStyle={styles.imageContainer}
            style={styles.image}
            style={{ resizeMode: item.rezisemode ? item.rezisemode : "contain" }}
            parallaxFactor={0.4}
            showSpinner={true}
            {...parallaxProps}
          />
          <Text style={styles.title} numberOfLines={2}>
            {item.category}
          </Text>
          <View style={styles.subTitleContainer}>
            <IconMaterialIcons
              name={item.icon}
              size={20}
              color={'black'}
              style={{ marginHorizontal: 10 }}
            />
            <Text style={styles.subTitle} numberOfLines={1}>
              {item.helpText}
            </Text>

          </View>
        </TouchableOpacity>
      );
    };

    return (
      <Carousel
        ref={carouselRef}
        containerCustomStyle={styles.carouselContainer}
        sliderWidth={screenWidth}
        sliderHeight={screenWidth}
        itemWidth={screenWidth - 100}
        data={homeData.categories}
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
    )
  }

  const topCategories = () => {
    return (
      <View style={{ marginTop: 25 }}>
        <CategoryWrapper
          title={'Top Categories'}
          btnText={'See All'}
          onButtonPress={() => showMore({})}
        />
        <View style={{ marginLeft: 15 }}>
          <CategoryChipView data={homeData.topCategories} keyProp={'category'} />
        </View>
      </View>
    )
  }

  const dataGroupsComponent = () => {
    return (
      Object.keys(homeData.dataGroups).map(group => {
        return (
          <View style={{ marginTop: 7 }}>
            <CategoryWrapper
              title={group}
              btnText={'See All'}
              onButtonPress={() => showMore({})}
            />
            <SkillFlatList skills={homeData.dataGroups[group]} categories={homeData.categories} />
          </View>
        )
      })
    )
  }

  return (
    <ScrollView style={styles.container}>
      {headerComponent()}
      {carouselComponent()}
      {topCategories()}
      {dataGroupsComponent()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
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
    height: 230,
    // opacity: 0.6,
    maxHeight: 160

  },
  image: {
    // ...StyleSheet.absoluteFillObject,
    // resizeMode: "center",
  },
  title: {
    position: 'absolute',
    alignSelf: 'center',
    fontSize: 20,
    // fontWeight: 'bold',
    marginVertical: 165,
    color: "black",
    // backgroundColor: "skyblue"
  },
  subTitle: {
    fontSize: 14,
    // fontWeight: 'bold',
    color: 'black',
    flex: 0.9,
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center"
  },
  subTitleContainer: {
    flexDirection: 'row',
    position: 'absolute',
    alignSelf: 'center',
    marginVertical: 200,
  },
});

export default Home;

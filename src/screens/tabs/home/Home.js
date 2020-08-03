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
const categories = require('../post/categories.json');

import { random_rgba } from '../../../utils/random_rgba';
import CategoryFlatList from '../../../components/common/CategoryFlatList';
import CategoryChipView from '../../../components/common/CategoryChipView';

const { labelColor } = random_rgba();

const { width: screenWidth } = Dimensions.get('window');

const Home = props => {
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
      skills,
    });
  };

  const [entries, setEntries] = useState([]);
  const carouselRef = useRef(null);

  const goForward = () => {
    carouselRef.current.snapToNext();
  };

  useEffect(() => {
    setEntries(categories);
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
            name={'school'}
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
        <SkillFlatList categories={categories} />
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

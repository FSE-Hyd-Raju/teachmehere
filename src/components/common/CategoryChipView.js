import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { Chip } from 'react-native-paper';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';

const CategoryChipView = props => {
  const { data, keyProp, categoryClicked } = props;
  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      {data &&
        data.map((item, index) => {
          return (
            <Chip
              key={index}
              style={{
                margin: 5,
                padding: 3,
                borderColor: 'lightgrey',
                borderWidth: 0,
                backgroundColor: 'rgba(243, 246, 252, 0.7)',
              }}
              avatar={
                item.icon ? (
                  <IconMaterialIcons name={item.icon} size={20} />
                ) : null
              }
              onPress={() => categoryClicked(item)}>
              {item[keyProp]}
            </Chip>
          );
        })}
    </ScrollView>
  );
};

export default CategoryChipView;

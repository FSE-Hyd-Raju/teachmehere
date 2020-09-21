import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { Chip } from 'react-native-paper';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';

const CategoryChipView = props => {
  const { data, keyProp } = props;
  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      {data &&
        data.map(item => {
          return (
            <Chip
              style={{ margin: 5, padding: 3, backgroundColor: "rgba(243, 246, 252, 0.7)" }}
              avatar={
                item.icon ? (
                  <IconMaterialIcons name={item.icon} size={20} />
                ) : (
                    <></>
                  )
              }
              onPress={() => console.log('Pressed')}>
              {item[keyProp]}
            </Chip>
          );
        })}
    </ScrollView>
  );
};

export default CategoryChipView;

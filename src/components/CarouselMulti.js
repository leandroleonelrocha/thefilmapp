import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import {Text, Title} from 'react-native-paper';
import Carousel from 'react-native-snap-carousel';
import {URL_IMG} from '../utils/constants';
import { useNavigation } from '@react-navigation/native';

const {width} = Dimensions.get('window');
const ITEM_WIDTH = Math.round(width * 0.3);

export default function CarouselMulti(props) {
  const {data, navigate} = props;

  return (
    <Carousel
      layout={'default'}
      data={data}
      renderItem={(item) => <RenderItem data={item} navigate={navigate} />}
      sliderWidth={width}
      itemWidth={ITEM_WIDTH}
      firstItem={1}
      inactiveSlideOpacity={1}
      inactiveSlideScale={1}
    />
  );
}

function RenderItem(props) {
  const {data} = props;
  const { id,title, poster_path} = data.item;
  const imgUrl = `${URL_IMG}/w500${poster_path}`;
  const navigation = useNavigation();


  const onNavigation = () => {
    //console.log(id)
    navigation.navigate('movie', {id})
  }

  return (
    <TouchableWithoutFeedback onPress={ onNavigation }>
      <View style={styles.card}>
        <Image source={{ uri: imgUrl }} style={styles.image} />
        <Text style={styles.title} numberOfLines={1}> {title}</Text>
      </View>
    </TouchableWithoutFeedback>
    
  );
}

const styles = StyleSheet.create({
  card:{
    shadowColor: "#000",
    shadowOffset:{
      width:0,
      height:10
    },
    shadowOpacity: 1,
    shadowRadius: 10
  },
  image:{
    width: '85%',
    height: 170,
    borderRadius: 20
  },
  title:{
    marginHorizontal:10,
    marginTop: 10,
    fontSize: 16,



  }

});

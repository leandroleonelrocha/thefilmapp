import React, {useState, useEffect} from 'react';
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
import {getGenreMovieApi} from '../api/movies';
import {map, size} from 'lodash';
import { useNavigation } from '@react-navigation/native';

const {width} = Dimensions.get('window');
const ITEM_WIDTH = Math.round(width * 0.7);

export default function CarouselVertical(props) {
  const {data} = props;

  return (
    <Carousel
      layout={'default'}
      data={data}
      renderItem={(item) => <RenderItem data={item} />}
      sliderWidth={width}
      itemWidth={ITEM_WIDTH}
    />
  );
}

function RenderItem(props) {
  const {data} = props;
  const navigation = useNavigation();

  const { id,title, poster_path, genre_ids} = data.item;
  const [genres, setGenres] = useState(null);
  const imgUrl = `${URL_IMG}/w500${poster_path}`;

  useEffect(() => {
    getGenreMovieApi(genre_ids).then((response) => {
      setGenres(response);
    });
  }, []);

  const onNavigation = () => {
    
    navigation.navigate('movie', {id: id});

  }

  return (
    <TouchableWithoutFeedback onPress={onNavigation}>
      <View style={styles.card}>
        <Image style={styles.image} source={{uri: imgUrl}} />
        <Title style={styles.title}> {title} </Title>
        <View style={styles.genres}>
          {genres &&
            map(genres, (genre, index) => (
              <Text key={index} style={styles.genre}>
                {genre}
                {index !== size(genres) - 1 && ', '}
              </Text>
            ))}
        </View>
      </View>
    </TouchableWithoutFeedback>

    /*
        <View>
            <Text>Pelicula</Text>
        </View>
        */
  );
}

const styles = StyleSheet.create({
  card: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  image: {
    width: '100%',
    height: 450,
    //  borderRadius: 20
  },
  title: {
    marginHorizontal: 10,
    marginTop: 10,
  },
  genres: {
    flexDirection: 'row',
    marginHorizontal: 10,
  },
  genre: {
    fontSize: 12,
    color: '#8997a5',
  },
});

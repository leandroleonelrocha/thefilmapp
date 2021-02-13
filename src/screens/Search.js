import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
  SafeAreaView,
  Platform,
} from 'react-native';
import {getSearchMovie} from '../api/movies';
import {URL_IMG} from '../utils/constants';
import {Searchbar} from 'react-native-paper';
import {size, map} from 'lodash';
const {width} = Dimensions.get('window');

export default function Search(props) {
  const {navigation} = props 
  const [movies, setMovies] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (size(search) > 2) {
      getSearchMovie(search).then((response) => {
        console.log(response.results);
        setMovies(response.results);
      });
    }
  }, [search]);

  return (
    <SafeAreaView>
      <Searchbar
        placeholder="Buscar película"
        iconColor={Platform.OS === 'ios' && 'transparent'}
        icon="arrow-left"
        style={styles.input}
        onChangeText={(e) => setSearch(e)}
      />
      <ScrollView>
        <View style={styles.container}>
          {map(movies, (movie, index) => (
            <Movie key={index} movie={movie} navigation={navigation} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function Movie(props) {
  const {movie, navigation} = props;

    const goMovie = () => {
        navigation.navigate('movie', {id:movie.id})

    }

  return (
    <TouchableWithoutFeedback onPress={ goMovie }>
      <View style={styles.containerImg}>
        {movie.poster_path ? (
            <Image
            style={styles.img}
            source={{uri: `${URL_IMG}/w500/${movie.poster_path}`}}
            />

        ) : (
            <Text>{movie.title}</Text>
        )}

      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  input: {
    marginTop: -3,
    backgroundColor: '#15212b',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  containerImg:{
    width: width / 2 ,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    // width: width ,
    width: '100%',
    height: '100%',
 
  },
});

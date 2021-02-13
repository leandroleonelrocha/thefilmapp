import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import {Text, Title, Button} from 'react-native-paper';
import {map} from 'lodash';
import {getNewsMoviesAPi} from '../api/movies';
import {URL_IMG} from '../utils/constants';
import usePreferences from '../hooks/usePreferences';

const {width} = Dimensions.get('window');

export default function News(props) {
  const {navigation} = props;
  const [movies, setMovies] = useState(null);
  const [page, setPage] = useState(1);
  const [showBtn, setShowBtn] = useState(true);
  const {theme} = usePreferences();
    
  useEffect(() => {
    getNewsMoviesAPi().then((response) => {
      const total = response.total_pages;
      if (page < total) {
        if (!movies) {
          setMovies(response.results);
        } else {
          setMovies([...movies, ...response.results]);
        }
      } else {
        setShowBtn(false);
      }
    });
  }, [page]);

  return (
    <ScrollView>
      <View style={styles.viewMovie}>
        {map(movies, (movie, index) => (
          <Movie key={index} movie={movie} navigation={navigation} />
        ))}
      </View>
      {showBtn && (
        <Button
          contentStyle={styles.contentBtn}
          style={styles.btn}
          mode="contained"
          labelStyle={{color: theme === 'Dark' ? '#fff' : '#000'}}
          onPress={() => setPage(page + 1)}>
          Cargar más
        </Button>
      )}
    </ScrollView>
  );
}

function Movie(props) {
  const {movie, navigation} = props;

  const goMovie = () => {
    navigation.navigate('movie', {id:movie.id})
  }

  return (
      <TouchableWithoutFeedback onPress={ goMovie }>
        <View style={styles.movie}>
        {movie.poster_path ? (
            <Image
            source={{uri: `${URL_IMG}/w500/${movie.poster_path}`}}
            style={styles.img}
            />
        ) : (
            <Text> {movie.title} </Text>
        )}
        </View>
      </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  viewMovie: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  movie: {
    width: width / 2,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: '100%',
    height: '100%',
  },
  contentBtn: {
    paddingTop: 10,
    paddingBottom: 30,
  },
  btn: {
    backgroundColor: 'transparent',
  },
});

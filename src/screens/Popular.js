import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import {getPopularMovie} from '../api/movies';
import {map} from 'lodash';
import {Button, Text, Title} from 'react-native-paper';
import {URL_IMG} from '../utils/constants';
import noImage from '../assets/img/default-image.png';
import {Rating} from 'react-native-ratings';
import starDark from '../assets/img/starDark.png';
import starLight from '../assets/img/starLight.png';
import usePreferences from '../hooks/usePreferences';

export default function Popular(props) {
  const {navigation} = props;
  const [movies, setMovies] = useState(null);
  const [showBtnMore, setShowBtnMore] = useState(true);
  const [page, setPage] = useState(1);
  const {theme} = usePreferences();

  useEffect(() => {
    getPopularMovie(page).then((response) => {
      const totalPages = response.total_pages;
      if (page < totalPages) {
        if (!movies) { 
          setMovies(response.results);
        } else {
          setMovies([...movies, ...response.results]);
        }
      } else {
        setShowBtnMore(false);
      }
    });
  }, [page]);

  return (
    <ScrollView>
      {map(movies, (movie, index) => (
        <Movie key={index} movie={movie} navigation={navigation} />
      ))}

      {showBtnMore && (
        <Button
          mode="contained"
          contentStyle={styles.contentBtn}
          style={styles.btnMore}
          labelStyle={{color: theme === 'Dark' ? '#fff' : '#000'}}
          onPress={() => setPage(page + 1)}>
          Cargar mas ...
        </Button>
      )}
    </ScrollView>
  );
}

function Movie(props) {
  const {movie, navigation} = props;

  const goMovie = () => {
   navigation.navigate('movie', {id: movie.id})
  }  

  return (
    <TouchableWithoutFeedback onPress={ goMovie }>
      <View style={styles.viewMovies}>
        <View style={styles.left}>
          <Image
            style={styles.img}
            source={
              movie.poster_path
                ? {uri: `${URL_IMG}/w500${movie.poster_path}`}
                : noImage
            }
          />
        </View>
        <View style={styles.right}>
          <Title>{movie.title}</Title>
          <Text>{movie.release_date}</Text>
          <MovieRating
            voteCount={movie.vote_count}
            voteAverage={movie.vote_average}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

function MovieRating(props) {
  const {theme} = usePreferences();
  const {voteCount, voteAverage} = props;
  const media = voteAverage / 2;

  return (
    <View style={styles.viewRating}>
      <Rating
        type="custom"
        ratingImage={theme === 'Dark' ? starDark : starLight}
        ratingColor="#ffc205"
        ratingBackgroundColor={theme === 'Dark' ? '#192734' : '#f0f0f0'}
        startingValue={media}
        imageSize={20}
        style={{marginRight: 15}}
      />
      <Text style={{fontSize: 12, color: '#8697a5', marginTop: 5}}>
        {voteCount} votos
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  viewMovies: {
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  left: {
    marginRight: 20,
  },
  right: {},
  img: {
    width: 100,
    height: 150,
  },
  viewRating: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginTop: 20,
  },
  contentBtn: {
    paddingTop: 10,
    paddingBottom: 30,
  },
  btnMore: {
    backgroundColor: 'transparent',
  },
});

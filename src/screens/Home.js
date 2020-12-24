import React, {useState, useEffect} from 'react';
import {Text, View, ScrollView, StyleSheet} from 'react-native';
import {getNewsMoviesAPi, getAllGenres, getSelectedGenreMovie} from '../api/movies';
import {Title} from 'react-native-paper';
import CarouselVertical from '../components/CarouselVertical';
import CarouselMulti from '../components/CarouselMulti';
import {map} from 'lodash';

export default function Home(props) {
  const {navigation} = props;
  const [newMovies, setNewMovies] = useState(null);
  const [listGeneros, setListGeneros] = useState([]);
  const [newGenreSelect, setNewGenreSelect] = useState(28);
  const [newMoviesSelected, setNewMoviesSelected] = useState(null);
  //console.log(newMoviesSelected);

  useEffect(() => {
    getNewsMoviesAPi().then((response) => {
      setNewMovies(response.results);
    });
  }, []);

  useEffect(() => {
    getAllGenres().then((response) => {
      setListGeneros(response.genres);
    });
  }, []);

  useEffect( () => {
    getSelectedGenreMovie(newGenreSelect).then((response) => {
      setNewMoviesSelected(response.results)
  
    });
  }, [newGenreSelect]);

  const onChangeGenre = (genreId) => {
    setNewGenreSelect(genreId);
  };

  return (
    <ScrollView showsHorizontalScrollIndicator={false}>
      {newMovies && (
        <View style={styles.news}>
          <Title style={styles.newsTitle}>Nuevas Películas</Title>
          <CarouselVertical data={newMovies} navigation={navigation} />
        </View>
      )}

      <View style={styles.genres}>
        <Title style={styles.titleGenre}>Películas por géneros</Title>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.genresList}>
          {map(listGeneros, (generos) => (
            <Text
              key={generos.id}
              style={[
                styles.genresText,
                {color: generos.id !== newGenreSelect ? '#8697a5' : '#fff'},
              ]}
              onPress={ () => onChangeGenre(generos.id)  }
              >
              {generos.name}
            </Text>
          ))}
        </ScrollView>

        {newMoviesSelected && (
          <CarouselMulti data={newMoviesSelected} navigation={navigation} />
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  news: {
    marginVertical: 10,
  },
  newsTitle: {
    marginBottom: 15,
    marginHorizontal: 20,
    fontWeight: 'bold',
    fontSize: 22,
  },
  genres: {
    marginTop: 20,
    marginBottom: 50,
  },
  titleGenre: {
    fontSize: 22,
    fontWeight: 'bold',
    marginHorizontal: 20,
  },
  genresList: {
    marginTop: 5,
    paddingHorizontal: 20,
    marginBottom: 15,
    padding: 10,
  },
  genresText: {
    marginRight: 20,
    fontSize: 16,
  },
});

import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, ScrollView, Image} from 'react-native';
import {getMovieById} from '../api/movies';
import {URL_IMG} from '../utils/constants';
import ModalVideo from '../components/ModalVideo';
import { IconButton, Title } from 'react-native-paper';
import {map} from 'lodash';
export default function Movie(props) {
  const {route} = props;
  const id = route.params.id;
  const [movie, setMovie] = useState(null);
  const [showVideo, setShowVideo] = useState(false)

  useEffect(() => {
    getMovieById(id).then((response) => {
      setMovie(response);
    });
  }, []);
 
  if (!movie) {
    return null;
  }

  return (
    <>
      <ScrollView>
        <MovieImage imagen={movie.poster_path} />
        <MovieTrailer setShow={setShowVideo} />
        <MovieInfo movie={movie} />
      </ScrollView>
      <ModalVideo show={showVideo} setShow={setShowVideo} movieId={id} />
    </>
  );
}

function MovieImage(props) {
  const {imagen} = props;

  const img = `${URL_IMG}/w500${imagen}`;

  return (
    <View style={styles.viewImage}>
      <Image  style={styles.img} source={{uri: img}} />
    </View>
  );
}

function MovieTrailer(props){

  const { setShow } = props

  return(

    <View style={styles.viewPlay}>
      <IconButton 
        icon="play"
        color="#000"
        size={30}
        style={styles.play}
        onPress={ () => setShow(true) }
      />
    </View>

  )

}

function MovieInfo(props){
  const { movie } = props
  console.log(movie.genres)
  return(
    <View style={styles.viewInfo}>
      <Title> {movie.title} </Title>
      <View style={styles.viewGenres}>
        {map(movie.genres, (genre) => (
          <Text key={genre.id} style={styles.genre}>{genre.name}</Text>
        ) )}
      </View>
    </View>

  )
}

const styles = StyleSheet.create({
  viewImage: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 1,
    textShadowRadius: 10,
  },
  img: {
    width: '100%',
    height: 500,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  viewPlay:{
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  play:{
    backgroundColor: '#fff',
    marginTop: -40,
    marginRight: 30,
    width: 60,
    height: 60,
    borderRadius: 100
  },
  viewInfo:{
    marginHorizontal:30,

  },
  viewGenres:{
    flexDirection: 'row',
   
  },
  genre:{
    marginRight: 30,
    color: '#8697a5'
  }

});

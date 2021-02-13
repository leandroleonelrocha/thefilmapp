import {API_KEY, API_URL, LANG} from '../utils/constants';

export function getNewsMoviesAPi(page = 1) {
  const url = `${API_URL}/movie/now_playing?api_key=${API_KEY}&language=${LANG}&page=${page}`;

  return fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    });
}

export function getGenreMovieApi(IdGenero) {
  const url = `${API_URL}/genre/movie/list?api_key=${API_KEY}&lenguage=${LANG}`;
  
  return fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      //return result;
        const arrayGeneros = [];
        IdGenero.forEach((id) => {
          
            result.genres.forEach((item) => {
                if(item.id === id) arrayGeneros.push(item.name)
            });

        });
        return arrayGeneros;

    });
}

export function getAllGenres(){

  const url = `${API_URL}/genre/movie/list?api_key=${API_KEY}&lenguage=${LANG}`;

  return fetch(url).then((response) => {
    return response.json();
  }).then( (result) => {
    return result;
  })


}

export function getSelectedGenreMovie(IdGenre){

  const url = `${API_URL}/discover/movie?api_key=${API_KEY}&with_genres=${IdGenre}&lenguage=${LANG}`;

  return fetch(url).then((response) => {
    return response.json();
  }).then( (result) => {
    return result;
  })


} 

export function getMovieById(movieId){
  const url = `${API_URL}/movie/${movieId}?api_key=${API_KEY}&lenguage=${LANG} `;
  
  return fetch(url).then((response) => {
    return response.json();
  }).then( (result) => {
    return result;
  })

}

export function getMovieVideo(movieId){
  const url = `${API_URL}/movie/${movieId}/videos?api_key=${API_KEY}&lenguage=${LANG}`;
  
  return fetch(url).then((response) => {
    return response.json();
  }).then( (result) => {
    return result;
  })

}

export function getPopularMovie(page = 1){
  const url = `${API_URL}/movie/popular?api_key=${API_KEY}&lenguage=${LANG}&page=${page}`;

  return fetch(url).then((response) => {
    return response.json();
  }).then( (result) => {
    return result;
  })


}

export function getSearchMovie(search){

  const url = `${API_URL}/search/movie?api_key=${API_KEY}&lenguage=${LANG}&query=${search}`;

  return fetch(url).then((response) => {
    return response.json();
  }).then( (result) => {
    return result;
  })


}
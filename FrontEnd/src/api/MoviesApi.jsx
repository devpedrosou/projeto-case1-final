const MoviesApi = () => {
    const url = 'http://localhost:8080'
  
    return {
        getMovies () {
            return fetch(`${url}/filme`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        },
        deleteMovie (movieId) {
          return fetch(`${url}/filme/${movieId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
         })
        },
        createMovie (titulo, total_de_horas) {
          return fetch(`${url}/filme`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
              {
                titulo: titulo,
                total_de_horas: total_de_horas
              }
            )
         })
        },
        updateMovie(movieId, titulo, total_de_horas) {
          return fetch(`${url}/filme/${movieId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
              {
                titulo: titulo,
                total_de_horas: total_de_horas
              }
            )
         })
        },
    }
  }
  
  export default MoviesApi
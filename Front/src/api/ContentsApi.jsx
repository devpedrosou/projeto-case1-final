const ContentsApi = () => {
  const url = 'http://localhost:6808'

  return {
      getContents () {
          return fetch(`${url}/serie`, {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json'
              }
          })
      },
      deleteContent (contentId) {
        return fetch(`${url}/serie/id/${contentId}`, {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json'
          }
       })
      },
      createContent (titulo, episodios, temporadas, status) {
        return fetch(`${url}/serie`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(
            {
              titulo: titulo,
              episodios: episodios,
              temporadas: temporadas,
              status: status
            }
          )
       })
      },
      updateContent(contentId, titulo, episodios, temporadas, status) {
        return fetch(`${url}/serie/id/${contentId}`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(
            {
              titulo: titulo,
              episodios: episodios,
              temporadas: temporadas,
              status: status
            }
          )
       })
      },
  }
}

export default ContentsApi
import { Table, Container, Button } from 'react-bootstrap'
import MoviesApi from './api/MoviesApi'
import { useEffect, useState } from 'react'
import CreateModal from './components/CreateModal'
import UpdateModal from './components/UpdateModal'

function App() {
  const [movies, setMovies] = useState()
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)
  const [selectedMovie, setSelectedMovie] = useState()

  const handleCloseCreateModal = () => setIsCreateModalOpen(false);
  const handleShowCreateModal = () => setIsCreateModalOpen(true);

  const handleCloseUpdateModal = () => setIsUpdateModalOpen(false);
  const handleShowUpdateModal = () => setIsUpdateModalOpen(true);

  useEffect(() => {
    async function getData() {
      await MoviesApi().getMovies().then(data => {
        return data.json()
      })
      .then(data => {
        setMovies(data)
      })
    }

    getData()
  }, [])

  
  async function createMovie(event) {
    try {
      event.preventDefault()

      const req = event.currentTarget.elements

      await MoviesApi().createMovie(
        req.titulo.value, Number(req.total_de_horas.value)
      ).then(data => {
        return data.json()
      }).then(res => {
        setMovies([...movies, {
          id: res.movieId,
          titulo: req.titulo.value,
          total_de_horas: Number(req.total_de_horas.value)
        }])

        setIsCreateModalOpen(false)
      })
    } catch(err) {
      throw err
    }
  }

  async function deleteMovie(movieId) {
    try {
      await MoviesApi().deleteMovie(movieId)

      const formattedMovies = movies.filter(cont => {
        if(cont.id !== movieId){
          return cont
        }
      })

      setMovies(formattedMovies)
    } catch(err) {
      throw err
    }
  }

  async function updateMovie(event) {
    try {
      event.preventDefault()

      const req = event.currentTarget.elements

      await MoviesApi().updateMovie(
        selectedMovie.id, req.titulo.value, Number(req.total_de_horas.value)
      )

      const formattedMovies = movies.map(cont => {
        if(cont.id === selectedMovie.id) {
          return {
            id: selectedmovie.id,
            titulo: req.titulo.value,
            total_de_horas: Number(req.total_de_horas.value)
          }
        }

        return cont
      })

      setMovies(formattedMovies)

      setIsUpdateModalOpen(false)
    } catch(err) {
      throw err
    }
  }

  return (
    <>
    <Container
    className="
    d-flex
    flex-column
    align-items-start
    justify-content-center
    h-100
    w-100
    "
    >
      <Button
        className="mb-2"
        onClick={handleShowCreateModal}
        variant='primary'>
        Inserir Filme
      </Button>
       <Table striped bordered hover>
        <thead>
          <tr>
            <th>Título</th>
            <th>Total de Páginas</th>
            <th>Páginas Lidas</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {movies && movies.map(cont => (
            <tr key={cont.id}>
              <td>{cont.titulo}</td>
              <td>{cont.total_de_horas}</td>
              <td>
                <Button onClick={() => deleteMovie(cont.id)} variant='danger'>
                  Excluir
                </Button>
                <Button
                  onClick={() => {
                    handleShowUpdateModal()
                    setSelectedMovie(cont)
                  }}
                  variant='warning'
                  className='m-1'
                  >
                  Atualizar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
    <CreateModal isModalOpen={isCreateModalOpen} handleClose={handleCloseCreateModal} createMovie={createMovie} />
    {selectedMovie && (
      <UpdateModal isModalOpen={isUpdateModalOpen} handleClose={handleCloseUpdateModal} updateMovie={updateMovie} movie={selectedMovie} />
    )}
    </>
  )
}

export default App

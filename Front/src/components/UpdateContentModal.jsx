import { Modal, Button, Form } from 'react-bootstrap'
function UpdateContentModal(props) {
  return(
    <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >
      <Modal show={props.isModalOpen}>
        <Form onSubmit={(event) => {
          props.updateContent(event)
        }}>
        <Modal.Header closeButton onClick={props.handleClose}>
          <Modal.Title>Atualizar Conteúdo</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Group controlId="titulo">
            <Form.Label>
              Titulo
            </Form.Label>
            <Form.Control defaultValue={props.content.titulo} type="text" />
          </Form.Group>

          <Form.Group controlId="episodios">
            <Form.Label>
              Episodios
            </Form.Label>
            <Form.Control defaultValue={props.content.episodios} type="number" />
          </Form.Group>

          <Form.Group controlId="temporadas">
            <Form.Label>
              Temporadas
            </Form.Label>
            <Form.Control defaultValue={props.content.temporadas} type="number" />
          </Form.Group>

          <Form.Group controlId="status">
            <Form.Label>
              Status
            </Form.Label>
            <Form.Control defaultValue={props.content.status} type="text" />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>Close</Button>
          <Button variant="primary" type="submit">Salvar</Button>
        </Modal.Footer>
        </Form>
      </Modal >
    </div>
  )
}

export default UpdateContentModal

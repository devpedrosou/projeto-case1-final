const ContentsDAO = require('../DAO/ContentsDAO.js')

class contentsController {
  static rotas(app){
    app.get('/serie', contentsController.listar)
    app.post('/serie', contentsController.inserir)
    app.delete('/serie/id/:id', contentsController.deletar)
    app.put('/serie/id/:id', contentsController.atualizar)
  }

  static async listar(req, res){
    const conteudos = await ContentsDAO.listar()

    res.status(200).send(conteudos)
  }

  static async inserir(req, res){
    const conteudo = {
      titulo: req.body.titulo,
      episodios: req.body.episodios,
      temporadas: req.body.temporadas,
      status: req.body.status
    }

    const result = await ContentsDAO.inserir(conteudo)

    if(result.erro) {
      res.status(500).send(result)
    }

    res.status(201).send(result)
  }

  static async deletar(req, res){
    const conteudo = await ContentsDAO.deletar(req.params.id)

    if(conteudo.erro){
        res.status(500).send('Erro ao deletar a série')
    }

    res.status(204).send({mensagem: 'Série removida com sucesso'})
  }

  static async atualizar(req, res){
    const conteudo = {
      titulo: req.body.titulo,
      episodios: req.body.episodios,
      temporadas: req.body.temporadas,
      status: req.body.status
    }

    const result = await ContentsDAO.atualizar(req.params.id, conteudo)

    if(result.erro){
        res.status(500).send('Erro ao atualizar a série')
    }

    res.status(201).send({mensagem: 'Série alterada com sucesso'})
  }
}

module.exports = contentsController
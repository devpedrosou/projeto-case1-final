const SeriesDAO = require('../DAO/SeriesDAO.js')

class seriesController {
  static rotas(app){
    app.get('/serie', seriesController.listar)
    app.post('/serie', seriesController.inserir)
    app.delete('/serie/id/:id', seriesController.deletar)
    app.put('/serie/id/:id', seriesController.atualizar)
  }

  static async listar(req, res){
    const series = await SeriesDAO.listar()

    res.status(200).send(series)
  }

  static async inserir(req, res){
    const series = {
      titulo: req.body.titulo,
      episodios: req.body.episodios,
      temporadas: req.body.temporadas,
      status: req.body.status
    }

    const result = await SeriesDAO.inserir(series)

    if(result.erro) {
      res.status(500).send(result)
    }

    res.status(201).send(result)
  }

  static async deletar(req, res){
    const series = await SeriesDAO.deletar(req.params.id)

    if(series.erro){
        res.status(500).send('Erro ao deletar a série')
    }

    res.status(204).send({mensagem: 'Série removida com sucesso'})
  }

  static async atualizar(req, res){
    const series = {
      titulo: req.body.titulo,
      episodios: req.body.episodios,
      temporadas: req.body.temporadas,
      status: req.body.status
    }

    const result = await SeriesDAO.atualizar(req.params.id, series)

    if(result.erro){
        res.status(500).send('Erro ao atualizar a série')
    }

    res.status(201).send({mensagem: 'Série alterada com sucesso'})
  }
}

module.exports = seriesController
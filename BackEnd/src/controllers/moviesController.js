const MoviesDAO = require('../DAO/MoviesDAO')

class moviesController {
    static rotas(app){
        // Rotas para os recursos movies. O endpoint das rotas aparece na primeira parte entre aspas. O que vem depois são os métodos que trabalharão com as requisições.
        app.get('/filme', moviesController.listar)
        app.post('/filme', moviesController.inserir)
        app.delete('/filme/:id', moviesController.deletar)
        app.put('/filme/:id', moviesController.atualizar)
    }

    // GET
    static async listar(req, res){
        const filmes = await MoviesDAO.listar()
        
        // Devolve a lista de usuarios e o status code 200, quer dizer que a requisição foi bem sucedida.
        res.status(200).send(filmes)
    }

    // POST
    static async inserir(req, res){
        const filme = {
            titulo: req.body.titulo,
             total_de_horas: req.body. total_de_horas
        }

        // Verifica se o corpo da requisição está sendo enviado com todas as chaves, se faltar alguma chave, entra no If e dá um status de requisição mal sucedida, dá um return encerrando a função.
        if(!filme || !filme.titulo || !filme. total_de_horas) {
            res.status(400).send("Precisa passar as informações")
            return
        }

        // Classe MoviesDAO é chamada com o método inserir para adicionar o filme na tabela de movies no banco e retorna o resultado da operação que é o próprio filme cadastrado
        const result = await MoviesDAO.inserir(filme)

        // Se o resultado retornado não for o filme que enviamos, ele trará a informação da chave erro. Esse retorno de erro tem ligação com uma funcão de conexão do próprio SQLite. Se entrar no If, dá um status code 500.        
        if(result.erro) {
            res.status(500).send(result)
        }

        // Se o cadastro ocorrer tudo OK, devolve o status code 201, que é o ideal para ROTAS POST, que quer dizer: Recurso Criado, ou seja, houve a cadastro de algo no banco. 
        // Abaixo a resposta personalizada que será mostrada, em caso de status 201. Além da mensagem, mostra também o objeto cadastrado
        res.status(201).send({"Mensagem": "Filme criado com sucesso", "Novo Filme: ": filme})
    }

    // DELETE
    static async deletar(req, res) {
        // Envia a constante id do usuário para MoviesDAO.deletar.
        const filme = await MoviesDAO.deletar(req.params.id)

        // Se o filme não for encontrado, devolve um erro staus code 500.
        if(filme.erro){
            res.status(500).send({'Menssagem': 'Erro ao deletar o filme'})
            return
        }

        res.status(200).send({mensagem: 'Filme removido com sucesso'})
    }

    // PUT --   Função RUN - Executa a função. No callback NÂO existe o argumento ROWS, apenas o argumento ERR. Se tudo der certo, devolve o objeto: { mensagem: "Filme" atualizado com sucesso" }
    static async atualizar(req, res){
        const filme = {
            titulo: req.body.titulo,
             total_de_horas: req.body. total_de_horas
        }

        const result = await MoviesDAO.atualizar(req.params.id, filme)

        if(result.erro){
            res.status(500).send('Erro ao atualizar o filme')
            return
        }

        res.status(200).send({mensagem: 'Filme atualizado com sucesso', "Filme: ": filme})
    }
}

// Exportação da Classe "moviesController"
module.exports = moviesController
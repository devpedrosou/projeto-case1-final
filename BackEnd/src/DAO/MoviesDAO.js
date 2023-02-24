// Importação do arquivo "db.js"
const db = require("../infra/db");

// Essa classe encapsula o acesso ao Banco de Dados.
class MoviesDAO {

    // GET  --  Função ALL - Retorna todas as linhas.
    static listar() {
        const query = 'SELECT * FROM FILMES';
        return new Promise((resolve, reject) => {
            db.all(query, (err, rows) => {
                if (err) {
                    reject(err);
                }
                resolve(rows)
            });
        });
    }

    // POST  --  Função RUN - Executa a função. No callback NÂO existe o argumento ROWS, apenas o argumento ERR, porém devolvemos ao usuário.
    static inserir(filme) {
        const query = 'INSERT INTO FILMES (titulo, total_de_horas) VALUES (?, ?, ?)';
        return new Promise((resolve, reject) => {
            db.run(query, [filme.titulo, filme.total_de_horas], (err) => {
                if (err) {
                    reject({
                        mensagem: "Erro ao inserir o filme",
                        erro: err,
                    });
                }
                resolve(filme);
            });
        });
    }

    // DELETE -- Função RUN - Executa a função. No callback NÂO existe o argumento ROWS e nem ROW. Existe apenas o argumento ERR. Se tudo der certo, devolve o objeto: { mensagem: "Movie deletado com sucesso" }
    static deletar(id) {
        const query = 'DELETE FROM filmes WHERE id = ?';
        return new Promise((resolve, reject) => {
            db.run(query, [id], (err) => {
                if (err) {
                    reject({
                        mensagem: "Erro ao deletar o filme",
                        erro: err
                    });
                }
                resolve({ mensagem: "Filme deletado com sucesso", id: id })
            });
        });
    }
    
    // PUT -- Função RUN - Executa a função. No callback NÂO existe o argumento ROWS, apenas o argumento ERR. Se tudo der certo, devolve o objeto: { mensagem: "Movie atualizado com sucesso" }
    static atualizar(id, filme) {
        const query = 'UPDATE FILMES SET titulo = ?, total_de_horas = ?, WHERE id = ?';
        return new Promise((resolve, reject) => {
            db.run(query, [filme.titulo, filme.total_de_horas, id], (err) => {
                if (err) {
                    reject({
                        mensagem: "Erro ao atualizar o filme",
                        erro: err,
                    });
                }
                resolve({ mensagem: "Movie atualizado com sucesso" });
            });
        });
    }

}

// Exportação da classe
module.exports = MoviesDAO
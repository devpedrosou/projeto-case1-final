const db = require('../infra/db.js')

class SeriesDAO {
    static listar() {
        const query = 'SELECT * FROM SERIES';
        return new Promise((resolve, reject) => {
            db.all(query, (err, rows) => {
                if (err) {
                    reject(err);
                }

                resolve(rows)
            });
        });
    }

    static inserir(series) {
        const query = 'INSERT INTO SERIES (titulo, episodios, temporadas, status) VALUES (?, ?, ?, ?)';
        return new Promise((resolve, reject) => {
            db.run(query, [series.titulo, series.episodios, series.temporadas, series.status], function (err) {
                if (err) {
                    reject({
                        mensagem: 'Erro ao inserir a série',
                        erro: err
                    })
                }

                resolve({
                    mensagem: 'Série criada com sucesso',
                    contentId: this.lastID
                 })
            });
        });
    }

    static deletar(id) {
      const query = 'DELETE FROM SERIES WHERE id = ?';
      return new Promise((resolve, reject) => {
          db.run(query, [id], (err) => {
              if (err) {
                  reject({
                      mensagem: 'Erro ao deletar a série',
                      erro: err
                  })
              }

              resolve({ mensagem: 'Série deletada com sucesso' })
          });
      });
    }

    static atualizar(id, series) {
      const query = 'UPDATE SERIES SET titulo = ?, episodios = ?, temporadas = ?, status = ? WHERE id = ?';
      return new Promise((resolve, reject) => {
          db.run(query, [series.titulo, series.episodios, series.temporadas, series.status, id], (err) => {
              if (err) {
                  reject({
                      mensagem: 'Erro ao atualizar a série',
                      erro: err
                  })
              }

              resolve({ mensagem: 'Série atualizada com sucesso' })
          });
      });
    }
}

module.exports = SeriesDAO;
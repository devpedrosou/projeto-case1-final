const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

const CONTENTS_SCHEMA = `
CREATE TABLE IF NOT EXISTS "conteudos" (
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "titulo" varchar(64),
    "episodios" INTERGER,
    "temporadas" INTERGER,
    "status" VARCHAR(64)
  );`;

function createTableSeries() {
    db.run(CONTENTS_SCHEMA, (error)=> {
       if (error) console.log("Erro ao criar tabela de Séries");
    });
}

db.serialize( ()=> {
    createTableSeries();

});
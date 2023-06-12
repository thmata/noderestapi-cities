import { Knex } from "knex";
import path from "path";

export const development: Knex.Config = {
  client: "sqlite3",
  useNullAsDefault: true,
  connection: {
    filename: path.resolve(
      __dirname, // DIRNAME DIZ QUE ELE ESTÁ NO LOCAL DESSE ARQUIVO, OS OUTROS PONTOS SÃO SAINDO.
      "..",
      "..",
      "..",
      "..",
      "database.sqlite" //
    ), // INDICANDO O CAMINHO QUE SERÁ GERADO O ARQUIVO, ESSE ARQUIVO FOI ADD NO GITIGNORE
  },
  migrations: {
    directory: path.resolve(__dirname, "..", "migrations"),
  },
  seeds: {
    directory: path.resolve(__dirname, "..", "seeds"),
  },
  pool: {
    // CONFIGURAÇÃO PARA RESOLVER UM PROBLEMA QUE O SQLITE TEM QUANDO NÃO TEM UMA LIGAÇÃO DA FOREINGKEY COM AS TABELAS.
    afterCreate: (connection: any, done: Function) => {
      connection.run("PRAGMA foreign_keys = OK");
      done();
    },
  },
};

export const test: Knex.Config = {
  ...development,
  connection: ":memory:", // MANTENDO A CONECÇÃO APENAS EM MEMÓRIA EVITANDO SALVAR, RECOMENDADO PARA TESTES.
};

export const production: Knex.Config = {
  ...development,
};

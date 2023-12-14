import { Knex } from "knex";
import { ETableNames } from "../../ETableNames";

export async function up(knex: Knex) {
  // PRIMEIRO PARAMETRO (CIDADE) É O NOME DA TABLE E (TABLE) É AS CAMPOS DENTRO DESSA TABELA
  return knex.schema
    .createTable(ETableNames.usuario, (table) => {
      // CRIAÇÃO DA PRIMEIRA COLUNA
      table
        .bigIncrements("id") // COLUNA QUE VAI SER DO TIPO INTEGER E VAI SER AUTO INCREMENTADA DE ACORDO COM OS REGISTROS.
        .index() // INDEXAR PARA MELHORAR OTIMIZAÇÃO.
        .primary(); // PRIMARY KEY

      table.string("email").notNullable().unique().index().checkLength(">", 5);
      table.string("password").notNullable().checkLength(">", 5);
      table.string("username").notNullable().unique().checkLength(">", 3);
      table.string("name").notNullable().checkLength(">", 3);
      table.string("lastname").notNullable().checkLength(">", 3);
      table.comment("Tabela usada para armazenar usuarios do sistema"); // COMENTÁRIO SOBRE A TABELA.
    })
    .then(() => {
      console.log(`# Create Table ${ETableNames.usuario}`);
    });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(ETableNames.usuario).then(() => {
    console.log(`# dropTable Table ${ETableNames.usuario}`);
  }); // SE USARMOS O DOWN DO KNEX ELE VAI EXCLUIR A TABELA DE CIDADES.
}

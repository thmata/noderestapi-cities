import { Knex } from "knex";
import { ETableNames } from "../../ETableNames";

export async function up(knex: Knex) {
  // PRIMEIRO PARAMETRO (CIDADE) É O NOME DA TABLE E (TABLE) É AS CAMPOS DENTRO DESSA TABELA
  return knex.schema
    .createTable(ETableNames.pessoa, (table) => {
      // CRIAÇÃO DA PRIMEIRA COLUNA
      table
        .bigIncrements("id") // COLUNA QUE VAI SER DO TIPO INTEGER E VAI SER AUTO INCREMENTADA DE ACORDO COM OS REGISTROS.
        .primary() // PRIMARY KEY
        .index(); // INDEXAR PARA MELHORAR OTIMIZAÇÃO.

      table.string("name", 150).index().notNullable();
      table.string("sobrenome", 150).index().notNullable();
      table.string("email", 150).index().notNullable().unique();
      table
        .bigInteger("cidadeId")
        .index()
        .notNullable()
        .references("id") // FOREING KEY
        .inTable(ETableNames.cidade) // FOREING KEY
        .onUpdate("CASCADE") // Se atualizar a outra tabela ele também atualiza
        .onDelete("RESTRICT"); // Restringir a função de deletar lá de cidade.
      table.comment("Tabela usada para armazenar pessoas do sistema"); // COMENTÁRIO SOBRE A TABELA.
    })
    .then(() => {
      console.log(`# Create Table ${ETableNames.pessoa}`);
    });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(ETableNames.pessoa).then(() => {
    console.log(`# dropTable Table ${ETableNames.pessoa}`);
  }); // SE USARMOS O DOWN DO KNEX ELE VAI EXCLUIR A TABELA DE CIDADES.
}

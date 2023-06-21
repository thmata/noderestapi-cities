import { Knex } from "knex";
import { ETableNames } from "../../ETableNames";


export async function up(knex: Knex) {
    // PRIMEIRO PARAMETRO (CIDADE) É O NOME DA TABLE E (TABLE) É OS CAMPOS DENTRO DESSA TABELA
    return knex.schema.createTable(ETableNames.cidade, table => {
        // CRIAÇÃO DA PRIMEIRA COLUNA
        table
            .bigIncrements('id') // COLUNA QUE VAI SER DO TIPO INTEGER E VAI SER AUTO INCREMENTADA DE ACORDO COM OS REGISTROS.
            .primary() // PRIMARY KEY
            .index()  // INDEXAR PARA MELHORAR OTIMIZAÇÃO.

        table.string('name', 150).index().notNullable()
        table.comment('Tabela usada para armazenar cidades do sistema')
    }).then(() => {
        console.log(`# Create Table ${ETableNames.cidade}`)
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable(ETableNames.cidade).then(() => {
        console.log(`# dropTable Table ${ETableNames.cidade}`)
    }); // SE USARMOS O DOWN DO KNEX ELE VAI EXCLUIR A TABELA DE CIDADES. 
}


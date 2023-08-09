import { ETableNames } from "../../ETableNames";
import { Knex } from "../../database/knex";

export const create = async (pessoa: any) => {
  try {
    // ANTES DE CRIAR UMA PESSOA VINCULADO A ALGUMA CIDADE ELE PRIMEIRO VALIDA SE ESSE CIDADE EXISTE.
    const [{ count }] = await Knex(ETableNames.cidade)
      .where("id", "=", pessoa.cidadeId)
      .count<[{ count: number }]>("* as count");

    if (count === 0)
      return new Error("A Cidade usada no cadastro não foi encontrada.");

    const [result] = await Knex(ETableNames.pessoa)
      .insert(pessoa)
      .returning("id");

    if (typeof result === "object") {
      return result.id;
    } else if (typeof result === "number") {
      return result;
    }

    return new Error("Erro ao cadastrar registro de pessoas no banco");
  } catch (error) {
    console.log("ERRO CREATE PERSON", error);
    return new Error("Erro ao cadastrar o registro de pessoas.");
  }
};

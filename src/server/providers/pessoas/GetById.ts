import { ETableNames } from "../../ETableNames";
import { Knex } from "../../database/knex";

export const getById = async (id: number) => {
  try {
    const result = await Knex(ETableNames.pessoa)
      .select("*")
      .where("id", "=", id)
      .first();

    if (result) return result;

    return new Error("Registro Não Encontrado de Pessoas.");
  } catch (erro) {
    console.log(erro);
    return new Error("Erro ao buscar pessoas pelo ID");
  }
};

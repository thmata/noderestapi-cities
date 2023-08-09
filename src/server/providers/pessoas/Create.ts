import { ETableNames } from "../../ETableNames";
import { Knex } from "../../database/knex";

export const create = async (pessoa: any) => {
  try {
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

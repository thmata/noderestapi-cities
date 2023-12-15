import { Knex } from "../../database/knex";
import { ETableNames } from "../../ETableNames";

export const create = async (usuario: any): Promise<number | Error> => {
  try {
    const [result] = await Knex(ETableNames.usuario)
      .insert(usuario)
      .returning("id");

    if (typeof result === "object") {
      return result.id;
    } else if (typeof result === "number") {
      return result;
    }

    return new Error("Erro ao cadastrar o registro");
  } catch (error) {
    return new Error("Erro ao cadastrar o registro");
  }

  return 1;
};

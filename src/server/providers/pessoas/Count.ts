import { ETableNames } from "../../ETableNames";
import { Knex } from "../../database/knex";

export const Count = async (name = "", sobrenome = "") => {
  try {
    const [{ count }] = await Knex(ETableNames.pessoa)
      .where("name", name)
      .andWhere("sobrenome", sobrenome)
      .count<[{ count: number }]>("* as count");

    if (Number.isInteger(Number(count))) return Number(count);

    return new Error("Erro ao consultar a quantidade total de registros.");
  } catch (error) {
    console.log(error);
    return new Error("Erro ao fazer a contagem de registros.");
  }
};

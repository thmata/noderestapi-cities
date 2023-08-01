import { ETableNames } from "../../ETableNames";
import { Knex } from "../../database/knex";

export const count = async (filter = "") => {
  // Usado para contar a quantidade de itens totais.
  try {
    const [{ count }] = await Knex(ETableNames.cidade)
      .where("name", "like", `%${filter}`)
      .count<[{ count: number }]>("* as count");

    if (Number.isInteger(Number(count))) return Number(count);

    return new Error("Erro ao consultar a quantidade total de registros");
  } catch (error) {
    console.log(error);
    return new Error("Erro ao consultar a quantidade total de registros");
  }
};

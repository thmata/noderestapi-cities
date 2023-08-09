import { ETableNames } from "../../ETableNames";
import { Knex } from "../../database/knex";

export const getAll = async (
  page: number,
  limit: number,
  name: string,
  lastname: string
) => {
  try {
    const result = await Knex(ETableNames.pessoa)
      .select("*")
      .where("name", "like", `%${name}%`)
      .andWhere("sobrenome", "like", `${lastname}`)
      .offset((page - 1) * limit)
      .limit(limit);

    return result;
  } catch (error) {
    console.log(error);
    return new Error("Erro ao Buscar Todos Na Tabela de Pessoa.");
  }
};

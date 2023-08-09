import { ETableNames } from "../../ETableNames";
import { Knex } from "../../database/knex";

export const UpdateById = async (id: number, pessoa: any) => {
  try {
    const [{ count }] = await Knex(ETableNames.cidade)
      .where("id", "=", id)
      .count<[{ count: number }]>("* as count");

    if (count === 0)
      return new Error("Registro não encontrado para atualizar.");

    const result = await Knex(ETableNames.pessoa)
      .update(pessoa)
      .where("id", "=", id);
    if (result > 0) return true;

    return new Error("Erro ao atualizar registro de pessoas");
  } catch (error) {
    console.log(error);
    return new Error("Erro no UPDATE pessoa");
  }
};

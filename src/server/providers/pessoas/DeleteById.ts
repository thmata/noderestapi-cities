import { ETableNames } from "../../ETableNames";
import { Knex } from "../../database/knex";

export const DeleteById = async (id: number) => {
  try {
    const result = await Knex(ETableNames.pessoa).where("id", "=", id).del();

    if (result > 0) return result;

    return new Error("Erro ao apagar o registro");
  } catch (error) {
    console.log(error);
    return new Error("Erro ao deletar pessoa pelo ID");
  }
};

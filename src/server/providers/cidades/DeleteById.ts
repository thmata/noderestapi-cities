import { ETableNames } from "../../ETableNames";
import { Knex } from "../../database/knex";

export const DeleteById = async (id: number) => {
  try {
    console.log(id, "ID do DELETE");
    const result = await Knex(ETableNames.cidade).where("id", "=", id).del();
    if (result > 0) return true;

    return new Error("Erro ao deletar Registro");
  } catch (error) {
    console.log(error, "Erro no deleteByID");
    return new Error("Erro ao deletar o registro");
  }
};

import { ETableNames } from "../../ETableNames";
import { Knex } from "../../database/knex";

export const GetByEmail = async (email: number) => {
  try {
    const result = await Knex(ETableNames.usuario)
      .select("*")
      .where("email", "=", email)
      .first();

    if (result) return result;

    return new Error("Registro não encontrado");
  } catch (error) {
    console.log(error, "Erro no GetById Provider");
    return new Error("Erro ao buscar usuario pelo ID");
  }
};

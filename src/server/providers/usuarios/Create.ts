import { Knex } from "../../database/knex";
import { ETableNames } from "../../ETableNames";
import { PasswordCrypto } from "../../shared/services";

export const create = async (usuario: any): Promise<number | Error> => {
  try {
    const hashedPassword = await PasswordCrypto.hashPassword(usuario.password);

    const [result] = await Knex(ETableNames.usuario)
      .insert({ ...usuario, password: hashedPassword })
      .returning("id");

    console.log("result", result);

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

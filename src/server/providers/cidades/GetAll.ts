import { ETableNames } from "../../ETableNames";
import { Knex } from "../../database/knex";

export const GetAll = async (
  page: number,
  limit: number,
  filter: string,
  id = 0
) => {
  try {
    console.log(filter, "FILTRO");

    const result = await Knex(ETableNames.cidade)
      .select("*")
      .where("id", Number(id))
      .orWhere("name", "like", `%${filter}%`) // Ou o nome seja igual ao nome aplicado no filtro. o % é para ignorar algumas condições.
      .offset((page - 1) * limit) // A  qui diz qual é o que o ponto de partida que será iniciado.
      .limit(limit); // Quantidade limite de retorno

    // Validação para caso ele não consiga encontrar nada no result.
    if (id > 0 && result.every((item) => item.id !== id)) {
      const resultById = await Knex(ETableNames.cidade)
        .select("*")
        .where("id", "=", id)
        .first();

      if (resultById) return [...result, resultById];
    }

    return result;
  } catch (error) {
    console.log(error);
    return new Error("Erro ao consultar os registros");
  }
};

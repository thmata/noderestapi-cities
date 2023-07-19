import { ETableNames } from "../../ETableNames"
import { Knex } from "../../database/knex"

export const GetById = async (id: number) => {

    try{

        const result = await Knex(ETableNames.cidade)
            .select('*')
            .where("id", "=", id)
            .first()

        if(result) return result

        return new Error("Registro não encontrado")

    }catch(error){
        console.log(error, "Erro no GetById Provider")
        return new Error("Erro ao buscar cidade pelo ID")
    }
   

}
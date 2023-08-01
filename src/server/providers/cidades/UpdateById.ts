import { ETableNames } from "../../ETableNames"
import { Knex } from "../../database/knex"

export const UpdateById = async (id: number, cidade: any) => {
    try{
        const result = await Knex(ETableNames.cidade).update(cidade).where('id', '=', id)
        if(result > 0) return true

        return new Error("Erro ao atualizar o registro.")

    }catch(error){
        console.log(error, "ERo")
        return new Error("Erro no UPDATE")
    }


}   
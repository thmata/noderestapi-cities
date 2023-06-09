import { Knex } from '../../database/knex'
import { ETableNames } from "../../ETableNames"

export const create = async (cidade: any): Promise<number | Error> => {

    try{
        console.log(cidade)

        const [result] = await Knex(ETableNames.cidade).insert(cidade).returning('id');

        if(typeof result === 'object') {
            return result.id
        } else if (typeof result === 'number'){
            return result
        }
        
        return new Error('Erro ao cadastrar o registro')

    }catch(error) {
        console.log("TRestansd",error)
        return new Error('Erro ao cadastrar o registro')
    }

    return 1
}
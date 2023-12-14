import { IUsuario, ICidade, IPessoa } from "../../models";

declare module "knex/types/tables" {
  interface Tables {
    cidade: ICidadedade;
    pessoa: IPessoa;
    usuario: IUsuario;
  }
}

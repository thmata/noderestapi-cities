import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { validation } from "../../shared/middlewares";
import { DeleteById } from "../../providers/cidades/DeleteById";

export const deleteByIdValidation = validation({
  params: yup.object().shape({
    id: yup.number().integer().required().moreThan(0),
  }),
});

export const deleteById = async (req: Request, res: Response) => {

  const result = await DeleteById(Number(req.params.id))

  if(result) {
    return res
    .status(StatusCodes.NO_CONTENT)
    .json(`ID:${req.params} FOI DELETADO`);

  } else {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: {
          params: "Registro Não Encontrado.",
        },
      },
    });

  }
};

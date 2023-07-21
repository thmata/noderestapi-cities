import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { validation } from "../../shared/middlewares";
import { UpdateById } from "../../providers/cidades/UpdateById";

export const updateByIdValidation = validation({
  body: yup.object().shape({
    name: yup.string().required().min(3),
  }),
  params: yup.object().shape({
    id: yup.number().integer().required().moreThan(0),
  }),
});

export const updateById = async (req: Request, res: Response) => {

  const result = await UpdateById(Number(req.params.id), req.body)

  if(!(result instanceof Error)){
    return res.status(StatusCodes.OK).send("Dado atualizado");
  } else {
    return res.status(StatusCodes.NO_CONTENT).json({
      errors: {
        default: {
          params: "Registro Não Encontrado.",
        },
      },
    });
  }
};

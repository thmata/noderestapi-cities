import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { validation } from "../../shared/middlewares";
import { GetById } from "../../providers/cidades/GetById";

export const getByIdValidation = validation({
  params: yup.object().shape({
    id: yup.number().integer().required().moreThan(0),
  }),
});

export const getById = async (req: Request, res: Response) => {

  const result = await GetById(Number(req.params.id))

  console.log(result)

  if(!(result instanceof Error)){
    return res.status(StatusCodes.OK).json({
      id: result.id,
      name: result.name,
    });
  } else{
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: {
          params: "Registro Não Encontrado.",
        },
      },
    });
  }
  
};

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
  console.log("IdUsuario", req.headers.idUsuario);

  if (!req.params.id) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: {
          params: "O parâmetro 'Id' precisa ser informado",
        },
      },
    });
  }

  const result = await GetById(Number(req.params.id));

  if (!(result instanceof Error)) {
    return res.status(StatusCodes.OK).json({
      id: result.id,
      name: result.name,
    });
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

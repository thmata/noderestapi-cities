import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { validation } from "../../shared/middlewares";
import { GetAll } from "../../providers/cidades/GetAll";
import { count } from "../../providers/cidades/Count";

export const getAllValidation = validation({
  query: yup.object().shape({
    page: yup.number().notRequired().moreThan(0),
    limit: yup.number().notRequired().moreThan(0),
    filter: yup.string().notRequired(),
  }),
});

export const getAll = async (req: Request, res: Response) => {
  console.log(req.query);
  const { page, limit, filter, id } = req.query;

  console.log("Valor de Filtro", filter);

  const result = await GetAll(
    page ? Number(page) : 1,
    limit ? Number(limit) : 7,
    filter ? String(filter) : ""
  );

  const Count = await count(String(filter));

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: { default: result.message },
    });
  } else if (Count instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: { default: Count.message },
    });
  }

  // Essa linha libera o navegador expor o 'x-total-count';
  res.setHeader("access-control-expose-headers", "x-total-count");
  // Essa linha ele seta o valor do x-total-count.
  res.setHeader("x-total-count", Count);

  res.status(StatusCodes.OK).json(result);
};

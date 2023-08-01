import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { validation } from "../../shared/middlewares";
import { GetAll } from "../../providers/cidades/GetAll";

export const getAllValidation = validation({
  query: yup.object().shape({
    page: yup.number().notRequired().moreThan(0),
    limit: yup.number().notRequired().moreThan(0),
    filter: yup.string().notRequired(),
  }),
});

export const getAll = async (req: Request, res: Response) => {
  // Essa linha libera o navegador expor o 'x-total-count';
  res.setHeader("access-control-expose-headers", "x-total-count");
  // Essa linha ele seta o valor do x-total-count.
  res.setHeader("x-total-count", 1);
  console.log(req.query);
  const { page, limit, filter } = req.query

  console.log(page, "PAGINA")

  console.log(limit, "LIMIT")

  console.log(filter, "FILTER")

  const result = GetAll(Number(page), Number(limit), String(filter))

  return res.status(StatusCodes.OK).json([
    {
      id: 1,
      name: "Pernambuco",
    },
  ]);
};

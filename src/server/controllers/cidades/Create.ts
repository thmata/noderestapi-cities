import { Request, Response } from "express";
import * as yup from "yup";

const bodyValidation = yup.object().shape({
  name: yup.string().required().min(3),
});

export const create = async (req: Request, res: Response) => {
  let validatedData = undefined;

  try {
    validatedData = await bodyValidation.validate(req.body);
  } catch (error) {
    const yupError = error as yup.ValidationError;

    return res.json({
      errors: {
        default: yupError.message,
      },
    });
  }

  console.log(validatedData, "Testando");

  return res.send("Chegou");
};

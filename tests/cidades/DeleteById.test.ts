import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Cidades - Deletar Cidade Pelo ID", () => {
  it("Apagar Registro", async () => {
    const res1 = await testServer.post("/cidades").send({
      name: "Pernambuco",
    });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resApagada = await testServer.delete(`/cidades/${res1.body}`);

    expect(resApagada.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });

  it("Apagar Registro Que não Existe", async () => {
    const res1 = await testServer.delete("/cidades/9999").send();

    expect(res1.statusCode).toEqual(StatusCodes.OK);
    expect(res1.body).toHaveProperty("errors.default.params");
  });
});

import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Cidades - UpdateById - Atualizar pelo ID ", () => {
  it("Atualizar Registro Por ID", async () => {
    const res2 = await testServer.post("/cidades").send({
      name: "Pernambuco",
    });

    expect(res2.statusCode).toEqual(StatusCodes.CREATED);

    const res1 = await testServer.put(`/cidades/${res2.body}`).send({
      name: "Rio de Janeiro",
    });

    expect(res1.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });

  it("Tentar Atualizar Registro que não existe", async () => {
    const res1 = await testServer.put("/cidades/9999").send({
      name: "Rio de Janeiro",
    });

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty("errors.default.params");
  });
});

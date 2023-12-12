import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Cidades - GetById - Retornar o a Cidade Pelo ID ", () => {
  it("Buscar Registro por ID", async () => {
    const res2 = await testServer.post("/cidades").send({
      name: "Pernambuco",
    });

    expect(res2.statusCode).toEqual(StatusCodes.CREATED);

    const res1 = await testServer.get(`/cidades/${res2.body}`).send();

    expect(res1.statusCode).toEqual(StatusCodes.OK);
    expect(res1.body).toHaveProperty("name");
  });

  it("Tentar Buscar Registro que não existe", async () => {
    const res1 = await testServer.get("/cidades/9999").send();

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty("errors.default.params");
  });
});

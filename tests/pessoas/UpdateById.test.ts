import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Cidades - UpdateById - Atualizar pelo ID ", () => {
  let cidadeId: number | undefined = undefined;

  beforeAll(async () => {
    const res1 = await testServer.post("/cidades").send({
      nome: "Teste",
    });

    cidadeId = res1.body;
  });

  it("Atualizar Registro Por ID", async () => {
    const resPostPessoas = await testServer.post("/pessoas").send({
      name: "Thiago",
      sobrenome: "Mata",
      email: "taiagomata@gmail.com",
      cidadeId,
    });

    expect(resPostPessoas.statusCode).toEqual(StatusCodes.CREATED);

    const resPutUpdate = await testServer
      .put(`/cidades/${resPostPessoas.body}`)
      .send({
        name: "Thiago",
        sobrenome: "Oliveira",
        email: "taiagomata@gmail.com",
        cidadeId,
      });

    expect(resPutUpdate.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });

  it("Tentar Atualizar Registro que não existe", async () => {
    const res1 = await testServer.put("/pessoas/9999").send({
      name: "Thiago",
      sobrenome: "Ferreira",
      email: "taiagomata@gmail.com",
      cidadeId,
    });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty("errors.default.params");
  });
});

import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Pessoas - Deletar Pessoa Pelo ID", () => {
  let cidadeId: number | undefined = undefined;

  beforeAll(async () => {
    const resCidade = await testServer.post("/cidade").send({
      nome: "Teste",
    });

    cidadeId = resCidade.body;
  });

  it("Apagar Registro", async () => {
    const res1 = await testServer.post("/pessoas").send({
      name: "Thiago",
      sobrenome: "Mata",
      email: "taiagomata@gmail.com",
      cidadeId,
    });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resApagada = await testServer.delete(`/pessoas/${res1.body}`);

    expect(resApagada.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });

  it("Apagar Registro Que não Existe", async () => {
    const res1 = await testServer.delete("/pessoas/9999").send();

    expect(res1.statusCode).toEqual(StatusCodes.NO_CONTENT);
    expect(res1.body).toHaveProperty("errors");
  });
});

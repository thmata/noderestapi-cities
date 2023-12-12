import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

// DESCRIÇÃO DO TESTE
describe("Pessoas - Create", () => {
  // IT É O NOME DO TESTE
  it("Cria registro", async () => {
    const res1 = await testServer.post("/pessoas").send({
      name: "Thiago",
      sobrenome: "Mata",
      email: "taiagomata@gmail.com",
      cidadeId: 1,
    });

    expect(res1.body).toEqual(1);
    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
  });

  it("Criando registro com nome curto", async () => {
    // FAZENDO UM POST E ENVIANDO A RESPOSTA DESSA REQUISIÇÃO PARA O RES1 PARA FAZER A COMPARAÇÃO EMBAIXO
    const res1 = await testServer.post("/cidades").send({
      name: "Th",
      sobrenome: "Ma",
      cidadeId: "1",
    });

    // EXPECT É O QUE É ESPERADO E DEPOIS É O QUE QUEREMOS QUE RETORNE.
    // expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty("errors.default.body.name");
  });

  it("Criando sem nenhum nome", async () => {
    // FAZENDO UM POST E ENVIANDO A RESPOSTA DESSA REQUISIÇÃO PARA O RES1 PARA FAZER A COMPARAÇÃO EMBAIXO
    const res1 = await testServer.post("/cidades").send({});

    // EXPECT É O QUE É ESPERADO E DEPOIS É O QUE QUEREMOS QUE RETORNE.
    // expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty("errors.default.body.name");
  });
});

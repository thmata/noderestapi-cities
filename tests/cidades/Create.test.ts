import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

// DESCRIÇÃO DO TESTE
describe("Cidades - Create", () => {
  it("Cria registro", async () => {
    const res1 = await testServer.post("/cidades").send({
      name: "Pernambuco",
    });

    expect(res1.body).toEqual("Não Implementado");
  });

  // IT É O NOME DO TESTE
  it("Criando registro com nome curto", async () => {
    // FAZENDO UM POST E ENVIANDO A RESPOSTA DESSA REQUISIÇÃO PARA O RES1 PARA FAZER A COMPARAÇÃO EMBAIXO
    const res1 = await testServer.post("/cidades").send({
      name: "Pe",
    });

    // EXPECT É O QUE É ESPERADO E DEPOIS É O QUE QUEREMOS QUE RETORNE.
    // expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty("errors.body.name");
  });
});

import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

// DESCRIÇÃO DO TESTE
describe("SignIn - Entrar na conta", () => {
  let cidadeId: number | undefined = undefined;
  beforeAll(async () => {
    const res1 = await testServer.post("/cadastro").send({
      nome: "Teste de Cidade",
    });

    cidadeId = res1.body;
  });

  // IT É O NOME DO TESTE
  it("Cria registro", async () => {
    const res1 = await testServer.post("/pessoas").send({
      name: "Thiago",
      sobrenome: "Mata",
      email: "taiagomata@gmail.com",
      cidadeId,
    });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res1.body).toEqual("number");
  });

  it("Cria registro 2", async () => {
    const res1 = await testServer.post("/pessoas").send({
      name: "Thiago",
      sobrenome: "Mata",
      email: "taiagomata2@gmail.com",
      cidadeId,
    });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res1.body).toEqual("number");
  });

  it("Criar registro com email duplicado", async () => {
    const res1 = await testServer.post("/pessoas").send({
      name: "Thiago",
      sobrenome: "Mata",
      email: "taiagomataduplicado@gmail.com",
      cidadeId,
    });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const res2 = await testServer.post("/pessoas").send({
      name: "Duplicado",
      sobrenome: "Duplicado",
      email: "taiagomataduplicado@gmail.com",
      cidadeId,
    });

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty("errors");
  });

  it("Criar registro nomes pequenos", async () => {
    const res1 = await testServer.post("/pessoas").send({
      name: "T",
      sobrenome: "M",
      email: "taiagomataduplicado@gmail.com",
      cidadeId,
    });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty("errors");
  });

  it("Criar registro sem nome e sem sobrenome", async () => {
    const res1 = await testServer.post("/pessoas").send({
      email: "taiagomataduplicado@gmail.com",
      cidadeId,
    });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty("errors");
  });

  it("Criar registro sem email", async () => {
    const res1 = await testServer.post("/pessoas").send({
      name: "Thiago",
      sobrenome: "Mata",
      cidadeId,
    });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty("errors");
  });

  it("Criar registro com email invalido", async () => {
    const res1 = await testServer.post("/pessoas").send({
      name: "Thiago",
      sobrenome: "Mata",
      email: "taiagomata2 gmail.com",
      cidadeId,
    });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
  });

  it("Cria registro sem cidadeID", async () => {
    const res1 = await testServer.post("/pessoas").send({
      name: "Thiago",
      sobrenome: "Mata",
      email: "taiagomata9@gmail.com",
    });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty("errors");
  });

  it("Cria registro com cidadeID string", async () => {
    const res1 = await testServer.post("/pessoas").send({
      name: "Thiago",
      sobrenome: "Mata",
      email: "taiagomata9@gmail.com",
      cidadeId: "2",
    });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty("errors");
  });
});

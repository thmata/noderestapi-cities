import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

// DESCRIÇÃO DO TESTE
describe("SignIn - Entrar na conta", () => {
  // IT É O NOME DO TESTE
  it("Cria usuário 1", async () => {
    const res1 = await testServer.post("/cadastrar").send({
      email: "taiagomata@gmail.com",
      password: "password",
      username: "taiagomata",
      name: "Thiago",
      lastname: "Oliveira",
    });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res1.body).toEqual("number");
  });

  it("Cria usuário 2", async () => {
    const res1 = await testServer.post("/cadastrar").send({
      email: "taiagomata2@gmail.com",
      password: "password",
      username: "taiagomata2",
      name: "Rafael",
      lastname: "Ferreira",
    });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res1.body).toEqual("number");
  });

  it("Criar usuário com email duplicado", async () => {
    const res1 = await testServer.post("/cadastrar").send({
      email: "taiagomata2@gmail.com",
      password: "password",
      username: "taiagomata2",
      name: "Rafael",
      lastname: "Ferreira",
    });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const res2 = await testServer.post("/cadastrar").send({
      email: "taiagomata2@gmail.com",
      password: "password",
      username: "taiagomata2",
      name: "Rafael",
      lastname: "Ferreira",
    });

    expect(res2.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
  });
});

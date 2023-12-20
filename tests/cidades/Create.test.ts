import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

// DESCRIÇÃO DO TESTE
describe("Cidades - Create", () => {
  let accessToken = "";

  beforeAll(async () => {
    const email = "create-cidades@gmail.com";
    await testServer.post("/cadastrar").send({
      email,
      password: "123456",
      username: "TesteTest",
      name: "Teste",
      lastname: "Oliveira",
    });
    const signInRes = await testServer
      .post("/entrar")
      .send({ email, password: "123456" });

    accessToken = signInRes.body.accessToken;
  });

  // IT É O NOME DO TESTE

  it("Cria registro sem o token de acesso", async () => {
    const res1 = await testServer.post("/cidades").send({
      name: "Pernambuco",
    });

    expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(res1.body).toHaveProperty("errors");
  });

  it("Criar registro com Token", async () => {
    const res1 = await testServer
      .post("/cidades")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        name: "Pernambuco",
      });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
  });

  it("Criando registro com nome curto", async () => {
    // FAZENDO UM POST E ENVIANDO A RESPOSTA DESSA REQUISIÇÃO PARA O RES1 PARA FAZER A COMPARAÇÃO EMBAIXO
    const res1 = await testServer
      .post("/cidades")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        name: "Pe",
      });

    // EXPECT É O QUE É ESPERADO E DEPOIS É O QUE QUEREMOS QUE RETORNE.
    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty("errors");
  });

  it("Criando sem nenhum nome", async () => {
    // FAZENDO UM POST E ENVIANDO A RESPOSTA DESSA REQUISIÇÃO PARA O RES1 PARA FAZER A COMPARAÇÃO EMBAIXO
    const res1 = await testServer
      .post("/cidades")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({});

    // EXPECT É O QUE É ESPERADO E DEPOIS É O QUE QUEREMOS QUE RETORNE.
    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty("errors");
  });
});

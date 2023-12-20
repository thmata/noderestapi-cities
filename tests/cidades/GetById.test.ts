import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Cidades - GetById - Retornar o a Cidade Pelo ID ", () => {
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

  it("Buscar Registro por ID Sem Token", async () => {
    const res2 = await testServer.post("/cidades").send({
      name: "Pernambuco",
    });

    expect(res2.statusCode).toEqual(StatusCodes.UNAUTHORIZED);

    const res1 = await testServer.get(`/cidades/${res2.body}`).send();

    expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
  });

  it("Buscar Registro por ID", async () => {
    const res2 = await testServer
      .post("/cidades")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        name: "Pernambuco",
      });

    expect(res2.statusCode).toEqual(StatusCodes.CREATED);

    const res1 = await testServer
      .get(`/cidades/${res2.body}`)
      .set({ Authorization: `Bearer ${accessToken}` })
      .send();

    expect(res1.statusCode).toEqual(StatusCodes.OK);
    expect(res1.body).toHaveProperty("name");
  });

  it("Tentar Buscar Registro que não existe", async () => {
    const res1 = await testServer
      .get("/cidades/9999")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send();

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty("errors.default.params");
  });
});

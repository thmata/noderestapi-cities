import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Cidades - UpdateById - Atualizar pelo ID ", () => {
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

  it("Atualizar Registro Por ID Sem Token", async () => {
    const res2 = await testServer.post("/cidades").send({
      name: "Pernambuco",
    });

    expect(res2.statusCode).toEqual(StatusCodes.UNAUTHORIZED);

    const res1 = await testServer.put(`/cidades/${res2.body}`).send({
      name: "Rio de Janeiro",
    });

    expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
  });

  it("Atualizar Registro Por ID", async () => {
    const res2 = await testServer
      .post("/cidades")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        name: "Pernambuco",
      });

    expect(res2.statusCode).toEqual(StatusCodes.OK);

    const res1 = await testServer
      .put(`/cidades/${res2.body}`)
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        name: "Rio de Janeiro",
      });

    expect(res1.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });

  it("Tentar Atualizar Registro que não existe", async () => {
    const res1 = await testServer
      .put("/cidades/9999999")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        name: "Rio de Janeiro123",
      });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty("errors.default.params");
  });
});

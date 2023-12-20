import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Cidades - Deletar Cidade Pelo ID", () => {
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

  it("Apagar Registro Sem Token", async () => {
    const res1 = await testServer.post("/cidades").send({
      name: "Pernambuco",
    });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resApagada = await testServer
      .delete(`/cidades/${res1.body}`)
      .set({ Authorization: `Bearer ${accessToken}` });

    expect(resApagada.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
  });

  it("Apagar Registro", async () => {
    const res1 = await testServer
      .post("/cidades")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        name: "Pernambuco",
      });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resApagada = await testServer
      .delete(`/cidades/${res1.body}`)
      .set({ Authorization: `Bearer ${accessToken}` });

    expect(resApagada.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });

  it("Apagar Registro Que não Existe", async () => {
    const res1 = await testServer
      .delete("/cidades/9999")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send();

    expect(res1.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });
});

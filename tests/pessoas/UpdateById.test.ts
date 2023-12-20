import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Cidades - UpdateById - Atualizar pelo ID ", () => {
  let cidadeId: number | undefined = undefined;
  let accessToken = "";

  beforeAll(async () => {
    const res1 = await testServer.post("/cidades").send({
      nome: "Teste",
    });

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

    cidadeId = res1.body;
  });

  it("Atualizar Registro Por ID sem token", async () => {
    const resPostPessoas = await testServer.post("/pessoas").send({
      name: "Thiago",
      sobrenome: "Mata",
      email: "taiagomata@gmail.com",
      cidadeId,
    });

    expect(resPostPessoas.statusCode).toEqual(StatusCodes.UNAUTHORIZED);

    const resPutUpdate = await testServer
      .put(`/cidades/${resPostPessoas.body}`)
      .send({
        name: "Thiago",
        sobrenome: "Oliveira",
        email: "taiagomata@gmail.com",
        cidadeId,
      });

    expect(resPutUpdate.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
  });

  it("Atualizar Registro Por ID COM TOKEN", async () => {
    const resPostPessoas = await testServer.post("/pessoas").send({
      name: "Thiago",
      sobrenome: "Mata",
      email: "taiagomata@gmail.com",
      cidadeId,
    });

    expect(resPostPessoas.statusCode).toEqual(StatusCodes.CREATED);

    const resPutUpdate = await testServer
      .put(`/cidades/${resPostPessoas.body}`)
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        name: "Thiago",
        sobrenome: "Oliveira",
        email: "taiagomata@gmail.com",
        cidadeId,
      });

    expect(resPutUpdate.statusCode).toEqual(StatusCodes.OK);
  });

  it("Tentar Atualizar Registro que não existe", async () => {
    const res1 = await testServer
      .put("/pessoas/99999999")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        name: "Thiago",
        sobrenome: "Ferreira",
        email: "taiagomata@gmail.com",
        cidadeId,
      });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty("errors.default.params");
  });
});

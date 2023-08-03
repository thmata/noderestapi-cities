import { server } from "./server/Server";
import { Knex } from "./server/database/knex";

const startServer = () => {
  server.listen(3000, () => {
    console.log(`App Listening on port`);
  });
};

// VALIDAÇÃO PARA SABER SE ESTÁ EM AMBIENTE DE PRODUÇÃO OU DESENVOLVIMENTO
if (process.env.IS_LOCALHOST !== "true") {
  // PRIMEIRA COISA QUE SERÁ FEITA QUANDO INICIAR O SERVIDOR É RODAR AS ULTIMAS MIGRATIONS PARA DEPOIS STARTAR O SERVER.
  Knex.migrate
    .latest()
    .then(() => {
      Knex.seed
        .run()
        .then(() => {
          startServer();
        })
        .catch(console.log);
    })
    .catch(console.log);
} else {
  startServer();
}

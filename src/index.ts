import { server } from "./server/Server";

server.listen(process.env.NODE_ENV || 3333, () => {
  console.log(`App Listening on port`);
});

import { createServer } from "node:http";
import { once } from "node:events";

const PORT = 3000;

async function handler(request, response) {
  try {
    const data = JSON.parse(await once(request, "data"));
    console.log("\nreceived", data);

    response.writeHead(200);
    response.end(JSON.stringify(data));

    setTimeout(() => {
      throw new Error("will be handled on uncaught");
    }, 1000);

    Promise.reject("will be handled on unhandledRejection");
  } catch (error) {
    console.error("DEU RUIM", error.stack);
    response.writeHead(500);
    response.end();
  }
}

const server = createServer(handler)
  .listen(PORT)
  .on("listening", () => console.log(`server running at ${PORT}`));

// captura de erros não tratados
// Se não tiver essa tratativa, o sistema quebra
process.on("uncaughtException", (error, origin) =>
  console.log(`\n${origin} signal received.\n${error}`)
);

// Se não tiver essa tratativa, o sistema joga um warn
process.on("unhandledRejection", (error) =>
  console.log(`\nunhandledRejection signal received.\n${error}`)
);

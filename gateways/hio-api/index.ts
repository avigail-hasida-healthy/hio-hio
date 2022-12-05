import { setupApiServer } from "@hio-hio/helpers";
import { setupApi } from "./src/service";

const port = 5010;

setupApiServer("hio-api", port, setupApi);

import { setupApiServer } from "@hio-hio/helpers";
import { setupDb } from "./src/lib/db";
import { setupApi } from "./src/service";

const port = 5002;

setupApiServer("hios", port, setupApi, setupDb);

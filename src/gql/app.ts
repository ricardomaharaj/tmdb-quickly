import { createServer } from "node:http"
import { yoga } from "./yoga"

const server = createServer(yoga)
server.listen(4000)

console.log("http://localhost:4000/gql")

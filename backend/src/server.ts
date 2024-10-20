import fastify from "fastify"
import cors from "@fastify/cors"
import { validatorCompiler } from "fastify-type-provider-zod"
import { serializerCompiler } from "fastify-type-provider-zod"
import { authUser } from "./routes/auth-user"
import { validateKey } from "./routes/validade-key"
import { getContacts } from "./routes/get-contacts"
import { getComments } from "./routes/get-comments"
import { errorHandler } from "./error-handler"
import { env } from "./env"


const app = fastify();

app.register(cors, {
  origin: '*',
})

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.setErrorHandler(errorHandler)

app.register(authUser)
app.register(validateKey)
app.register(getContacts)
app.register(getComments)

app.listen({ port: env.PORT }).then(() => {
  console.log('Server running -> http://localhost:3333');
});

/**
 * Watt is the answer GraphQL backend
 * @author Kevin Rogers
 * 
 * @description Allows access to backend services using GraphQL interface
 */

 import { ApolloServer } from "@apollo/server";
 import { expressMiddleware } from "@apollo/server/express4";
 import Schema from "./Schema";
 import Resolvers from "./Resolvers";
 import express from "express";
 import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
 import http from 'http';
 import reactResolver from './reactResolver';
 import cors from 'cors';
 import { json } from 'body-parser';
 import * as dotenv from 'dotenv';
 
 dotenv.config()
 
 const LISTEN_PORT = process.env.LISTEN_PORT || 4000;
 
 interface IContext {
    token?: string
 }
 
 async function startApolloServer(schema: any, resolvers: any) {
     const app = express();
     const httpServer = http.createServer(app);
     const server = new ApolloServer<IContext>({
         typeDefs: schema,
         resolvers,
         plugins: [ApolloServerPluginDrainHttpServer({httpServer})],
     }) as any;
     await server.start();
     app.use('/graphql',
        cors<cors.CorsRequest>(),
        json(),
        expressMiddleware(server, {
            context: async ({ req }) => ({ token: req.headers.token }),
        }),
    );
     app.use("/",reactResolver);
     app.use(cors());

     await new Promise<void>((resolve) => 
         httpServer.listen({port:LISTEN_PORT}, resolve)
     );
     console.log(`Server ready at http://localhost:${LISTEN_PORT}`); //${server.graphqlPath}
 }
 
 startApolloServer(Schema, Resolvers);
 
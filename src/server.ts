/**
 * Watt is the answer GraphQL backend
 * @author Kevin Rogers
 * 
 * @description Allows access to backend services using GraphQL interface
 */

 import { ApolloServer } from "apollo-server-express";
 import Schema from "./Schema";
 import Resolvers from "./Resolvers";
 import express from "express";
 import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
 import http from 'http';
 import reactResolver from './reactResolver';
 import cors from 'cors';
 import * as dotenv from 'dotenv';
 
 dotenv.config()
 
 const LISTEN_PORT = process.env.LISTEN_PORT || 4000;
 
 
 async function startApolloServer(schema: any, resolvers: any) {
     const app = express();
     const httpServer = http.createServer(app);
     const server = new ApolloServer({
         typeDefs: schema,
         resolvers,
         plugins: [ApolloServerPluginDrainHttpServer({httpServer})],
     }) as any;
     app.use("/",reactResolver);
     app.use(cors());
     await server.start();
     server.applyMiddleware({app});

     await new Promise<void>((resolve) => 
         httpServer.listen({port:LISTEN_PORT}, resolve)
     );
     console.log(`Server ready at http://localhost:${LISTEN_PORT}${server.graphqlPath}`);
 }
 
 startApolloServer(Schema, Resolvers);
 
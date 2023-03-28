import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { BandModule } from './bands/bands.module';

@Module({
  imports: [
    BandModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      include:[BandModule],
      autoSchemaFile: 'src/schema.gql',
    }),   
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

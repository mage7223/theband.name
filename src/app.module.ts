import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { BandModule } from './bands/bands.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Band } from './bands/models/band.model';
import { BandSchema } from './bands/schema/band.schema';

@Module({
  imports: [
    BandModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      entities: [Band],
      autoLoadEntities: true,
      synchronize: true,
      logging: true,
    }),
    TypeOrmModule.forFeature([BandSchema]),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      include: [BandModule],
      autoSchemaFile: 'src/schema.gql',
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

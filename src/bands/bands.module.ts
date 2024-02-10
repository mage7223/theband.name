import { Module } from '@nestjs/common';
import { BandResolver } from './resolvers/bands.resolver';
import { BandService } from './service/bands.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Band } from './models/band.model';
import { Author } from './models/author.model';
import { AuthorResolver } from './resolvers/authors.resolver';
import { AuthorService } from './service/author.service';

@Module({
  imports: [TypeOrmModule.forFeature([Band, Author])],
  exports: [TypeOrmModule],
  providers: [BandResolver, BandService, AuthorResolver, AuthorService,],
})
export class BandModule {}

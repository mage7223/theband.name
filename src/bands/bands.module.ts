import { Module } from '@nestjs/common';
import { BandResolver } from './bands.resolver';
import { BandService } from './bands.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Band } from './models/band.model';

@Module({
  imports: [TypeOrmModule.forFeature([Band])],
  exports: [TypeOrmModule],
  providers: [BandResolver, BandService],
})
export class BandModule {}

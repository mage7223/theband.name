import { Module } from '@nestjs/common';
import { BandResolver } from './bands.resolver';
import { BandService } from './bands.service';


@Module({
    providers:[BandResolver, BandService]
})
export class BandModule {}
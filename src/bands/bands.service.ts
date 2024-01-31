import { Injectable } from '@nestjs/common';
import { Band } from './models/band.model';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class BandService {
  constructor(
    @InjectRepository(Band)
    private bandRepository: Repository<Band>,
  ) {}

  findAll(): Promise<Band[]> {
    return this.bandRepository.find();
  }

  findOne(id: FindOneOptions<Band>): Promise<Band | null> {
    return this.bandRepository.findOne(id);
  }

  findAny(filter: FindManyOptions<Band>): Promise<Band[]> {
    return this.bandRepository.find(filter);
  }

  async create(name: string): Promise<Band> {
    const band = new Band();
    band.name = name;
    return this.bandRepository.save(band);
  }

  async remove(id: string): Promise<void> {
    await this.bandRepository.delete(id);
  }
}

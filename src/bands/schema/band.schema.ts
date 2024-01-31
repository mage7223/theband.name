import { EntitySchema } from 'typeorm';
import { Band } from '../models/band.model';

export const BandSchema = new EntitySchema<Band>({
  name: 'Band',
  target: Band,
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    name: {
      type: String,
      nullable: false,
    },
  },
});

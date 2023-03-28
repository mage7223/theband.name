import {Injectable} from '@nestjs/common';
import { Band } from './models/band.model';



@Injectable()
export class BandService {
    private Bands: Band[] = [];

    private createBand(id: number, name:string):Band {
        let band = new Band();
        band.id=id;
        band.name=name;
        return band;
    }

    constructor(){
        this.Bands.push(this.createBand(0, "Naught"));
        this.Bands.push(this.createBand(1, "Frippy"));
    }

    async getAll():Promise<Band[]>{
        return this.Bands;
    }

    async getById(id:number):Promise<Band|undefined> {
        return this.Bands.find( x=> x.id == id);
    }


}

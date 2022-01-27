import { IHours } from './hours.interface';
import { IPoint } from './point.interface';


export interface IWaiter {
    id?: number;
    name: string;
    points?: IPoint[];
    tipsShare?: number;
    hours?: number;
}

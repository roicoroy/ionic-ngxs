import { IHours } from './hours.interface';
import { IPoint } from './point.interface';
import { IWaiter } from './waiters.interface';

export class Waiter implements IWaiter {
    id?: number;
    name: string;
    points?: IPoint[];
    hours?: number;
    tipsShare?: number;

    constructor(waiter: IWaiter) {
        this.id = waiter?.id;
        this.name = waiter.name;
        this.points = waiter.points;
        this.hours = waiter.hours;
        this.tipsShare = waiter.tipsShare;
    }
}

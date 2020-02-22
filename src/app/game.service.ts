import {Injectable} from '@angular/core';
import { Contestant } from './contestant';

@Injectable()
export class GameService {
    private contestants: Contestant[];
    
    constructor() {
        console.log("Hello Angular Lovers!");
    }

    public newGame(contestants: Contestant[]): void {

    }
}
import {Injectable, EventEmitter} from '@angular/core';
import { Contestant } from './contestant';
import { PRIZES } from './prizes';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class GameService {
    public readonly _pickEvent = new EventEmitter<Contestant>();
    private _contestants: Contestant[];
    private _eliminated: Contestant[];

    constructor() {}

    public newGame(contestants: Contestant[]): void {
        this._contestants = contestants;
        this._eliminated = [];
    }

    public undo(): void {
        const contestant = this._eliminated.pop();
        contestant.eliminated = false;
        contestant.winner = false;
        this.saveState();
    }

    public pick(contestant: Contestant): void {
        if (PRIZES[this.turn]) {
            contestant.winner = true;
        } else {
            contestant.eliminated = true;
        }
        this._eliminated.push(contestant);
        this._pickEvent.next(contestant);
        this.saveState();
    }

    public get contestants(): Contestant[] {
        return this._contestants;
    }

    public get turn(): number {
        return this._eliminated.length + 1;
    }

    public get recentlyEliminated(): Contestant[] {
        return this._eliminated.slice(Math.max(this._eliminated.length - 10, 0)).reverse();
    }

    public get pickEvent(): BehaviorSubject<Contestant> {
        return this._pickEvent.asObservable();
    }

    private saveState(): void {
        localStorage.setItem('eliminated', JSON.stringify(this._eliminated));
    }
}
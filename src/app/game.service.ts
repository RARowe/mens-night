import {Injectable, EventEmitter} from '@angular/core';
import { Contestant } from './contestant';
import { PRIZES } from './prizes';
import { Observable } from 'rxjs';
import { filter, distinctUntilChanged } from 'rxjs/operator';

const CONTESTANT_KEY = 'contestants';
const ELIMINATED_KEY = 'eliminated';

@Injectable()
export class GameService {
    public readonly _pickEvent = new EventEmitter<Contestant>();
    private _contestants: Contestant[];
    private _eliminated: Contestant[];

    public newGame(contestants: Contestant[]): void {
        this._contestants = contestants;
        this._eliminated = [];
    }

    public loadGame(): void {
        const contestants = <Array<Contestant>>JSON.parse(localStorage.getItem(CONTESTANT_KEY));
        const eliminated = <Array<Contestant>>(JSON.parse(localStorage.getItem(ELIMINATED_KEY)) || []);

        if (eliminated.length > 0) {
            for (let i = 0; i < eliminated.length; i++) {
                const c = eliminated[i];
                const c2 = contestants.find(c2 => c2.id === c.id);
                c2.eliminated = c.eliminated;
                c2.winner = c.winner;
                eliminated[i] = c2;
            }
        }
        this._contestants = contestants;
        this._eliminated = eliminated;
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

    public get pickEvent(): Observable<Contestant> {
        return this._pickEvent
            .asObservable();
    }

    private saveState(): void {
        if (!localStorage.getItem(CONTESTANT_KEY)) {
            localStorage.setItem(CONTESTANT_KEY, JSON.stringify(this._contestants));
        }
        localStorage.setItem(ELIMINATED_KEY, JSON.stringify(this._eliminated));
    }
}
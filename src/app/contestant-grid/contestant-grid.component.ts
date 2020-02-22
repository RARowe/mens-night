import { Component, OnInit, Input } from '@angular/core';
import { Contestant } from '../contestant';
import { GameService } from '../game.service';

@Component({
  selector: 'contestant-grid',
  templateUrl: './contestant-grid.component.html',
  styleUrls: ['./contestant-grid.component.css']
})
export class ContestantGridComponent {
    @Input()
    public rows: Array<Contestant[]> = [];

    constructor(private readonly _game: GameService) { }

    public undo = (): void => {
        this._game.undo();
    }

    public onContestantClick = (contestant: Contestant): void => {
        this._game.pick(contestant);
    }

    public get recentlyEliminated() {
        return this._game.recentlyEliminated;
    }

    public get turn() {
        return this._game.turn;
    }
}
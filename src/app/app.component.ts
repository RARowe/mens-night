import { Component, OnInit } from '@angular/core';
import { Contestant } from './contestant';
import { GameService } from './game.service';

function makeRows(contestants: Contestant[]): Array<Contestant[]> {
    const rows = [];

    for (let i = 0; i < 15; i++) {
        rows.push([]);
    }

    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 15; j++) {
            rows[j].push(contestants[(i * 15) + j]);
        }
    }

    return rows;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    public showFileInput = true;
    public rows: Array<Contestant[]>;

    constructor (private readonly _game: GameService) {}

    public ngOnInit() {
        const contestants = localStorage.getItem('contestants');
        if (contestants) {
            this._game.loadGame();
            this.rows = makeRows(this._game.contestants);
            this.showFileInput = false;
        }
    }

    public onFileContentLoaded = (contestants: Contestant[]) => {
        localStorage.setItem('contestants', JSON.stringify(contestants));
        this.showFileInput = false;
        this._game.newGame(contestants);
        this.rows = makeRows(this._game.contestants);
    }
}

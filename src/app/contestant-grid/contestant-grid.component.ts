import { Component, OnInit, Input } from '@angular/core';
import { Contestant } from '../contestant';

@Component({
  selector: 'contestant-grid',
  templateUrl: './contestant-grid.component.html',
  styleUrls: ['./contestant-grid.component.css']
})
export class ContestantGridComponent implements OnInit {
    @Input()
    public contestants: Contestant[];
    @Input()
    public eliminatedList: Contestant[];

    public rows: Array<Contestant[]> = [];
    public removingContestant: Contestant;
    public eliminated: boolean = false;
    public animationOn = true;
    public soundOn = true;

    ngOnInit() {
        for (let i = 0; i < 15; i++) {
            this.rows.push([]);
        }

        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 15; j++) {
                this.rows[j].push(this.contestants[(i * 15) + j]);
            }
        }

        this.eliminatedList = this.eliminatedList || [];

        if (this.eliminatedList.length > 0) {
            for (let i = 0; i < this.eliminatedList.length; i++) {
                const c = this.eliminatedList[i];
                const c2 = this.contestants.find(c2 => c2.id === c.id);
                c2.eliminated = true;
                this.eliminatedList[i] = c2;
            }
        }
    }

    recentlyEliminated = () => {
        return this.eliminatedList.slice(Math.max(this.eliminatedList.length - 10, 0)).reverse();
    }

    undo = () => {
        const contestant = this.eliminatedList.pop();
        contestant.eliminated = false;
        localStorage.setItem('eliminatedList', JSON.stringify(this.eliminatedList));
    }

    onContestantClick = (contestant: Contestant) => {
        contestant.eliminated = true;
        this.eliminatedList.push(contestant);
        localStorage.setItem('eliminatedList', JSON.stringify(this.eliminatedList));

        if (this.animationOn) {
            this.removingContestant = contestant;
            setTimeout(() => {
                this.eliminated = true;
                if (this.soundOn) { (<any>document.getElementById('myAudio')).play(); }
            }, 1000);
        }
    }

    hideRemoveAnimation = () => {
        this.eliminated = false;
        this.removingContestant = null;
    }
}
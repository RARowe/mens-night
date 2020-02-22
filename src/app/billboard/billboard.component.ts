import { Component, OnInit, OnDestroy } from '@angular/core';
import { GameService } from '../game.service';
import { Contestant } from '../contestant';
import { ConfigService } from '../config.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'billboard',
  templateUrl: './billboard.component.html',
  styleUrls: ['./billboard.component.css']
})
export class BillboardComponent implements OnInit, OnDestroy {
    public contestant: Contestant;
    public textStyling = {
        'large-text': true,
        'eliminated': false,
        'winner': false
    };

    private _subscription: Subscription;

    constructor(
        private readonly _game: GameService,
        private readonly _config: ConfigService
    ) {}

    ngOnInit() {
        this._subscription = this._game.pickEvent.subscribe(this.onContestantPick);
    }

    ngOnDestroy() {
        this._subscription.unsubscribe();
    }
    
    onContestantPick = (contestant: Contestant): void => {
        if (this._config.animationOn) {
            this.contestant = contestant;
            setTimeout(() => {
                this.textStyling.winner = contestant.winner;
                this.textStyling.eliminated = contestant.eliminated;
                if (this._config.soundOn) {
                    (<any>document.getElementById(contestant.eliminated ? 'buzzer' : 'kaching')).play();
                }
            }, 1000);
        }
    }

    hideRemoveAnimation = () => {
        this.contestant = null;
        this.textStyling.winner = false;
        this.textStyling.eliminated = false;
    }
}

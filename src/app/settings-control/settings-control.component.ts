import { Component } from '@angular/core';
import { ConfigService } from '../config.service';

@Component({
  selector: 'settings-control',
  templateUrl: './settings-control.component.html',
  styleUrls: ['./settings-control.component.css']
})
export class SettingsControlComponent {
    constructor(private readonly _config: ConfigService) {}

    public toggleSound(): void {
        this._config.toggleSound();
    }

    public toggleAnimation(): void {
        this._config.toggleAnimation();
    }

    public get soundOn(): boolean {
        return this._config.soundOn;
    }

    public get animationOn(): boolean {
        return this._config.animationOn;
    }
}

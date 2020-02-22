import { Injectable, Inject } from '@angular/core';

@Injectable()
export class ConfigService {
    private _soundOn = true;
    private _animationOn = true;

    public toggleSound(): void {
        this._soundOn = !this._soundOn;
    }

    public toggleAnimation(): void {
        this._animationOn = !this._animationOn;
    }
    
    public get soundOn(): boolean {
        return this._soundOn;
    }

    public get animationOn(): boolean {
        return this._animationOn;
    }
}
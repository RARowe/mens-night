import { Component, OnInit } from '@angular/core';
import { Contestant } from './contestant';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    public showFileInput = true;
    public contestants: Contestant[] = [];
    public eliminatedList: Contestant[] = [];

    public ngOnInit() {
        const contestants = localStorage.getItem('contestants');
        if (contestants) {
            this.showFileInput = false;
            this.contestants = JSON.parse(contestants);
            this.eliminatedList = JSON.parse(localStorage.getItem('eliminatedList'));
        }
    }

    public onFileContentLoaded = (contestants: Contestant[]) => {
        localStorage.setItem('contestants', JSON.stringify(contestants));
        this.showFileInput = false;
        this.contestants = contestants;
    }
}

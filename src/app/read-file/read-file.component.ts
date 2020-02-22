import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Contestant } from '../contestant';

@Component({
  selector: 'read-file',
  templateUrl: './read-file.component.html',
  styleUrls: ['./read-file.component.css']
})
export class ReadFileComponent implements OnInit {
    @Output()
    public onFileContentLoaded = new EventEmitter<Contestant[]>();

    private fileInput: any;
    constructor() { }

    ngOnInit() {
        this.fileInput = document.getElementById("csv");

        this.fileInput.addEventListener('change', this.readFile);
    }

    readFile = () => {
        var reader = new FileReader();
        reader.onload = () => {
            const content = reader
                                .result
                                .toString()
                                .split('\n')
                                .filter(s => s !== '')
                                .map(s => s.split(','))
                                .map(s => ({ id: parseInt(s[0]), name: s[1] }));
                                
            this.onFileContentLoaded.emit(content);
        };
        // start reading the file. When it is done, calls the onload event defined above.
        reader.readAsBinaryString(this.fileInput.files[0]);
    }
}

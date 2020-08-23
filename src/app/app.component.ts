import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private _snackBar: MatSnackBar) { }
  message = "Please add title"
  text = "";
  notes = 'New note';
  notesForm = new FormGroup({
    title: new FormControl(''),
    content: new FormControl(''),
  });

  notesData = []

  noteInfo(note) {
    let details = note.target.value
    if (details) {
      this.notes = note.target.value
    }
    else {
      this.notes = "new Note"
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

    addNote() {
      let title: String = this.notesForm.value.title
      let content: String = this.notesForm.value.content
      let note = {}
      if (title) {
        let id = uuidv4();
        note['id'] = id
        note["title"] = title;
        note["content"] = content;
        this.notesData.push(note)
        console.log(this.notesData)
      }
      else {
        this.openSnackBar(this.message,"Close")
      }
    }

    viewNote(note){
      console.log(note)
    }

  }

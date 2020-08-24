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
  constructor(private _snackBar: MatSnackBar) {
    let localNotes = localStorage.getItem('notesData')
    this.notesData= JSON.parse(localNotes)
   }
  message = "Please add title"
  text = "";
  notes = 'New note';
  notesForm = new FormGroup({
    title: new FormControl(''),
    content: new FormControl(''),
    id: new FormControl()
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
    let _id=this.notesForm.value.id
    console.log(this.notesForm.value.id)
    let note = {}
    if(_id){
      for(let i = 0; i<this.notesData.length; i++){
        if(this.notesData[i].id==_id){
          console.log(i)
          this.notesData.splice(i)
        }
      }
      note["id"] =_id
      note["title"] = title;
      note["content"] = content;
      this.notesData.push(note)
      localStorage.setItem('notesData',JSON.stringify(this.notesData))
      console.log(this.notesData)
      this.notesForm.reset()
    }
    if (title && _id==null) {
      let id = uuidv4();
      note['id'] = id
      note["title"] = title;
      note["content"] = content;
      this.notesData.push(note)
      localStorage.setItem('notesData',JSON.stringify(this.notesData))
      this.notesForm.reset()
    }
    if(title=="") {
      this.openSnackBar(this.message, "Close")
    }
  }
  deleteNote(note){
    let _id = note.id
    for(let i =0; i<this.notesData.length;i++){
      if(this.notesData[i].id==_id){
        this.notesData.splice(i)
      }
    }
  }
  viewNote(note) {
  let id = note.id
  this.notesForm.controls.title.setValue(note.title)
  this.notesForm.controls.content.setValue(note.content)
  this.notesForm.controls.id.setValue(note.id)
  }

  reset(){
    this.notesForm.reset()

  }

}

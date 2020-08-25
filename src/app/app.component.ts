import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ElementRef } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private _snackBar: MatSnackBar, private elementRef: ElementRef) {
    let screenSize = window.innerWidth
    let localNotes = localStorage.getItem('notesData')
    if (localNotes) {
      this.notesData = JSON.parse(localNotes)
    }
    else {
      this.notesData = []
    }
    if (screenSize > 800) {
      this.showStyle = "block"
    }
    else {
      this.showStyle = "none"
    }
    this.filteredNotes = this.notesData
  }
  message = "Please add title"
  text = "";
  notes = 'New note';
  notesForm = new FormGroup({
    title: new FormControl(''),
    content: new FormControl(''),
    id: new FormControl()
  });
  showStyle = ''
  notesData = []
  filteredNotes = []

  noteInfo(note) {
    let details = note.target.value
    if (details) {
      this.notes = note.target.value
    }
    else {
      this.notes = "new Note"
    }
  }

  /// pop up if the title is not added
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  /// funtionality to add the notes
  addNote() {
    let title: String = this.notesForm.value.title
    let content: String = this.notesForm.value.content
    let _id = this.notesForm.value.id
    let note = {}
    if (title == null || title == "") {
      this.openSnackBar(this.message, "Close")
    }
    if (_id && title != '') {
      for (let i = 0; i < this.notesData.length; i++) {
        if (this.notesData[i].id == _id) {
          this.notesData.splice(i)
        }
      }
      note["id"] = _id
      note["title"] = title;
      note["content"] = content;
      this.notesData.push(note)
      localStorage.setItem('notesData', JSON.stringify(this.notesData))
      this.notesForm.reset()
    }
    if (title && _id == null) {
      let id = uuidv4();
      note['id'] = id
      note["title"] = title;
      note["content"] = content;
      this.notesData.push(note)
      localStorage.setItem('notesData', JSON.stringify(this.notesData))
      this.notesForm.reset()
    }
  }

  ///functionality to delete the note
  deleteNote(note) {
    let _id = note.id
    for (let i = 0; i < this.notesData.length; i++) {
      if (this.notesData[i].id == _id) {
        this.notesData.splice(i)
      }
    }
    localStorage.setItem('notesData', JSON.stringify(this.notesData))
  }


  ///Get the node details for updating it
  viewNote(note) {
    let id = note.id
    this.notesForm.controls.title.setValue(note.title)
    this.notesForm.controls.content.setValue(note.content)
    this.notesForm.controls.id.setValue(note.id)
  }

  /// funtionality to cancel the form
  reset() {
    this.notesForm.reset()

  }

  ///Toggle the notes functionality
  showNotes() {
    if (this.showStyle == "none") {
      this.showStyle = "block"
    }
    else {
      this.showStyle = "none"
    }
  }

  /// Search logic created
  filter(query: string) {
    let allResult = []
    query = query.toLowerCase().trim()
    //split up search query into indiviual words
    let terms: string[] = query.split(" ");
    //splitting on the basis of spaces
    terms = this.removeDuplicactes(terms)
    //compile all results in all result array
    terms.forEach(term => {
      let results = this.relevantNotes(term)
      /////append to all results array
      allResult = [...allResult, ...results]
    })

    let uniqueResults = this.removeDuplicactes(allResult)
    this.filteredNotes = uniqueResults
  }

  removeDuplicactes(arr: Array<any>): Array<any> {
    let uniqueResults: Set<any> = new Set<any>();
    arr.forEach(e => uniqueResults.add(e))
    return Array.from(uniqueResults)
  }

  relevantNotes(query: any) {
    query = query.toLowerCase().trim();
    let relevantNotes = this.notesData.filter(note => {
      if (note.title && note.title.toLowerCase().includes(query)) {
        return true
      }
      if (note.content && note.content.toLowerCase().includes(query)) {
        return true
      }
      else {
        return false
      }
    })
    return relevantNotes;
  }
}

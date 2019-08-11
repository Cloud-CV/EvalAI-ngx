import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-select-field-dialog',
  templateUrl: './select-field-dialog.component.html',
  styleUrls: ['./select-field-dialog.component.scss']
})
export class SelectFieldDialogComponent implements OnInit {

  /** Fields selected fro export **/
  selectedFields = {};

  constructor(public dialogRef: MatDialogRef<SelectFieldDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {
    console.log(this.data);
    this.data.fields.forEach((item) => {
      item['selected'] = false;
    });
  }

  onDone() {
    // this.dialogRef.close(Object.keys(this.selectedFields).map((label) => {this.selectedFields[label]}));
    this.dialogRef.close(Object.values(this.selectedFields));
  }

  selectAll() {
    this.dialogRef.close([]);
  }

  selection(field) {
    field.selected = !field.selected;
    if (field.selected) {
      this.selectedFields[field.label] = field.id;
    } else {
      delete this.selectedFields[field.label];
    }
  }

}

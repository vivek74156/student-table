import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormControl } from "@angular/forms";

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.css']
})
export class DatatableComponent {
  studentForm: FormGroup;
  @Output() onClick: EventEmitter<any> = new EventEmitter
  // @Output() onFilter: EventEmitter = new EventEmitter();
  @ViewChild('myModal') myModal;
  constructor(
  ) { }

  totalItems = 100;
  currentPage = 5;
  cols = [{ name: 'Name' }, { name: 'Email' }, { name: 'Dob' }, { name: 'Standard' }, { name: 'Nationality' }];
  data = [];
  filteredData = [];
  pageSize: 10;
  rows = [
    { name: 'vivek', Email: '', Dob: '', Standard: '4th', Nationality: 'Indian' },
    { name: 'Dany', Email: '', Dob: '', Standard: '3rd', Nationality: 'Indian' },
    { name: 'Molly', Email: '', Dob: '', Standard: '2nd', Nationality: 'Indian.' },
    { name: 'Nitesh', Email: '', Dob: '', Standard: '6th', Nationality: 'Indian' },
    { name: 'Kapil', Email: '', Dob: '', Standard: '3rd', Nationality: 'Indian' },
    { name: 'Suresh', Email: '', Dob: '', Standard: '1st', Nationality: 'Indian' },
    { name: 'Raaj', Email: '', Dob: '', Standard: '7th', Nationality: 'Indian' },
    { name: 'Shahrukh', Email: '', Dob: '', Standard: '4th', Nationality: 'Indian' },
    { name: 'Salman', Email: '', Dob: '', Standard: '3rd', Nationality: 'Indian' },
    { name: 'Kat', Email: '', Dob: '', Standard: '2nd', Nationality: 'Indian' },
    { name: 'Aarav', Email: '', Dob: '', Standard: '1st', Nationality: 'Indian' },
  ];
  // columns = [
  //   { prop: 'name' },
  //   { name: 'Gender' },
  //   { name: 'Company' }
  // ];
  ngOnInit() {
    // populate datatable rows
    this.data = this.rows;
    // copy over dataset to empty object
    this.filteredData = this.rows;

    this.studentForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      Email: new FormControl('', [Validators.required]),
      Dob: new FormControl('', [Validators.required]),
      Standard: new FormControl('', [Validators.required]),
      Nationality: new FormControl('', [Validators.required])
    })
  }

  something() {
    alert('its working')
  }

  onSort(event) {
    console.log('Sort Event', event);
    const rows = [...this.rows];

    const sort = event.sorts[0];
    rows.sort((a, b) => {
      return a[sort.prop].localeCompare(b[sort.prop]) * (sort.dir === 'desc' ? -1 : 1);
    });

    this.rows = rows;
  }
  editUser(studentName) {
    debugger
    let student = this.rows.find((student) => { return student.name === studentName });
    if (student) {
      this.studentForm.patchValue({
        name: student.name,
        Email: student.Email,
        Dob: student.Standard,
        Standard: student.Dob,
        Nationality: student.Nationality
      });
      this.myModal.nativeElement.className = 'modal fade show';
    }

  }

  deleteUser(name) {
    this.rows = this.rows.filter(function (user) {
      return user.name !== name;
    })
  }


  takeAction(value) {
    console.log(value, typeof value);
    if (value == '1') {
      console.log("Case 1")
    } else if (value == '2') {
      console.log("Case 1")
    } else {
      (value == '3')
      console.log("Case 1")
    }
  }

  filterDatatable(event) {
    let val = event.target.value.toLowerCase();
    let colsAmt = this.cols.length;
    let keys = Object.keys(this.rows[0]);
    this.data = this.filteredData.filter(function (item) {
      for (let i = 0; i < colsAmt; i++) {
        if (item[keys[i]].toLowerCase().indexOf(val) !== -1 || !val) {
          return true;
        }
      }
    });

  }
  closeModal() {
    this.myModal.nativeElement.className = 'modal fade';
  }

  saveUser(student) {
    let index = this.rows.findIndex(x => x.name === student.name);
    var objectNames = Object.keys(student);
    objectNames.forEach((objectName) => {
      this.rows[index][objectName] = student[objectName];
    });
    this.closeModal();

  }
}

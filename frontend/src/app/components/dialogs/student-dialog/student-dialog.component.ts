import { Subscription } from 'rxjs';
import { StatusService } from './../../../services/status.service';
import { StudentService } from './../../../services/student.service';
import { Student } from 'src/app/models/student';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, Inject, OnInit } from '@angular/core';
import { Status } from 'src/app/models/status';

@Component({
  selector: 'app-student-dialog',
  templateUrl: './student-dialog.component.html',
  styleUrls: ['./student-dialog.component.css']
})
export class StudentDialogComponent implements OnInit {

  statusi: Status[];
  public flag: number;
  subscription: Subscription;


  constructor(public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<StudentDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Student,
              public studentService: StudentService,
              public statusService: StatusService) { }


  ngOnInit(): void {
    this.subscription = this.statusService.getAllStatuses()
      .subscribe(statusi => {
        this.statusi = statusi;
      }),
      (error: Error) => {
        console.log(error.name + ' ' + error.message);
      }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  compareTo(a: any, b: any) {
    return a.id === b.id;
  }


  public add(): void {
    this.studentService.addStudent(this.data)
      .subscribe(() => {
        this.snackBar.open('Uspešno dodat student!', 'U redu', {
          duration: 2500
        })
      }),
      this.snackBar.open('Dogodila se greška !', 'Zatvori', {
        duration: 1500
      })
  }

  public update(): void {
    this.studentService.updateStudent(this.data)
      .subscribe(() => {
        this.snackBar.open('Uspešno modifikovan student!', 'U redu', {
          duration: 2500
        })
      }),
      this.snackBar.open('Dogodila se greška !', 'Zatvori', {
        duration: 1500
      })
  }

  public delete(): void {
   this.studentService.deleteStudent(this.data.id)
      .subscribe(() => {
        this.snackBar.open('Uspešno obrisan student!', 'U redu', {
         duration: 2500
        })
     }),
      this.snackBar.open('Dogodila se greška !', 'Zatvori', {
       duration: 1500
      })
    }


    public cancel(): void {
      this.dialogRef.close();
      this.snackBar.open('Odustali ste !', 'Zatvori', {
        duration: 1500
       })
    }

}

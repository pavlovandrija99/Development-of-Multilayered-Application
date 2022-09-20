import { Subscription } from 'rxjs';
import { FakultetService } from 'src/app/services/fakultet.service';
import { DepartmanService } from './../../../services/departman.service';
import { Departman } from './../../../models/departman';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Fakultet } from 'src/app/models/fakultet';
import { Component, Inject, OnInit } from '@angular/core';


@Component({
  selector: 'app-departman-dialog',
  templateUrl: './departman-dialog.component.html',
  styleUrls: ['./departman-dialog.component.css']
})
export class DepartmanDialogComponent implements OnInit {

  fakulteti: Fakultet[];
  public flag: number;
  subscription: Subscription;


  constructor(public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<DepartmanDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Departman,
              public departmanService: DepartmanService,
              public fakultetService: FakultetService) { }


  ngOnInit(): void {
   this.subscription = this.fakultetService.getAllFakultet()
      .subscribe(fakulteti => {
        this.fakulteti = fakulteti;
      }),
      (error: Error) => {
        console.log(error.name + ' ' + error.message);
      }
  }


  compareTo(a: any, b: any) {
    return a.id == b.id;
  }


  public add(): void {
    this.departmanService.addDepartman(this.data)
      .subscribe(()=> {
        this.snackBar.open('Uspešno dodat fakultet', 'U redu', {
          duration: 2500
        })
      }),
      (error: Error) => {
        console.log(error.name + '--->' + error.message);
        this.snackBar.open('Dogodila se greška. Pokušajte ponovo!', 'Zatvori', {
          duration: 2500
        });
      };
  }


  public update(): void {
    this.departmanService.updateDepartman(this.data)
      .subscribe(()=> {
        this.snackBar.open('Uspešno modifikovan fakultet' + this.data.naziv, 'U redu', {
          duration: 2500
        })
      }),
      (error: Error) => {
        console.log(error.name + '--->' + error.message);
        this.snackBar.open('Dogodila se greška. Pokušajte ponovo!', 'Zatvori', {
          duration: 2500
       });
     };
    }


    public delete(): void {
     this.departmanService.deleteDepartman(this.data.id)
        .subscribe(() => {
          this.snackBar.open('Uspešno obrisan fakultet' + this.data.naziv, 'U redu', {
            duration: 2500
          })
        }),
        (error: Error) => {
          console.log(error.name + '--->' + error.message);
          this.snackBar.open('Dogodila se greška. Pokušajte ponovo!', 'Zatvori', {
            duration: 2500
         });
       };
    }


    public cancel(): void {
      this.dialogRef.close();
      this.snackBar.open('Odustali ste od izmena !', 'Zatvori', {
        duration: 1500
     });
    }

}

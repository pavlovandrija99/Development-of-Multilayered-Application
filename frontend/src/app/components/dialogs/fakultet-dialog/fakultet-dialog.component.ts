
import { FakultetService } from './../../../services/fakultet.service';
import { Fakultet } from './../../../models/fakultet';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-fakultet-dialog',
  templateUrl: './fakultet-dialog.component.html',
  styleUrls: ['./fakultet-dialog.component.css']
})
export class FakultetDialogComponent implements OnInit {

  public flag: number;

  constructor(public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<FakultetDialogComponent>,
              @Inject (MAT_DIALOG_DATA) public data: Fakultet,
              public fakultetService: FakultetService) { }


  ngOnInit(): void {
  }


  public add(): void {
   this.fakultetService.addFakultet(this.data)
    .subscribe(() => {
      this.snackBar.open('Uspesno dodat fakultet: ' + this.data.naziv , 'U redu', {
        duration: 2500
      });
    }),
    (error: Error) => {
      console.log(error.name + '--->' + error.message);
      this.snackBar.open('Dogodila se greska. Pokusajte ponovo!', 'Zatvori', {
        duration: 2500
      });
    };
  }


  public update(): void {
   this.fakultetService.updateFakultet(this.data)
    .subscribe(() => {
      this.snackBar.open('Uspesno modifikovan fakultet: ' + this.data.naziv, 'U redu', {
        duration: 2500
      });
    }),
    (error: Error) => {
      console.log(error.name + '--->' + error.message);
      this.snackBar.open('Dogodila se greska. Pokusajte ponovo!', 'Zatvori', {
        duration: 2500
      });
    };
  }

  public delete(): void {
    this.fakultetService.deleteFakultet(this.data.id)
      .subscribe(() => {
        this.snackBar.open('Uspesno obrisan fakultet: ', 'U redu', {
          duration: 2500
        });
      }),
      (error: Error) => {
        console.log(error.name + '--->' + error.message);
        this.snackBar.open('Dogodila se greska. Pokusajte ponovo!', 'Zatvori', {
          duration: 2500
      });
    };
  }


  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open('Odustali ste od izmena!', 'U redu', {
      duration: 1000
    });
  }

}

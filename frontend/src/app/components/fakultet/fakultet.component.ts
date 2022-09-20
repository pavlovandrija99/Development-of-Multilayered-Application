
import { MatPaginator } from '@angular/material/paginator';
import { FakultetDialogComponent } from './../dialogs/fakultet-dialog/fakultet-dialog.component';
import { Component, OnInit, ViewChild, OnChanges, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Fakultet } from 'src/app/models/fakultet';
import { FakultetService } from 'src/app/services/fakultet.service';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-fakultet',
  templateUrl: './fakultet.component.html',
  styleUrls: ['./fakultet.component.css']
})
  export class FakultetComponent implements OnInit, OnChanges, OnDestroy {

  displayedColumns = ['id', 'naziv', 'sediste', 'actions'];
  dataSource: MatTableDataSource<Fakultet>;
  subscription: Subscription;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;


  constructor(private fakultetService: FakultetService,
              public dialog: MatDialog) { }


  ngOnInit(): void {
    this.loadData();
  }


  ngOnChanges(): void {
    this.loadData();
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  public loadData() {
    this.subscription = this.fakultetService.getAllFakultet()
    .subscribe(data => {
        //console.log(data);
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }),
    (error: Error) => {
      console.log(error.name + " " + error.message);
    }
  }


  public openDialog(flag: number, id?: number, naziv?: string, sediste?: string) {
    const dialogRef = this.dialog.open(FakultetDialogComponent, {data: {id, naziv, sediste}});
    dialogRef.componentInstance.flag = flag;
    dialogRef.afterClosed()
      .subscribe(result => {
        if(result === 1) {
          this.loadData();
        }
      })
  }


  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLocaleLowerCase();
    this.dataSource.filter = filterValue;
  }

}


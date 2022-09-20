import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DepartmanDialogComponent } from './../dialogs/departman-dialog/departman-dialog.component';
import { Fakultet } from 'src/app/models/fakultet';
import { DepartmanService } from './../../services/departman.service';
import { Departman } from './../../models/departman';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-departman',
  templateUrl: './departman.component.html',
  styleUrls: ['./departman.component.css']
})
export class DepartmanComponent implements OnInit {

  displayedColumns = ['id', 'naziv', 'oznaka', 'fakultet', 'actions'];
  dataSource: MatTableDataSource<Departman>;
  subscription: Subscription;
  selectedDepartman: Departman;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;


  constructor(public departmanService: DepartmanService,
              public dialog: MatDialog) { }



  ngOnInit(): void {
    this.loadData();
  }


  nOnChanges(): void {
    this.loadData();
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  public loadData() {
    this.subscription = this.departmanService.getAllDepartmants()
      .subscribe((data) => {
        //console.log(data);
        this.dataSource = new MatTableDataSource(data);

        //pretraga po nazivu ugnježdenog objekta(konkretno fakulteta)
        this.dataSource.filterPredicate = (data: any, filter: string) => {
          const accumulator = (currentTerm: any, key: any) => {
            return key === 'fakultet' ? currentTerm + data.fakultet.naziv : currentTerm + data[key];
          };
          const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
          const transformedFilter = filter.trim().toLowerCase();
          return dataStr.indexOf(transformedFilter) !== -1;
        };


         // sortiranje po nazivu ugnježdenog objekta
          this.dataSource.sortingDataAccessor = (data: any, property: string) => {
          switch (property) {
            case 'fakultet': return data.fakultet.naziv.toLocaleLowerCase();
            default: return data[property];
          }
        };


        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;

      }),
      (error: Error) => {
        console.log(error.name + " " + error.message);
      }
  }


  public openDialog(flag: number, id?: number, naziv?: string, oznaka?: string, fakultet?: Fakultet) {
    const dialogRef = this.dialog.open(DepartmanDialogComponent, {data: {id, naziv, oznaka, fakultet}});
    dialogRef.componentInstance.flag = flag;

    dialogRef.afterClosed().subscribe(result => {
      if(result == 1) {
        this.loadData();
      }
    }),
    (error: Error) => {
      console.log(error.name + ' ' + error.message);
    }
  }


  selectRow(row: any) {
    //console.log(row);
    this.selectedDepartman = row;
    //console.log(this.selectedDepartman);
  }


  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLocaleLowerCase();
    this.dataSource.filter = filterValue;
  }


}

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { StudentDialogComponent } from './../dialogs/student-dialog/student-dialog.component';
import { Subscription } from 'rxjs';
import { Status } from './../../models/status';
import { StudentService } from './../../services/student.service';
import { Departman } from './../../models/departman';
import { MatTableDataSource } from '@angular/material/table';
import { Component, Input, OnInit, ViewChild, OnChanges, OnDestroy } from '@angular/core';
import { Student } from 'src/app/models/student';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit, OnChanges, OnDestroy {

  displayedColumns = ['id', 'ime', 'prezime', 'brojIndeksa', 'status', 'departman', 'actions'];
  dataSource: MatTableDataSource<Student>;
  subscription: Subscription;

  @Input() childSelectedDepartman: Departman;

  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;


  constructor(private studentService: StudentService,
              private dialog: MatDialog) { }


  ngOnInit(): void {
    //console.log('Selected departman: ' + this.childSelectedDepartman);
    this.loadData();
  }


  ngOnChanges(): void {
    if(this.childSelectedDepartman) {
      this.loadData();
    }
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  public loadData() {
    this.subscription = this.studentService.getStudentsForDepartman(this.childSelectedDepartman.id)
      .subscribe(data => {
        //console.log(data);
        this.dataSource = new MatTableDataSource(data);

        //pretraga po nazivu ugnježdenog objekta(konkretno statusa)
        this.dataSource.filterPredicate = (data: any, filter: string) => {
          const accumulator = (currentTerm: any, key: any) => {
            return key === 'status' ? currentTerm + data.status.naziv : currentTerm + data[key];
          };
          const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
          const transformedFilter = filter.trim().toLowerCase();
          return dataStr.indexOf(transformedFilter) !== -1;
        };


        // sortiranje po nazivu ugnježdenog objekta
        this.dataSource.sortingDataAccessor = (data: any, property: string) => {
          switch (property) {
            case 'status': return data.status.naziv.toLocaleLowerCase();
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


  public openDialog(flag: number, id?: number, ime?: string, prezime?: string, brojIndeksa?: string, status?: Status, departman?: Departman) {

    const dialogRef = this.dialog.open(StudentDialogComponent, {data: {id, ime, prezime, brojIndeksa, status, departman}});
    dialogRef.componentInstance.flag = flag;

    if(flag === 1) {
      dialogRef.componentInstance.data.departman = this.childSelectedDepartman;
    }

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

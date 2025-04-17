import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  inject,
  ViewChild,
} from '@angular/core';
import {
  MatPaginator,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TrainComponent } from '../../models/train-component.model';
import { ComponentService } from '../../services/train-component.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { ComponentCreateComponent } from '../component-create/component-create.component';

@Component({
  selector: 'component-list',
  styleUrl: 'component-list.component.css',
  templateUrl: 'component-list.component.html',
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComponentListComponent implements AfterViewInit {
  readonly dialog = inject(MatDialog);
  displayedColumns: string[] = [
    'id',
    'name',
    'uniqueNumber',
    'canAssignQty',
    'quantity',
    'actions',
  ];

  components: MatTableDataSource<TrainComponent> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator = new MatPaginator();
  @ViewChild(MatSort) sort: MatSort = new MatSort();

  constructor(private componentService: ComponentService) { }

  ngAfterViewInit() {
    this.components.paginator = this.paginator;
    this.components.sort = this.sort;

    this.getAllComponent();
  }

  getAllComponent(page: number = 1, pageSize: number = 10) {
    this.componentService.getAll('', page, pageSize).subscribe((data) => {
      this.components.data = data;
    });
  }

  searchComponent(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.componentService.search(filterValue).subscribe((data) => {
      this.components.data = data;
      this.setFirstPagePaginate();
    });
  }

  onChangePaginate(e: PageEvent) {
    this.getAllComponent(e.pageIndex + 1, e.pageSize);
  }

  saveAssignQuantity(id: number, quantity: number) {
    this.componentService.assignQuantity(id, quantity).subscribe(() => {
      this.getAllComponent();
    });
  }

  setFirstPagePaginate() {
    if (this.components.paginator) {
      this.components.paginator.firstPage();
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ComponentCreateComponent, {
      data: { name: '' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed', result);
      this.getAllComponent();
    });
  }
}

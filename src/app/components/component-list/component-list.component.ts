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
import {
  MatFormFieldControl,
  MatFormFieldModule,
} from '@angular/material/form-field';
import { mockData } from '../../mock/data';
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
  components: MatTableDataSource<TrainComponent>;

  @ViewChild(MatPaginator) paginator: MatPaginator = new MatPaginator();
  @ViewChild(MatSort) sort: MatSort = new MatSort();

  constructor(private componentService: ComponentService) {
    this.components = new MatTableDataSource(mockData);
  }

  ngAfterViewInit() {
    this.components.paginator = this.paginator;
    this.components.sort = this.sort;
  }

  getAllComponent() {
    this.componentService
      .getAll()
      .subscribe((data: any) => (this.components = data));
  }

  async searchComponent(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    await this.componentService.search(filterValue);

    this.setFirstPagePaginate();
  }

  async onChangePaginate(e: PageEvent) {
    await this.componentService
      .getAll('', e.pageIndex, e.pageSize)
      .subscribe((data: any) => (this.components = data));
    this.setFirstPagePaginate();
  }

  saveAssignQuantity(id: number, quantity: number) {
    this.componentService.assignQuantity(id, quantity);
  }

  setFirstPagePaginate() {
    if (this.components.paginator) {
      this.components.paginator.firstPage();
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ComponentCreateComponent, {
      data: { name: 'Ali' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }
}

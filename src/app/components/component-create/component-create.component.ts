import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { ComponentService } from '../../services/train-component.service';

@Component({
  selector: 'component-create',
  templateUrl: 'component-create.component.html',
  styleUrl: 'component-create.component.css',
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    ReactiveFormsModule,
    MatGridListModule,
    MatCheckboxModule,
  ],
})

export class ComponentCreateComponent {
  readonly dialogRef = inject(MatDialogRef<ComponentCreateComponent>);
  readonly data = inject<any>(MAT_DIALOG_DATA);

  componentForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private componentService: ComponentService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {
    this.componentForm = this.fb.group({
      name: ['', Validators.required],
      uniqueNumber: ['', Validators.required],
      canAssignQty: [false],
      quantity: [null],
    });

    this.componentForm
      .get('canAssignQty')
      ?.valueChanges.subscribe((canAssign) => {
        const quantityControl = this.componentForm.get('quantity');
        if (canAssign) {
          quantityControl?.setValidators([
            Validators.required,
            Validators.min(1),
            Validators.pattern('^[0-9]+$'),
          ]);
        } else {
          quantityControl?.clearValidators();
          quantityControl?.setValue(null);
        }
        quantityControl?.updateValueAndValidity();
      });
  }

  onSubmit(): void {
    if (this.componentForm.valid) {
      console.log('New Component:', this.componentForm.value);
      this.componentService
              .create(this.componentForm.value)
              .subscribe(() => this.dialogRef.close());
    }
  }
}

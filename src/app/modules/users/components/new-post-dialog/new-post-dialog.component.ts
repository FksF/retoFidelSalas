import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UsersService } from '../../services/users.service';
import { finalize } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-new-post-dialog',
  templateUrl: './new-post-dialog.component.html',
  styleUrls: ['./new-post-dialog.component.scss']
})
export class NewPostDialogComponent {

  myForm: FormGroup;
  loader: boolean = false;

  constructor(
      private fb: FormBuilder,
      public dialogRef: MatDialogRef<NewPostDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private usersService: UsersService
    ) {
    this.myForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  onSubmit() {
    this.loader = true;
    this.usersService.createPost(this.myForm.value['title'],this.myForm.value['description'],this.data)
    .pipe(
      finalize(() => {
        this.loader = false;
      })
    )
    .subscribe(
      (resp) => {
        this.dialogRef.close(true);
      },
      (error: HttpErrorResponse) => {
        console.error(error);
        alert('Ocurrio un problema');
        this.dialogRef.close(false);
      }
    );
  }
}

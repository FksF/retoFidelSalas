import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MAT_DIALOG_DEFAULT_OPTIONS, MatDialogConfig, MatDialogModule } from '@angular/material/dialog';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatExpansionModule } from '@angular/material/expansion';
import { A11yModule } from '@angular/cdk/a11y';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { MatRadioModule } from '@angular/material/radio';
import { MatRippleModule } from '@angular/material/core';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';

const matDialogConfig = new MatDialogConfig();
matDialogConfig.maxWidth = '90vw';

const modules = [
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatProgressBarModule,
  MatDialogModule,
  MatSidenavModule,
  MatExpansionModule,
  CdkStepperModule,
  A11yModule,
  MatRadioModule,
  MatRippleModule,
  ClipboardModule,
  MatMenuModule,
  MatFormFieldModule,
  MatInputModule,
  MatFormFieldModule,
  MatCheckboxModule,
  MatTabsModule,
  MatListModule,
  MatTableModule
];

@NgModule({
  declarations: [],
  imports: [modules],
  exports: [modules],
  providers: [
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS,
      useValue: matDialogConfig
    }
  ]
})
export class AngularMaterialModule {}

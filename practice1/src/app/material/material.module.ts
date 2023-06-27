import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgModule } from '@angular/core';
import { MatInputModule} from '@angular/material/input';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatDividerModule} from '@angular/material/divider';
import { MatButtonModule} from '@angular/material/button';
import { MatTableModule} from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule} from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatNativeDateModule } from '@angular/material/core';
import { MatToolbarModule } from '@angular/material/toolbar';

const Material =[
  MatFormFieldModule,
  MatInputModule,
  MatDividerModule,
  MatButtonModule,
  MatTableModule,
  MatDatepickerModule,
  MatCardModule,
  MatIconModule,
  MatCheckboxModule,
  MatProgressSpinnerModule,
  MatNativeDateModule,
  MatToolbarModule
]

@NgModule({
  imports: [ Material],
  exports:[Material]
})
export class MaterialModule { }

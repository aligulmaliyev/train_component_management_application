import { Component } from '@angular/core';
import { ComponentService } from './services/train-component.service';
import { ComponentListComponent } from './components/component-list/component-list.component';

@Component({
  selector: 'app-root',
  imports: [ComponentListComponent],
  providers: [ComponentService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'train_component_management_application';
}

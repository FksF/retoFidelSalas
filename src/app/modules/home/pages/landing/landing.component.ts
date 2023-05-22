import { Component } from '@angular/core';
import { Routes } from 'src/app/shared/enums/_routes';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent {

  constructor( private sharedService: SharedService ) {

  }

  goToLogin() {
    this.sharedService.navigateToExternalUrl(Routes.login);
  }
}

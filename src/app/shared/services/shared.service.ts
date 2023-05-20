import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Routes } from './../enums/_routes';

@Injectable({
  providedIn: 'root',
})
export class SharedService {

  constructor(
    private ngZone: NgZone,
    private router: Router,
  ) { }

  public navigateToExternalUrl = (url: string) => { this.redirect(url); };

  public navigateToComponent(route: Routes, params?: any): void {
    console.log('llego');
    
    this.ngZone.run(() => {
      console.log('inside', route);
      
      this.router.navigate([route], { queryParams: {paramsKey: params} });
    });
  }

  public redirect = (url: string) => { window.location.href = url; };
}

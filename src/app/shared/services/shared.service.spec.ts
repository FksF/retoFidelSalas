import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Routes } from '../enums/_routes';
import { SharedService } from './shared.service';

describe('SharedService', () => {
  let service: SharedService;
  const routerSpy = { navigate: jasmine.createSpy('navigate')};
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
      ],
      providers: [
        { provide: Router, useValue: routerSpy },
      ],
    });
    service = TestBed.inject(SharedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('debería navegar hacia una url externa al llamar a navigateToExternalUrl(url)', () => {
    const navigateToResponseUrlSpy = spyOn<any>(service, 'redirect');
    const url = '/external-url';
    service.navigateToExternalUrl(url);
    expect(navigateToResponseUrlSpy).toHaveBeenCalledWith(`/external-url`);
  });
});

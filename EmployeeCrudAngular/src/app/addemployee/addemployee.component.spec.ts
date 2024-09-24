import { TestBed } from '@angular/core/testing';
import { AddemployeeComponent } from './addemployee.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs'; // para simular observables
import { DatePipe } from '@angular/common';

describe('AddemployeeComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AddemployeeComponent, HttpClientTestingModule],
      providers: [
        DatePipe,
        {
          provide: ActivatedRoute, // Simula ActivatedRoute
          useValue: {
            params: of({ id: 1 }) // simula el parámetro id en la URL
          }
        }
      ]
    });
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(AddemployeeComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
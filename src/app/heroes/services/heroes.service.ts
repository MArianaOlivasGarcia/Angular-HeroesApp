import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Heroe } from '../interfaces/heroe.interface';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  constructor( private http: HttpClient ) { }

  getHeroes(): Observable<Heroe[]> {
    return this.http.get<Heroe[]>('http://localhost:3000/heroes');
  }

  getHeroe( id: string ): Observable<Heroe> {
    return this.http.get<Heroe>(`http://localhost:3000/heroes/${ id }`);
  }

  getSugerencias( termino: string ): Observable<Heroe[]> {
    return this.http.get<Heroe[]>(`http://localhost:3000/heroes?q=${ termino }&_limit=6`);
  }

  agregarHeroe( heroe: Heroe ): Observable<Heroe> {
    return this.http.post<Heroe>(`http://localhost:3000/heroes`, heroe);
  } 

  actualizarHeroe( heroe: Heroe ): Observable<Heroe> {
    return this.http.put<Heroe>(`http://localhost:3000/heroes/${ heroe.id }`, heroe);
  } 

  borrarHeroe( id: string ): Observable<Heroe> {
    return this.http.delete<Heroe>(`http://localhost:3000/heroes/${ id }`);
  } 

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Heroe, Publisher } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';
import { switchMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [`
    img {
      width: 100%;
      border-radius: 5px;
    }
  `]
})
export class AgregarComponent implements OnInit {

  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    }
  ];


  heroe: Heroe = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: ''
  }

  constructor( private heroesService: HeroesService,
               private activatedRoute: ActivatedRoute,
               private router: Router,
               private snackbar: MatSnackBar ) { }


  ngOnInit(): void {

    if ( !this.router.url.includes('editar') ) { return; }

    this.activatedRoute.params
        .pipe(
          switchMap( ({id}) => this.heroesService.getHeroe(id) )
        )
        .subscribe( heroe => this.heroe = heroe );

  }



  guardar(): void {
    
    if ( this.heroe.superhero.trim().length === 0) {
      return;
    }


    if ( this.heroe.id ) {
      // Actualizar
      this.heroesService.actualizarHeroe( this.heroe )
        .subscribe( heroe => this.mostrarSnackbar('Registro actualizado con éxito!') )
    } else {
      // Crear
      this.heroesService.agregarHeroe( this.heroe )
      .subscribe( heroe => {
        this.router.navigate(['/heroes/editar', heroe.id]);
        this.mostrarSnackbar('Registro creado con éxito!');
      });
    } 

  }



  borrarHeroe(): void {
    this.heroesService.borrarHeroe( this.heroe.id! )
        .subscribe( resp => {
          this.router.navigate(['/heroes']);
        })
  }


  mostrarSnackbar( mensaje: string ): void {
    this.snackbar.open( mensaje, 'ok!', {
      duration: 2500
    })
  }


}

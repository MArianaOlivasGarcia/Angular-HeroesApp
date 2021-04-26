import { Component, Input, OnInit } from '@angular/core';
import { Heroe } from '../../interfaces/heroe.interface';

@Component({
  selector: 'app-tarjeta',
  templateUrl: './tarjeta.component.html',
  styleUrls: ['./tarjeta.component.css']
})
export class TarjetaComponent implements OnInit {

  @Input() heroe!: Heroe;

  constructor() { }

  ngOnInit(): void {
  }

}

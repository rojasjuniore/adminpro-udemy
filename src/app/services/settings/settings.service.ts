import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Injectable()
export class SettingsService {

  ajustes: Ajustes = {
    temaURL: 'assets/css/colors/default.css',
    tema: 'default'
  };

  constructor( @Inject(DOCUMENT) private _document) {
    this.cargarAjustes();
  }

  guardarAjustes() {
    localStorage.setItem('ajustes', JSON.stringify(this.ajustes));
  }

  cargarAjustes() {
    if (localStorage.getItem('ajustes')) {
      this.ajustes = JSON.parse(localStorage.getItem('ajustes'));
      this.aplicarTema(this.ajustes.tema);
    } else {
      console.log('Usando valores por defecto');
    }
  }

  aplicarTema(tema: string) {

    let url = `assets/css/colors/${tema}`;
    this._document.getElementById('tema').setAttribute('href', url + '.css');

    this.ajustes.tema = tema;
    this.ajustes.temaURL = url;
    this.guardarAjustes();
  }

}

interface Ajustes {
  temaURL: string;
  tema: string;
}

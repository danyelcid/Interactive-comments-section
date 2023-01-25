import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    nombre:       string   = 'Daniel Cid';
    capitalizar:  string   = 'loRem iPSum dOlor';
    
    arreglo:      number[] = [1,2,3,4,5,6,7,8,9];
    PI :          number   = Math.PI;
    porciento:    number   = 2/3;
    salario:      number   = 12520/3;

    activar:      boolean  = true;

    promesa = new Promise<string>( (resolve) =>{

      setTimeout(() => {
        resolve('esta es la respuesta')
      }, 4500);

    } )

    fecha:     Date = new Date();
    idioma:    string = 'es_Mx'

    cambiarIdioma(nuevoIdioma:string){
      this.idioma = nuevoIdioma;
    }

    heroe ={
      nombre: 'Logan',
      clave:  'Wolverine',
      edad:   500,
      direccion :{
        calle:  "paseo",
        numero: 56,
      }
    }
}

import { Component, OnInit } from '@angular/core';
import { Persona } from 'src/app/model/persona';
import { PersonaService } from 'src/app/providers/persona.service';

@Component({
  selector: 'app-pagina-service-persona',
  templateUrl: './pagina-service-persona.component.html',
  styleUrls: ['./pagina-service-persona.component.scss']
})
export class PaginaServicePersonaComponent implements OnInit {
  personas:Persona[];
  cantidadUsuarios:number;

  constructor(private personaService: PersonaService) { 
    console.trace('PaginaServicePersonaComponent constructor');
    this.personas=[];
    this.cantidadUsuarios = 2;
  }

  ngOnInit() {
    console.trace('PaginaServicePersonaComponent ngOnInit');
    this.getAllUserByNumber(this.cantidadUsuarios);

  }

 getAllUserByNumber(cantidadUsuarios:number){
      //Lo inicializa a cero antes de obtener todas las personas
      this.personas=[];

      this.personaService.getAllByNumberResults(this.cantidadUsuarios).subscribe(jsonData=>{
        console.debug('recibimos datos json %o',jsonData);
        let info=jsonData.info;
        let personasJson = jsonData.results;

      this.personas= personasJson.map(f=>{
        //p['name']['first'] o p.name.first
          return new Persona(f.name.first,
            f['name']['last'],
            f.email,
            f.picture.large);
        });
      });
  }

}

import { Component, OnInit } from '@angular/core';
import { Fruta } from 'src/app/model/fruta';
import { FrutaService } from 'src/app/providers/fruta.service';

@Component({
  selector: 'app-pagina-service',
  templateUrl: './pagina-service.component.html',
  styleUrls: ['./pagina-service.component.scss']
})
export class PaginaServiceComponent implements OnInit {

  frutas:Fruta[];

  constructor(private frutaService:FrutaService) { 
    console.trace('PaginaServiceComponent constructor');
    this.frutas=[];
  }

  ngOnInit() {
    console.trace('PaginaServiceComponent ngOnInit');
    //realizar llamada al servicio
    this.frutaService.getAll().subscribe(jsonData =>{
      console.debug('recibimos datos json %o',jsonData);
      //TODO mapear
      this.frutas = jsonData.map(f=>{
        return new Fruta(f.nombre,f.precio,f.id,f.oferta,f.descuento,f.imagen,1);
      });
    });
  }

}

import { Component, OnInit } from "@angular/core";
import { TareasService } from "src/app/services/tareas.service";
import { ActivatedRoute } from "@angular/router";
import { Lista } from 'src/app/models/lista.model';
import { ListaItem } from 'src/app/models/lista-item.model';
import { TitleCasePipe } from '@angular/common';

@Component({
	selector: "app-agregar",
	templateUrl: "./agregar.page.html",
	styleUrls: ["./agregar.page.scss"],
})
export class AgregarPage implements OnInit {

  lista: Lista;
  nombreItem = '';

	constructor(
		private tareasService: TareasService,
		private activatedRoute: ActivatedRoute
	) {
    const listaId = this.activatedRoute.snapshot.paramMap.get('listaId');

    this.lista = tareasService.obtenerLista(listaId);
        
  }
  
  agregarItem() {
    if(this.nombreItem.length === 0) {
      return;
    }

    const nuevoItem = new ListaItem(this.nombreItem);
    this.lista.items.push(nuevoItem);
    this.nombreItem = '';
    this.tareasService.guardarStorage();
  }

  cambioCheck(item: ListaItem) {

    const pendientes = this.lista.items.filter(itemData => !itemData.completado).length;

    if(pendientes === 0) {
      this.lista.completada = true;
      this.lista.temrinadaEn = new Date();
    } else {
      this.lista.completada = false;
      this.lista.temrinadaEn = null;
    }
    
    this.tareasService.guardarStorage();
    console.log(this.lista.completada);
    console.log(this.lista.temrinadaEn);
    
  }

  borrarItem(i: number) {
    this.lista.items.splice(i, 1);
    this.tareasService.guardarStorage();
  }

	ngOnInit() {}
}

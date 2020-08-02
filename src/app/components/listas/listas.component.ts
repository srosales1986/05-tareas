import { Component, OnInit, Input, ViewChild } from "@angular/core";
import { TareasService } from "src/app/services/tareas.service";
import { Router } from "@angular/router";
import { Lista } from "src/app/models/lista.model";
import { AlertController, IonList } from "@ionic/angular";

@Component({
	selector: "app-listas",
	templateUrl: "./listas.component.html",
	styleUrls: ["./listas.component.scss"],
})
export class ListasComponent implements OnInit {
  @ViewChild( IonList ) listaView: IonList;
	@Input() terminada = true;

	constructor(
		public tareasService: TareasService,
		private router: Router,
		private alertCrlr: AlertController
	) {}

	selectList(lista: Lista) {
		if (this.terminada) {
			this.router.navigateByUrl(`/tabs/tab2/agregar/${lista.id}`);
		} else {
			this.router.navigateByUrl(`/tabs/tab1/agregar/${lista.id}`);
		}
	}
	async borrarLista(lista: Lista) {
		const alert = await this.alertCrlr.create({
			header: "Eliminar Lista",
			subHeader: "¿Está seguro que desea eliminar la lista?",
			buttons: [
				{
					text: "Cancelar",
          role: "cancel",
          handler: () => this.listaView.closeSlidingItems()
				},
				{
					text: "Eliminar",
					handler: () => {
						this.tareasService.borrarLista(lista);
            this.tareasService.guardarStorage();
            this.listaView.closeSlidingItems();
					},
				},
			],
		});
		alert.present();
	}
	async editarLista(lista: Lista) {
		const alert = await this.alertCrlr.create({
			header: "Editar nombre de la lista",
			inputs: [
				{
					name: "nombreLista",
					type: "text",
					value: lista.titulo,
				}
      ],
      buttons: [
        {
          text: 'cancelar',
          role: 'cancel'
        },
        {
          text: 'OK',
          handler: (data) => {
            this.tareasService.editarLista(lista,data.nombreLista);
            this.tareasService.guardarStorage();
          }
        }
      ]
		});
		alert.present();
	}

	ngOnInit() {}
}

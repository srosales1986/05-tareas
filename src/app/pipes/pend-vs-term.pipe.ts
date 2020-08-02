import { Pipe, PipeTransform } from '@angular/core';
import { Lista } from '../models/lista.model';
import { ListaItem } from '../models/lista-item.model';

@Pipe({
  name: 'pendVsTerm',
  pure: false
})
export class PendVsTermPipe implements PipeTransform {

  transform(total: number, lista: ListaItem[]): string {
    const listaTerminadas = lista.filter(lista => lista.completado === true);
    return `${listaTerminadas.length}/${total}`;
  }

}

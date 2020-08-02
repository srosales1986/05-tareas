import { NgModule } from '@angular/core';
import { FiltrarTerminadasPipe } from './filtrar-terminadas.pipe';
import { PendVsTermPipe } from './pend-vs-term.pipe';




@NgModule({
  declarations: [FiltrarTerminadasPipe, PendVsTermPipe],
  exports: [FiltrarTerminadasPipe, PendVsTermPipe],
})
export class PipesModule { }

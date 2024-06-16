import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SacarFoto2Page } from './sacar-foto2.page';

const routes: Routes = [
  {
    path: '',
    component: SacarFoto2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SacarFoto2PageRoutingModule {}

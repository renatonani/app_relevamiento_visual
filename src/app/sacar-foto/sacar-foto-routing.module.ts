import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SacarFotoPage } from './sacar-foto.page';

const routes: Routes = [
  {
    path: '',
    component: SacarFotoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SacarFotoPageRoutingModule {}

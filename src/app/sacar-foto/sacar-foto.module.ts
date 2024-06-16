import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SacarFotoPageRoutingModule } from './sacar-foto-routing.module';

import { SacarFotoPage } from './sacar-foto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SacarFotoPageRoutingModule
  ],
  declarations: [SacarFotoPage]
})
export class SacarFotoPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SacarFoto2PageRoutingModule } from './sacar-foto2-routing.module';

import { SacarFoto2Page } from './sacar-foto2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SacarFoto2PageRoutingModule
  ],
  declarations: [SacarFoto2Page]
})
export class SacarFoto2PageModule {}

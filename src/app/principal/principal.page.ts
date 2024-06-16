import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {
  
  constructor(private afAuth: AuthService,private router: Router) {   
  }
  
  async ngOnInit() {      
  }

  takePicture = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Prompt
    });
  };

  cerrarSesion(){
    this.router.navigate(['/login']);
    this.afAuth.logOut();
  }

  elegirSeccion(beauty:boolean)
  {
    if(beauty)
    {
      this.router.navigate(['/sacar-foto']);
    }
    else{
      this.router.navigate(['/sacar-foto2']);
    }
  }

  verEstadisticas()
  {
    this.router.navigate(['/graficos']);
  }
}

import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { DataService } from '../services/data.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-sacar-foto2',
  templateUrl: './sacar-foto2.page.html',
  styleUrls: ['./sacar-foto2.page.scss'],
})
export class SacarFoto2Page implements OnInit {

  images : any;
  perfiles : any;
  
  async ngOnInit() {
    try {
      const images = await this.data.getImages(false);
      this.images = images;
      this.perfiles = this.obtenerPerfiles()

   } catch (error) {
      console.error(error);
   }


  }
  constructor(private data : DataService, private afAuth: AuthService,private router: Router,public toastController : ToastController) { } 

  takePicture = async () => {
    const image = await Camera.getPhoto({
      quality: 30,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera
    });  
    let userUID = await this.afAuth.getUserUid() || "";
    //console.log(userUID);
    let base64 = image.base64String || "";
    this.data.saveImage(false, base64, userUID);
    const images = await this.data.getImages(false); 
    this.images = images;
    this.perfiles = this.obtenerPerfiles()  
  };  

  takePicture2 = async () => {
    const image = await Camera.getPhoto({
      quality: 30,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Photos
    });  
    let userUID = await this.afAuth.getUserUid() || "";
    //console.log(userUID);
    let base64 = image.base64String || "";
    this.data.saveImage(true, base64, userUID);
    const images = await this.data.getImages(true); 
    this.images = images;
    this.perfiles = this.obtenerPerfiles()  
  };  

  public async obtenerPerfiles() 
  {
    for (const image of this.images) 
    {
      try 
      {
        const userName = await this.data.getUserNameByUID(image['UIDUser']);
        this.perfiles[image['UIDUser']] = userName || 'Usuario no encontrado';
      } 
      catch (error) 
      {
        console.error('Error al obtener el nombre del usuario:', error);
        this.perfiles[image['UIDUser']] = 'Usuario no encontrado';
      }
    }
  }

  async registrarVoto(base64:string)
  {
    let UIDImage = await this.data.getImageIdByImageBase64Value(base64);
    let UIDUser = await this.afAuth.getUserUid() || "";

    if(await this.data.guardarVoto(UIDImage,UIDUser,false))
    {
      this.imprimirToast("¡Voto registrado con éxito!")
    }
    else{
      this.imprimirToast("¡Ya has votado por esa foto anteriormente!")
    }
  } 

  async imprimirToast(mensaje:string)
  {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      position: 'bottom'
    })
    await toast.present();
  }
}


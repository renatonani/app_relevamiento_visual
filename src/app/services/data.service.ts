import { Injectable } from '@angular/core';
import { addDoc, collection, Firestore, getDoc, getDocs, updateDoc, collectionData, doc, query, orderBy, where, QuerySnapshot, DocumentData} from
'@angular/fire/firestore';
import { DateTime } from 'luxon';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private firestore : Firestore) { }

  public async getImages(beauty : boolean) {
    const imageCollection = collection(this.firestore, 'image');
  
    // Crea una consulta que ordena las imágenes por timestamp en orden descendente
    let q = null;
    if(beauty)
    {
      q = query(imageCollection, 
        where('Beauty', '==', true),
        orderBy('timestamp', 'desc')
      );
    }
    else{
       q = query(imageCollection, 
        where('Beauty', '==', false),
        orderBy('timestamp', 'desc')
      );
    }
  
    const querySnapshot = await getDocs(q);
    const images = querySnapshot.docs.map(doc => doc.data());
    return images;
  }  

  public async saveImage(Beauty : boolean, ImageBase64 : string, UIDUser : string) {

    const imageCollection = collection(this.firestore, 'image');

    // Configura la zona horaria para Argentina
    const argentinaTimeZone = 'America/Argentina/Buenos_Aires';

    // Obtiene la hora actual de Argentina
    const currentDateTimeInArgentina = DateTime.now().setZone(argentinaTimeZone);

    // Formatea la hora actual en el formato deseado (por ejemplo, 'yyyy-MM-dd HH:mm:ss')
    const formattedDateTime = currentDateTimeInArgentina.toFormat('yyyy-MM-dd HH:mm:ss');

    const docRef = await addDoc(imageCollection, {
      Beauty,
      ImageBase64,
      UIDUser,
      timestamp: formattedDateTime, // Agrega la fecha y hora actual en Argentina al documento
      votos: 0, // Inicializa el contador de votos en cero
    });

    return docRef.id; // Devuelve el ID del documento recién creado
  }

  public async getUser()
  {
    const imageCollection = collection(this.firestore, 'image');
    const querySnapshot = await getDocs(imageCollection);
    const images = querySnapshot.docs.map(doc => doc.data());
    return images;
  }
  
  public async getUsers()
  {
    const imageCollection = collection(this.firestore, 'user');
    const querySnapshot = await getDocs(imageCollection);
    const images = querySnapshot.docs.map(doc => doc.data());
    console.log(images);
  }

  public async getUserNameByUID(UIDUser: string)
  {
    const userCollection = collection(this.firestore, 'users');
    const userDoc = doc(userCollection, UIDUser);
    const userDocSnapshot = await getDoc(userDoc);
    if (userDocSnapshot.exists()) {
      const userData = userDocSnapshot.data();
      return userData['perfil'];
    } 
    else 
    {
      console.log('Usuario no encontrado');
      return '';
    }
  }

  public async guardarVoto(UIDImage: string, UIDUser: string, beauty: boolean): Promise<boolean> 
  {
    const userCollection = collection(this.firestore, 'users');
    const userDoc = doc(userCollection, UIDUser);
  
    const imageCollection = collection(this.firestore, 'image');
    const userDocSnapshot = await getDoc(userDoc);
    const imageDoc = doc(imageCollection, UIDImage);
    const imageDocSnapshot = await getDoc(imageDoc);
  
    if (userDocSnapshot.exists() && imageDocSnapshot.exists()) {
      const userData = userDocSnapshot.data();
      let previousVotedImageId;
      let previousVotedImageIsBeauty;
  
      if (beauty) {
        previousVotedImageId = userData['VotoBeauty'];
        previousVotedImageIsBeauty = true;
      } else {
        previousVotedImageId = userData['VotoNoBeauty'];
        previousVotedImageIsBeauty = false;
      }
  
      // Verifica si el usuario ya ha votado por la misma imagen previamente
      if (previousVotedImageId === UIDImage) {
        console.log('El usuario ya votó por esta imagen anteriormente.');
        return false;
      }
  
      // Actualiza el registro del usuario con la nueva imagen votada
      if (beauty) {
        await updateDoc(userDoc, {
          VotoBeauty: UIDImage,
        });
      } else {
        await updateDoc(userDoc, {
          VotoNoBeauty: UIDImage,
        });
      }
  
      // Si el usuario había votado previamente, resta 1 voto a esa imagen
      if (previousVotedImageId) {
        const previousImageDoc = doc(imageCollection, previousVotedImageId);
        const previousImageDocSnapshot = await getDoc(previousImageDoc);
        
        if (previousImageDocSnapshot.exists()) {
          const previousImageData = previousImageDocSnapshot.data();
          if (previousVotedImageIsBeauty) {
            await updateDoc(previousImageDoc, {
              votos: previousImageData['votos'] - 1,
            });
          } else {
            await updateDoc(previousImageDoc, {
              votos: previousImageData['votos'] - 1,
            });
          }
        }
      }
  
      // Agrega 1 voto a la nueva imagen elegida
      const imageData = imageDocSnapshot.data();
      await updateDoc(imageDoc, {
        votos: imageData['votos'] + 1,
      });
  
      return true; // Devuelve true si se realizó el voto con éxito
    }
  
    return false; // Devuelve false si no se pudo realizar el voto
  }
    
  public async getImageIdByImageBase64Value(Imagebase64Value: string) 
  {
    const userCollection = collection(this.firestore, 'image');
    const querySnapshot = await getDocs(userCollection);

    let foundId = ''; 

    querySnapshot.forEach((doc) => 
    {
      const userData = doc.data();
         
      if (userData['ImageBase64'] == Imagebase64Value) {
        foundId = doc.id; 
      }
     
    });

    return foundId; 
  }

  public async getImagesGrafico(beauty:boolean) {
    const imageCollection = collection(this.firestore, 'image');

    // Crea una consulta que obtiene las imágenes de tipo "Beauty"
    const q = query(imageCollection, where('Beauty', '==', beauty));

    const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(q);
    
    const imagesWithUsernamesPromises = querySnapshot.docs.map(async (doc) => {
      const data = doc.data();
      const usuario = await this.getUserNameByUID(data['UIDUser']);
      return {
        usuario: usuario,
        votos: data['votos'], // Reemplaza con el campo correcto de votos de tu imagen
      };
    });
  
    // Espera a que todas las promesas se completen
    return Promise.all(imagesWithUsernamesPromises);
  }
}


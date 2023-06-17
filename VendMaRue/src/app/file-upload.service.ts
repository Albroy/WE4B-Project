import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private storage: AngularFireStorage) { }

  uploadImage(file: File): Promise<string> {
    const filePath = `images/${file.name}`;
    const fileRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, file);

    return new Promise<string>((resolve, reject) => {
      uploadTask.snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((downloadURL: string) => {
            resolve(downloadURL);
          }, (error: any) => {
            reject(error);
          });
        })
      ).subscribe();
    });
  }
   getImageUrl(imagePath: string) : string{
    try {
      const ref = this.storage.ref(imagePath);
      const im = ref.getDownloadURL();
      return String(url);
    } catch (error) {
      console.error('Error getting image URL:', error);
      throw error;
    }
  }

}


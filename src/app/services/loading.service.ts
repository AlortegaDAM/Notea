import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor(public lc: LoadingController) {}

  public async startloading() {
    const loading = await this.lc.create({
      cssClass: 'my-custom-class',
      message: '',
      spinner:'bubbles'
    });
    await loading.present();
  }
  public stopLoading(){
    this.lc.dismiss();
  }
}

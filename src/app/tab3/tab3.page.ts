import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { LoadingService } from '../services/loading.service';
import { AlertController, ToastController } from '@ionic/angular';
import { ThemeService } from '../services/theme.service';
import { VibrationService } from '../services/vibration.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page{

 User:any;
 lang:string="en";  
  constructor(private authService:AuthService,private translateS: TranslateService,private router:Router,private vibrationS:VibrationService,private AlertController:AlertController,public toastController:ToastController, private lc:LoadingService, private themeS:ThemeService) {
    this.themeS.tema();
    this.getInfo();
    this.translateS.setDefaultLang('en');
    this.translateS.use('en');
  }


  public async logout(){
    
    await this.authService.logout();
    if(!this.authService.isLogged()){
      this.router.navigate(['/login'])
    }
  }
  ionViewDidEnter() {
    
  this.getInfo();
    
  }
  async getInfo(){
    this.User={
      token:this.authService.user.token,
      name:this.authService.user.name,
      avatar:this.authService.user.avatar
    }
    }

  public async logoutQuestion(){
  let alert=this.AlertController.create(
    {
      message:'¿Seguro que desea cerrar sesión?\n Deberá iniciar sesión nuevamente para tener acceso a las notas',
      buttons:[
        {text:'Cancelar',
        role:'Cancel',
        handler:()=>{}
    },{
      text:'Cerrar sesión',
      handler:()=>{
        this.vibrationS.VibrationRefresh();
        this.presentToast("Cerrando sesión...","");
        this.logout();
      }
    }
      ]});
      (await alert).present();
}
async presentToast(msg:string,col:string) {
  const toast = await this.toastController.create({
    message: msg,
    color:col,
    duration: 2000,
    position:"middle"
  });
  toast.present();
}
cambio(){
  this.themeS.cambio();
}
changeLang(){
  
    if(this.lang=="en"){
      this.translateS.use("en");
    }else if(this.lang=="es"){
      this.translateS.use("es");
    }else if(this.lang=="fr"){
      this.translateS.use("fr");
    }
}
}

import { Component } from '@angular/core';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { Nota } from '../model/nota';
import { EditNotaPage } from '../pages/edit-nota/edit-nota.page';
import { NotasService } from '../services/notas.service';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { LoadingService } from '../services/loading.service';
import { VibrationService } from '../services/vibration.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page{

  public listaNotas = [];
  public listaNotasCriterio = [];


  constructor(private notasS: NotasService,
    private modalController:ModalController,
    private nativeStorage: NativeStorage,
    private authS:AuthService,
    private router:Router,
    private lc:LoadingService,
    public toastController:ToastController,
    private vibrationS:VibrationService,
    private AlertController:AlertController) { }

  public async logout(){
    await this.authS.logout();
    if(!this.authS.isLogged()){
      this.router.navigate(['/login'])
    }
  }

  ngOnInit(){
    this.cargaDatos();
    this.nativeStorage.setItem('myitem', {property: 'value', anotherProperty: 'anotherValue'})
  .then(
    () => console.log('Stored item!'),
    error => console.error('Error storing item', error)
  );
  }
  ionViewWillEnter(){
    this.cargaDatos();
    
  }
  ionViewDidEnter() {
    this.cargaDatos();
  
    
  }
  getNotesS(se:any){
    this.initializeNotes();
    let criterio = se.target.value;

    if(criterio && criterio.trim() != ""){
      this.listaNotasCriterio = this.listaNotasCriterio.filter((nota)=>{
        return (nota.titulo.toLowerCase().indexOf(criterio.toLowerCase()) > -1);
      })
    }
  }
  initializeNotes(){
    this.listaNotasCriterio = this.listaNotas;
  }
  public cargaDatos($event=null){
    try {
      this.notasS.leeNotas()
        .subscribe((info:firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>) => {
          //Ya ha llegado del servidor

          this.listaNotas=[];
          info.forEach((doc)=>{
            let nota={
              id:doc.id,
              ...doc.data()
            }
            this.listaNotas.push(nota);
          });
          this.listaNotasCriterio=this.listaNotas;
          console.log(this.listaNotas);
          if($event){
            $event.target.complete();
          }
        })
    } catch (err) {
      //Error
    }
    
  }
  public async borraNota(id:any){
    let alert=this.AlertController.create(
      {
        message:'¿Seguro que desea borrar la nota?',
        buttons:[
          {text:'No',
          role:'Cancel',
          handler:()=>{
            this.presentToast("La nota no ha sido borrada","danger");
          }
      },{
        text:'Sí',
        handler:()=>{this.notasS.borraNota(id)
          .then(()=>{
            //ya está borrada allí
            this.vibrationS.Vibration();
            this.presentToast("Nota borrada","success")
            let tmp=[];
            this.listaNotas.forEach((nota)=>{     
              if(nota.id!=id){
               tmp.push(nota);
              }
            })
            this.listaNotas=tmp;
            this.listaNotasCriterio=tmp;
          })
          .catch(err=>{
      
          })}
      }
        ]});
        (await alert).present();
 }

  public async editaNota(nota:Nota){
    const modal = await this.modalController.create({
      component: EditNotaPage,
      cssClass: 'my-custom-class',
      componentProps:{
        nota:nota
      }
    });
    return await modal.present();
  }
  async presentToast(msg:string,col:string) {
    const toast = await this.toastController.create({
      message: msg,
      color:col,
      duration: 2000,
      position:"top"
    });
    toast.present();
  }

}

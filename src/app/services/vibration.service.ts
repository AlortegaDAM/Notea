import { Injectable } from '@angular/core';
import { Vibration } from '@ionic-native/vibration/ngx';

@Injectable({
  providedIn: 'root'
})
export class VibrationService {

  constructor(private vibration:Vibration) { }

  public Vibration(){
    this.vibration.vibrate(1500);
  }
  public VibrationRefresh(){
    this.vibration.vibrate([1000,500,1000]);
  }
  public VibrationStop(){
    this.vibration.vibrate(0);
  }
}

import {Component} from '@angular/core';

@Component({
  selector: 'Modal_perfil',
  templateUrl: './Modal_perfil.html',
  styleUrls: ['./Modal_perfil.scss']
})
export class Modal_perfil {

  phone: string = "52 5551852695"
  message: string = "Hola.! Es un gusto poder contactarte."

  ngOnInit() {

  }

  openUrl(url: string) {
    window.open(url, '_blank')
  }
}

import { Component, Input } from '@angular/core';

@Component({
  selector: 'Pokemodal',
  templateUrl: './Pokemodal.html',
  styleUrls: ['./Pokemodal.scss']
})

export class Pokemodal{
  @Input() pokemon:any = []
  @Input() showModal:boolean = false

  ngOnInit(){
  }
}

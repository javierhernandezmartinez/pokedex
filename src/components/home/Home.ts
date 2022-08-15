import {Component} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {Modal_perfil} from "../Modal/Modal_perfil";
import {HttpClient} from "@angular/common/http";
import {PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'Home',
  templateUrl: './Home.html',
  styleUrls: ['./Home.scss']
})
export class Home {
  url:any="https://pokeapi.co/api/v2"
  poke_list:any = []
  poke_selected:any = []
  id_randown:number = 1
  pokedefault:any = []
  inputNamePoke:string = ""
  inputIdPoke:string = ""

  pageIndex:number=0
  pageEvent:any =PageEvent
  list_length:number = 0
  list_full_Pokemons:any = []

   page:any = 0
   count:any = 0
   list:any
   x:any = true

  constructor(
    public dialog: MatDialog,
    private http: HttpClient
  ) {
  }

  ngOnInit(){
    this.getListPokemon()
    //this.getDetailsPokemon(6)
    this.totalPokemon()
  }
  openModal(){
    this.dialog.open(Modal_perfil)
  }
  getListPokemon(limit:number = 20, offset:number = 0){
    this.http.get(`${this.url}/pokemon?limit=${limit}&offset=${offset}`).subscribe(
      (data:any) => {
        console.log("list pokemons:: \n",data)
        let pokelist:any = this.getListDetailsPokemon(data.results)
        pokelist.then((resp:any)=>{
          console.log("RES:", resp.data)
          this.poke_list = resp.data
          this.poke_list.sort(function (a:any, b:any) {
            if (a.id > b.id) {
              return 1;
            }
            if (a.id < b.id) {
              return -1;
            }
            // a must be equal to b
            return 0;
          });
          this.pokeRandowm(1,this.poke_list.length)
          this.list_length =  this.poke_list.length
          this.poke_selected = this.poke_list[0]
        })
      }
    )
  }

  getListDetailsPokemon(pokemon:any = []){
    let list_pokemon:any = []
    return new Promise((resolve, reject) => {
      pokemon.map((item: any, index: number) => {
        this.http.get(`${item.url}`).subscribe(
          (data: any) => {
            this.http.get(`${this.url}/pokemon-species/${data?.id}`).subscribe(
              (res: any) => {
                list_pokemon.push(
                  {
                    id:data?.id,
                    name: item.name,
                    url:item.url,
                    img: data?.sprites?.other?.dream_world?.front_default ? data?.sprites?.other?.dream_world?.front_default : data?.sprites?.other?.home?.front_default,
                    pokemon:data,
                    species:res,
                    descripcion: this.es_descrip(res?.flavor_text_entries)
                  }
                )
                if (pokemon.length == (index + 1)) {
                  resolve({data: list_pokemon})
                }
              }
            )
          }
        )
      })
    })
  }

  selectPokemon(pokemon:any = []){
    this.poke_selected = pokemon
    console.log("Pokeon selected is::", this.poke_selected)
  }

  pokeRandowm(min:number,max:number){
    min = Math.ceil(min);
    max = Math.floor(max);
    this.id_randown = Math.floor(Math.random()* (max - min + 1) + min);
    this.poke_list.map((item:any)=>{
      //console.log(item.pokemon)
      if(item.pokemon.id == this.id_randown){
        this.pokedefault = item
      }
    })
  }

  eventPagina(){
    this.getListPokemon(20,this.pageEvent.pageIndex * 20)
    this.list_length = (this.pageEvent.pageIndex !== 0? this.pageEvent.pageIndex - 1 : 0) * 20 + this.poke_list.length
  }


  totalPokemon(){
    let list:any
    let x = true
      list = this.getTotalPokemon(this.page)
      list.then((item:any)=>{
        let data =  item.data.results
        if(data.length > 0){
          this.page = this.page+1
          this.count = this.count += data.length
          this.list_full_Pokemons.push(data)
          this.totalPokemon()
        }else {
          x = false
        }
        //console.log("coun:", this.count, "page::", this.page, "full:",this.list_full_Pokemons)

      })

  }
  getTotalPokemon(page:number = 0){
   return new Promise((resolve, reject) => {
       this.http.get(`${this.url}/pokemon?limit=${20}&offset=${20*page}`).subscribe(
         (data:any) => {
           resolve({data:data})
         }
       )
   })
  }

  searchPokemon(pokemon:any = ""){
    let search: any = pokemon.value
    if(search.length > 0){
      if(parseInt(search)){
        this.http.get(`${this.url}/pokemon/${search}`).subscribe(
          (data: any) => {
            if(data){
              this.http.get(`${this.url}/pokemon-species/${data?.id}`).subscribe(
                (res: any) => {
                  this.poke_list = [
                    {
                      id:data?.id,
                      name: data.name,
                      url:data.url,
                      img: data?.sprites?.other?.dream_world?.front_default ? data?.sprites?.other?.dream_world?.front_default : data?.sprites?.other?.home?.front_default,
                      pokemon:data,
                      species:res,
                      descripcion: this.es_descrip(res?.flavor_text_entries)
                    }
                  ]
                }
              )
            }else {
              this.poke_list = []
            }
          }
        )
      }else {
        let newlist:any = []
        this.list_full_Pokemons.map((item:any)=>{
            item.map((row:any)=>{
              newlist.push(row)
            })
          }
        )
        let x = newlist.filter((item:any)=> {
          if(item.name.includes(search))
            return item
        })
        x = x.filter((item:any,index:any)=> {
          if(index < 20)
            return item
        })
        console.log("REvisando search", x)

        let a = this.getListDetailsPokemon(x)
        a.then((res:any)=>{
          this.poke_list = []
          let data = res.data
          data.map((item:any, index:any)=>{
            this.poke_list.push(item)
          })
        })
      }
    }else {
      this.getListPokemon()
    }
  }

  es_descrip(array:any = []){
    let des:any = []
      array.map((item:any)=>{
      if(item.language.name === 'es'){
          des.push(item.flavor_text)
      }
    })
    return des[0]
  }

  test(){
    this.http.get(`https://pokeapi.co/api/v2/pokemon-species/35/`).subscribe(
      (data: any) => {
        if(data){
          console.log(data)
        }
      }
    )
  }
}

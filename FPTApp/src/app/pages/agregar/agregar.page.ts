import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListaItem } from 'src/app/models/lista-item.model';
import { Lista } from 'src/app/models/lista.model';
import { DeseosService } from 'src/app/services/deseos.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {
  
  lista:Lista;
  nombreItem:string = '';
  constructor(private deseosSevice:DeseosService,
              private route:ActivatedRoute) { 
    const listaId = this.route.snapshot.paramMap.get('listaId');
    this.lista = this.deseosSevice.obtenerLista(listaId);
  }

  ngOnInit() {
  }
  agregarItem(){
    if(this.nombreItem.length === 0){
      return;
    }
    const nuevoItem = new ListaItem(this.nombreItem);
    this.lista.items.push(nuevoItem);

    this.nombreItem='';
    this.deseosSevice.guardarStorage();
  }
  cambioCheck(item:ListaItem){
    const pendientes = this.lista.items
                          .filter(itemdata => !itemdata.completado)
                          .length;
    if(pendientes === 0){
      this.lista.terminadaEn = new Date();
      this.lista.terminada = true;
    }else{
      this.lista.terminadaEn = null;
      this.lista.terminada = false;
    }

    this.deseosSevice.guardarStorage();
    console.log(this.deseosSevice.listas);
  }
  borrar(i:number){
    this.lista.items.splice(i,1);
    this.deseosSevice.guardarStorage();
  }
}

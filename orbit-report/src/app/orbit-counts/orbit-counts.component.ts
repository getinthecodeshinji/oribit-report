import { Component, OnInit, Input } from '@angular/core';
import { Satellite } from '../satellite';

@Component({
  selector: 'app-orbit-counts',
  templateUrl: './orbit-counts.component.html',
  styleUrls: ['./orbit-counts.component.css']
})
export class OrbitCountsComponent implements OnInit {
  @Input() satellites: Satellite[];
  
  constructor() { }

  ngOnInit() {
  }

  count(type: string){
    let temp =  this.satellites.filter(a => a.type.toLowerCase() === type.toLowerCase());
    return temp.length
  }

  filterTypes(){
    //return an array of types, filter that array for unique values
    return this.satellites.map(a => a.type)
    .filter((value, index, newArray) => newArray.indexOf(value) === index);
  }

}

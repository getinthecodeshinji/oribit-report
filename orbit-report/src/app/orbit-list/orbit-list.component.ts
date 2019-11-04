import { Component, OnInit, Input } from '@angular/core';
import { Satellite } from '../satellite';

@Component({
  selector: 'app-orbit-list',
  templateUrl: './orbit-list.component.html',
  styleUrls: ['./orbit-list.component.css']
})
export class OrbitListComponent implements OnInit {
  @Input() satellites: Satellite[];
  @Input() empty: boolean;
  @Input() search: string;
  constructor() {  }

  ngOnInit() {
  }

  sort(col: string): void{
    this.satellites.sort(function(a, b){
      if(a[col] > b[col]){
        return 1;
      }else if(a[col] < b[col]){
        return -1;
      }

      return 0;
    });
  }

}

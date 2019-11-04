import { Component } from '@angular/core';
import { Satellite } from './satellite';
import { summaryForJitName } from '@angular/compiler/src/aot/util';
import { empty } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'orbit-report';
  sourceList: Satellite[] = [];
  displayList: Satellite[] = [];
  empty: boolean = false;
  searchQuery: string;
  constructor() {
    
    let satellitesUrl = 'https://handlers.education.launchcode.org/static/satellites.json';
 
    window.fetch(satellitesUrl)
    .then(function(response) {
       response.json()
       .then(function(data) {
          let fetchedSatellites = data.satellites;
          for(let i in fetchedSatellites){
            let satellite = new Satellite(fetchedSatellites[i].name, fetchedSatellites[i].type, fetchedSatellites[i].launchDate, fetchedSatellites[i].orbitType, fetchedSatellites[i].operational);
            this.sourceList.push(satellite);
          }

          this.displayList = this.sourceList.slice(0);
        }.bind(this));
    }.bind(this));

    
  }

  search(query: string){
    //for search type
    let dataLabel = (<HTMLInputElement>document.querySelector("input[name='search-type']:checked")).value;

    query = query.toLowerCase();

    let tempArr: Satellite[] = [];

    for(let x = 0; x < this.sourceList.length; x++){
      let value  = this.sourceList[x][dataLabel].toLowerCase();

      if(value.indexOf(query) >= 0){
        tempArr.push(this.sourceList[x]);
      }
    }
    // let radio = document.querySelector("input[name='operational']:checked");
    
    if(tempArr.length === 0) {
      this.empty = true;
      this.searchQuery = query;
    }else{
      this.empty = false;
    }
    // tempArr.push(new Satellite("No Values Found!", "Ain't One", "Nada", "0-0-0000", false));
    // if(op){
    //   //filter array
    // }
    this.displayList = tempArr;

    
  }
  
}

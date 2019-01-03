import { Component, OnInit } from '@angular/core';
import { BeerService } from '../beer.service'
import { Beer } from '../Beer'

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  liste: any[] = [];
  beers:Beer[];
  constructor(private beerService: BeerService) { }

  ngOnInit() {
    this.getBeers();
  }

  getBeers() {
    this.beerService.getBeers()
      .subscribe(data => {
        let cle = Object.keys(data);
        let donnees = Object.values(data);
        for(let i = 0; i < cle.length; i++){
          this.liste.push({key: cle[i], values:donnees[i]});
        }
      });
  }

  beerSubmit = function(beer){
    console.log('Received beer: ' + beer);
    console.log('Beer added : ' + Object.values(beer));
    this.liste.push(beer)
  }

  deleteBeer(key){
    this.beerService.deleteBeer(key).subscribe();
    this.liste = this.liste.filter(liste => liste.key !== key);
  }

}

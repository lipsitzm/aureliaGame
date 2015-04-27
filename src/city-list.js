import {inject} from 'aurelia-framework';
import {CityService} from './cityService';
import {DrugService} from './drugService';

@inject(CityService, DrugService)
export class CityList{
  constructor(cityService, drugService){
    this.CityService = cityService;
    this.idx = 0;
    this.Cities = [];
    this.DrugService = drugService;
    this.Drugs = [];
  }

  created() {
    this.CityService.GetCityList().then(cities => {
      this.Cities = cities;
    });

    this.DrugService.GetDrugList().then(drugList => {
      this.Drugs = drugList;
      this.UpdateDrugs();
    });
  }

  UpdateDrugs() {
    for (let drug of this.Drugs) {
      this.DrugService.GetNewPrice(drug).then(function () {
        // Nothing to do here as the DrugService sets the value on the drug itself
        // This feels like a code smell?
      });

      this.DrugService.GetNewAvailability(this.Cities[this.idx], drug).then(function () {
        // Nothing to do here as the DrugService sets the value on the drug itself
        // This feels like a code smell?
      });
    }
  }

  UpdateCurrentCity(idx) {
    this.idx = idx;
    this.UpdateDrugs();
  }
}

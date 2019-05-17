import { Component, OnInit } from '@angular/core';

import { ApiService } from '../../core/services/api.service';
import { Site } from '../../core/models/site.model';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(
    private apiService: ApiService
  ) { }

  sites: Site[];

  headersTable=[
    {
      name: 'Id',
      key: 'objectId',
      colType: 1,
      align: 'center'
    },
    {
      name: 'Name',
      key: 'name',
      colType: 4,
      align: 'left'
    },
    {
      name: 'Phone',
      key: 'phone',
      colType: 3,
      align: 'right'
    },
    {
      name: 'Email',
      key: 'email',
      colType: 3,
      align: 'left'
    },
    {
      name: 'Country',
      key: 'country',
      isSub: true,
      content: '{0}',
      subKeys: ['className'],
      colType: 2,
      align: 'center'
    },
    {
      name: 'Website',
      key: 'website',
      colType: 2,
      align: 'right'
    },
    {
      name: 'Description',
      key: 'description',
      colType: 6,
      align: 'left'
    },
    {
      name: 'Postal Code',
      key:'postalCode',
      colType: 3,
      align: 'left'
    },
    {
      name: 'Location',
      key: 'location',
      colType: 3,
      align: 'left'
    },
    {
      name: 'Geographic Location',
      key: 'locationGeo',
      isSub: true,
      content: '({0},{1})',
      subKeys: ['latitude','longitude'],
      align: 'center'
    },
  ];

  ngOnInit() {
    this.apiService.get('/classes/Site')
        .subscribe(
          data => {
            console.log('[INFO] Retrieve Site data successfully!',data);
            this.sites = data.results;
            console.log('[INFO] Site: ', this.sites);
          },
          err => {
            console.log('[ERROR] Retrieve Site data', err);
          }
        );

    
  }

  formatString(s: String, arr): String{
    for(let i=0; i<arr.length; i++){
      let reg = new RegExp("\\{"+i+"\\}","gm");
      s = s.replace(reg, arr[i]);
    }
    return s;
  };

  mapSubKeys(obj, key, subKeys){
    let arr = [];
    for(let subKey of subKeys){
      if(obj[key]){
        if(obj[key][subKey]){
          arr.push(obj[key][subKey]);
        }
      }
      
    }
    return arr;
  }

  // formatSitesData(sites){
  //   this.sites = [];
  //   for(let site in sites){
  //     let formattedSite = new Site();
  //     for(let header of this.headersTable){
  //       if(!header.isSub){
  //         formattedSite[header.name] = site[header.]
  //       }
  //     }
  //   }
  // }

}

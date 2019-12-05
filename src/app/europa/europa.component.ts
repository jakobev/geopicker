import { Component, OnInit } from '@angular/core';
import { GeoDataService } from '../geodata.service';
import * as L from 'leaflet';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ScriptService } from '../script.service';

@Component({
  selector: 'app-europa',
  templateUrl: './europa.component.html',
  styleUrls: ['./europa.component.scss']
})
export class EuropaComponent implements OnInit {

  map;
  inputFields: FormGroup;
  newLayer;
  data;
  geoData;
  
    constructor(
      private _formBuilder: FormBuilder,
      private _router: Router,
      private _scriptLoader: ScriptService,
      private _geoService: GeoDataService,
    ) { }
  
    ngOnInit() {
  
     
  
      this.inputFields =  this._formBuilder.group({
        landInput: ['', Validators.required],
        opacity: ['', Validators.required],
        comment: ['', ],
        image: ['', ],
        colorSelect: ['',],
  
      });
  
      
  
      this.map = L.map('map').setView([46.3519918, 53.4225824], 2.94);
      L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>, Presented By <a style="color: #ee7f00" href="https://eves-it.de/">eves_</a>',
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1IjoiamFrb2JldjEiLCJhIjoiY2sxdWxldW9qMDJ2MDNubXF2cjk1dWczcCJ9.Iy29QE_DPIJGFZQ4sOZWQg'
    }).addTo(this.map);
    // Lf.control.browserPrint().addTo(this.map);
  
    this._geoService.getEuropaJson().subscribe(data =>{
      this.geoData = data;
    })
  
    // this.geoData = $.ajax({
    //   url: "/src/assets/geojsonFiles/world.geojson",
    //   dataType: "json",
    //   success: console.log("Daten erfolgreich geldaen", this.geoData),
    //   error: function(error){
    //     alert(error.statusText);
    //   }
    //   });
    
    }
  
    enterFunction(){
  
      console.log("enter function geoData", this.geoData);
  
      var userLandInput = this.inputFields.controls.landInput.value;
      // var color = document.getElementById(color-input);
      // var colors = document.getElementById("colorPick");
      var pickedColor = this.inputFields.controls.colorSelect.value;
      // var landweigth = document.getElementById("weight-input").value;
      var opacity = this.inputFields.controls.opacity.value;
      var comment = this.inputFields.controls.comment.value;
      var image = this.inputFields.controls.image.value;
      console.log(userLandInput, pickedColor, opacity, comment, image);
      var appereance = {
          stroke: false,
          fill: true,
          fillColor: pickedColor,
          fillOpacity: opacity
      }
      var defaultAppereance = {
          stroke: false,
          fill: false,
          fillColor: '#fff',
          fillOpacity: 0
      }
  
  
  
       const newLayer =  L.geoJSON(this.geoData, {
         style:(feature)=>{
           if(feature.properties.admin === userLandInput){
             console.log(userLandInput);
             return appereance;
            }else {
              console.log("deafult");
              return defaultAppereance;
            }
          }
        }).addTo(this.map).bindPopup(`<a>${comment}</a><div><img style="width: 100%" src="${image}"></div>`, {autoClose: false,
          closeButton: true,
          closeOnClick: false,
          className: "popup-behavior",
          autoPan: true,
          maxWidth:150});
          
        
  
      }

}

import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ScriptService } from '../script.service';
import { GeoDataService } from '../geodata.service';
import { HelperService } from '../helper.service';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-germany',
  templateUrl: './germany.component.html',
  styleUrls: ['./germany.component.scss']
})
export class GermanyComponent implements OnInit {


  map;
  inputFields: FormGroup;
  newLayer;
  data;
  geoData;
  newArray = [];
  countriesUsed = [];
 
  
    constructor(
      private _formBuilder: FormBuilder,
      private _router: Router,
      private _scriptLoader: ScriptService,
      private _geoService: GeoDataService,
      private _helperService: HelperService,
    ) { }
  
    ngOnInit() {
  
     console.log("ON init is called");
  
      this.inputFields =  this._formBuilder.group({
        landInputNiedersachsen: ['', Validators.required],
        opacity: ['', Validators.required],
        comment: ['', ],
        image: ['', ],
        colorSelect: ['',],
        landSelect: ['',],
       
      });

      this._geoService.getGermanyJson().subscribe(data => {
        this.geoData = data;
        
          for(var i = 0; i<this.geoData.features.length; i++){
            this.newArray.push(this.geoData.features[i].properties.GEN);
          } 
          this.newArray = this.newArray.filter((element, index, array) => {
            return index === array.indexOf(element);
          })
      });

  
      this.map = L.map('map', {zoomControl:false, attributionControl:false}).setView([51.2601802,10.6803971], 5.5);
    //   L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    //     attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>, Presented By <a style="color: #ee7f00" href="https://eves-it.de/">eves_</a>',
    //     maxZoom: 18,
    //     id: 'mapbox.streets',
    //     accessToken: 'pk.eyJ1IjoiamFrb2JldjEiLCJhIjoiY2sxdWxldW9qMDJ2MDNubXF2cjk1dWczcCJ9.Iy29QE_DPIJGFZQ4sOZWQg'
    // }).addTo(this.map);
    // Lf.control.browserPrint().addTo(this.map);
  
  
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
  
      for(var i =0; i<this.geoData.features.length; i++){
        console.log("properties in loop ", this.geoData.features[i].properties.GEN);
      }
      //console.log("enter function geoData", this.geoData.features);
  
     var userLandInput = this.inputFields.controls.landSelect.value;
      // var color = document.getElementById(color-input);
      // var colors = document.getElementById("colorPick");
      var pickedColor = this.inputFields.controls.colorSelect.value;
      // var landweigth = document.getElementById("weight-input").value;
      var pickedLand = this.inputFields.controls.landSelect.value;
      var opacity = this.inputFields.controls.opacity.value;
      var comment = this.inputFields.controls.comment.value;
      
      var image = this.inputFields.controls.image.value;
      var appereance = {
          stroke: false,
          fill: true,
          fillColor: pickedColor,
          fillOpacity: opacity
      }
      var defaultAppereance = {
          stroke: false,
          fill: false,
          fillColor: '#7d8085',
          fillOpacity: 0
      }
  
  
  
       const newLayer =  L.geoJSON(this.geoData, {
         style:(feature)=>{
           console.log("properties GEN before If", feature.properties.GEN);
           if(feature.properties.GEN === this._helperService.capitalize(userLandInput)){
            const index = this.newArray.indexOf(feature.properties.GEN, 0);
            if (index > -1) {
               this.newArray.splice(index, 1);
            }
             console.log(this.newArray)
             console.log("GEN after If ------->", feature.properties.GEN);
             console.log("User input ----->", userLandInput);
             return appereance;
            }else {
              console.log("deafult");
              return defaultAppereance;
            }
          }
        })
        // .addTo(this.map).bindTooltip(`<a>${comment}</a><div><img style="width: 50px; height: 50px;" src="${image}"></div>`,{
        //   permanent: false,
        //   opacity: opacity,

        // }).openTooltip();



        
        
        
        
        .addTo(this.map).bindPopup(`<a>${comment}</a><div><img style="width: 50px; height: 50px;" src="${image}"></div>`, {autoClose: false,
          closeButton: true,
          closeOnClick: false,
          className: "popup-behavior",
          autoPan: true,
          maxWidth:150});
          
          this.inputFields.reset();
         
         /**
          * function to gray out the other countries after adding prefered to map
          */
         
        }
        grayOutOthers(){

          console.log(this.newArray)

          var defaultAppereance = {
            stroke: false,
            fill: false,
            fillColor: '#fff',
            fillOpacity: 0
        }
        var appereance = {
          stroke: false,
            fill: true,
            fillColor: '#5c5c5c',
            fillOpacity: 0.3
        }

          this.newArray.forEach(element => {
            const newLayer =  L.geoJSON(this.geoData, {
              style:(feature)=>{
                if(feature.properties.GEN === element){

               
                      return appereance;
                    }else{

                      return defaultAppereance;
                    }
                 }
               
                }).addTo(this.map)
           
          });



          
        }

  takeMapScreenshot() {

    // this.map.touchZoom.disable();
    // this.map.doubleClickZoom.disable();
    // this.map.scrollWheelZoom.disable();
    // this.map.boxZoom.disable();
    // this.map.keyboard.disable();
    // $(".leaflet-control-zoom").css("visibility", "hidden");


    let modal = document.getElementById("myModal");

    // Get the image and insert it inside the modal - use its "alt" text as a caption
    let img = document.getElementById("myImg");
    let modalMapContainer: HTMLElement = document.getElementById("img01") as HTMLElement;
    let captionText = document.getElementById("caption");
    let span: HTMLElement = document.getElementsByClassName("close")[0] as HTMLElement;
    console.log("take screenshot");
    // alert("Your maps will be append at the bottom of this page and you´ll have the ability to save them");
    html2canvas(document.querySelector("#map")).then(canvas => {

      if(modalMapContainer.childNodes.length >= 1){

         modalMapContainer.removeChild(modalMapContainer.childNodes[0]);
      }
      console.log(modalMapContainer.childNodes);
      modal.style.display = "block";
      modalMapContainer.appendChild(canvas);
      // modalImg.src = "https://image.winudf.com/v2/image/YXBwc2Rldi5sd3AuYW5pbWVnaXJsd2FsbHBhcGVyc19zY3JlZW5fMF8xNTI5MTM4ODk2XzA3Mw/screen-0.jpg?fakeurl=1&type=.jpg";
      modal.appendChild(modalMapContainer);

      captionText.innerHTML = "Map Image Preview";
      captionText.style.fontSize = "40px"


      // Get the <span> element that closes the modal


      // When the user clicks on <span> (x), close the modal
    });
    span.onclick = function () {
      modal.style.display = "none";
    }
  }
         

}

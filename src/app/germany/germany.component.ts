import { Component, OnInit, ViewChild } from '@angular/core';
import * as L from 'leaflet';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ScriptService } from '../script.service';
import { GeoDataService } from '../geodata.service';
import { HelperService } from '../helper.service';
import html2canvas from 'html2canvas';
import { faCamera} from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-germany',
  templateUrl: './germany.component.html',
  styleUrls: ['./germany.component.scss']
})
export class GermanyComponent implements OnInit {

  @ViewChild('map', {static: false}) mapContainer;

  fac = faCamera;
  map;
  inputFields: FormGroup;
  newLayer;
  data;
  geoData;
  newArray = [];
  countriesUsed = [];
  label;
  image;
  ADE; //test variable for data in json
  GF; //test variable for data in json
  BSG;  //test variable for data in json
  grayOutLayer;
  grayLayer;
  layerArray = [];
  
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
          this.map = L.map('map', {zoomControl:false, attributionControl:false}).setView([51.2601802,10.6803971], 5.5);
          this.initializeDefaultMap();
      });

  
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

    let info;
    info = new L.Control();

    info.onAdd = function(map){
      this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
      this.update();
      return this._div;
    }
    info.update = function (props) {
      this._div.innerHTML = '<h4>Bundesländer</h4>' +  (props ?
          '<b>' + 'ADE: ' + props.ADE + '</b><br />' + 'BSG: ' + props.BSG + '</b><br />' + 'GF: ' + props.GF + ''
          : 'Fahre über ein Bundesland');
  };
  info.addTo(this.map);
  
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
      
      this.image = this.inputFields.controls.image.value;
      var appereance = {
          stroke: true,
          fill: true,
          fillColor: pickedColor,
          fillOpacity: opacity,
          weight: 1,
          color: "#5c5c5c",
          dashArray: '3',
      }
      var defaultAppereance = {
          stroke: false,
          fill: false,
          fillColor: '#7d8085',
          fillOpacity: 0
      }
  
  
  
       const newLayer =  L.geoJSON(this.geoData, {
         style:(feature)=>{
          //  this.label = String(feature.properties.GEN);
           console.log("properties GEN before If", feature.properties.GEN);
           if(feature.properties.GEN === this._helperService.capitalize(userLandInput)){
             this.ADE = feature.properties.ADE;
             this.BSG = feature.properties.BSG;
             this.GF = feature.properties.GF;
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
          },
          onEachFeature:(feature, layer)=> {
            layer.on({
                mouseover: (e) =>{
                  var layer = e.target;
              
                  layer.setStyle({
                      weight: 5,
                      color: '#666',
                      dashArray: '',
                      fillOpacity: 0.7
                  });
              
                  if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
                    layer.bringToFront();
                    console.log("highlighting")
                  }
                  info.update(layer.feature.properties);
              },
                mouseout: (e) =>{
                  newLayer.resetStyle(e.target);
                  info.update();
                },
                //click: zoomToFeature
            });
          }
        })
        // .addTo(this.map)
        // .bindTooltip(this.label, {permanent: true, 
        //   direction: "center",
        //   className: "my-labels"}).openTooltip();



        
        // <div><img style="width: 50px; height: 50px;" src="${image}"></div>
        
        
        .bringToFront().addTo(this.map).bindPopup(`<h1>${userLandInput}</h1><p>ADE: ${this.ADE} (Daten aus Json)</p><p>BSG: ${this.BSG} (Daten aus Json)</p><p>GF: ${this.GF} (Daten aus Json)</p><p>${comment}</p><div style="text-align:center;"><img style="width: 300px; height: 300px;" onerror="this.style.display='none'" src="${this.image}"></div>`, {autoClose: false,
          closeButton: true,
          closeOnClick: false,
          className: "popup-behavior",
          autoPan: true,
          maxWidth:300,
          maxHeight:80
        });
          
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
            stroke: true,
            fill: true,
            fillColor: '#5c5c5c',
            fillOpacity: 0.3,
            weight: 0.7,
            color: '#5c5c5c',
            dashArray: '3'
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

// build corona map double
  addCircleMarkerToMap(){
    console.log("kmgoaemgaoeikm");
    var _1 = L.latLng(52.1834747,10.4800432);
    var _2 = L.latLng(50.8953611,7.0029235);
    var _3 = L.latLng(48.7383989,9.0805205);
    var _4 = L.latLng(48.2323153,11.1871489);
    var _5 = L.latLng(49.4978823,10.6268462);
    var _6 = L.latLng(51.4448957,10.5993804);
    var _7 = L.latLng(52.9795355,11.8792876);
    var _8 = L.latLng(52.9265841,9.4128569);

    var geojsonMarkerOptions = {
      radius: 17,
      fillColor: "#cf1b1b",
      color: "#cf1b1b",
      weight: 1,
      opacity: 1,
      fillOpacity: 0.4
  };

  const boxOptions = `<h1>Hello world</h1><p style="background-color:red; color:white">Infizierte: 3490</p><p style="background-color:green; color:white">Geheilte: 290</p><p style="background-color:black; color:white">Tote: 18</p>`;
  
 const test = L.circleMarker(_1,geojsonMarkerOptions).bindTooltip(boxOptions, {
   sticky: true,
   permanent: false
 }).addTo(this.map);
 test.on('mouseover', function(){
  console.log("hover");
  // alert("4590 INFIZIERTE\n 290 GEHEILT\n 18 TOTE")
 });

var l;
this.makeCircle(l, _7, geojsonMarkerOptions, boxOptions, this.map)
  }

  makeCircle(constVar, latlng, geoOptions, tooltipOptions, map){
    constVar = L.circleMarker(latlng, geoOptions).bindTooltip(tooltipOptions, {
      sticky: true,
      permanent: false
    }).addTo(map);
  }

  hasImage(){
    if(this.image != "" || this.image != null){
      return true
    }else{
      return false
    }
  }
         

  highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
      layer.bringToFront();
      console.log("highlighting")
    }
}
resetHighlight(e) {
  this.geoData.resetStyle(e.target);
}
onEachFeature(feature, layer) {
  layer.on({
      mouseover: this.highlightFeature,
      mouseout: this.resetHighlight,
      //click: zoomToFeature
  });
}

initializeDefaultMap(){
  console.log("initialize default map");
  var defaultAppereance = {
    stroke: false,
    fill: false,
    fillColor: '#fff',
    fillOpacity: 0
}
var appereance = {
    stroke: true,
    fill: false,
    fillColor: '#5c5c5c',
    fillOpacity: 0.3,
    weight: 0.7,
    color: '#5c5c5c',
    dashArray: '3'
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
       
        }).bringToBack().addTo(this.map)
   
  });
}

grayOut() {

  var checkBox:HTMLInputElement = document.getElementById("grayout-checkbox") as HTMLInputElement;
  

  if (checkBox.checked == true){
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
      fillOpacity: 0.3,
      weight: 0.7,
      color: '#5c5c5c',
      dashArray: '3'
  }
  
      this.newArray.forEach((element, index) =>{
        var i = index;
        var ind = "_"+ i
        let grayLayer = L.geoJSON(this.geoData, {
          style:(feature)=>{
            if(feature.properties.GEN === element){
              return appereance
            }else{
              return defaultAppereance
            }
          }
        }).bringToBack().addTo(this.map);
        this.layerArray.push(grayLayer);
      })
      // this.grayOutLayer = L.geoJSON(this.geoData, {
      //   style:(feature)=>{
      //     return appereance
      //   }
      // }).bringToBack().addTo(this.map);
     
    
  } else {
      this.layerArray.forEach(layer =>{

        this.map.removeLayer(layer);
      })
  }
}

}

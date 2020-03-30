import { Component, OnInit, ViewChild } from '@angular/core';
import * as L from 'leaflet';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ScriptService } from '../script.service';
import { GeoDataService } from '../geodata.service';
import { HelperService } from '../helper.service';
import html2canvas from 'html2canvas';
import { faCamera} from '@fortawesome/free-solid-svg-icons';
import { opacity } from 'html2canvas/dist/types/css/property-descriptors/opacity';


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
  info;

  //underneath for testing
  testArray = [];
  
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


        //underneath for testing
        opacityNiedersachsen: [''],
        commentNiedersachsen: [''],
        colorSelectNiedersachsen: [''],
        imageNiedersachsen: [''],

        opacityBayern: [''],
        commentBayern: [''],
        colorSelectBayern: [''],
        imageBayern: [''],

        opacitySaarland: [''],
        commentSaarland: [''],
        colorSelectSaarland: [''],
        imageSaarland: [''],

        opacitySchleswigHolstein: [''],
        commentSchleswigHolstein: [''],
        colorSelectSchleswigHolstein: [''],
        imageSchleswigHolstein: [''],

        opacityMecklenburgVorpommern: [''],
        commentMecklenburgVorpommern: [''],
        colorSelectMecklenburgVorpommern: [''],
        imageMecklenburgVorpommern: [''],

        opacityHamburg: [''],
        commentHamburg: [''],
        colorSelectHamburg: [''],
        imageHamburg: [''],

        opacityBremen: [''],
        commentBremen: [''],
        colorSelectBremen: [''],
        imageBremen: [''],

        opacityBrandenburg: [''],
        commentBrandenburg: [''],
        colorSelectBrandenburg: [''],
        imageBrandenburg: [''],

        opacityBerlin: [''],
        commentBerlin: [''],
        colorSelectBerlin: [''],
        imageBerlin: [''],

        opacityNordrheinWestfalen: [''],
        commentNordrheinWestfalen: [''],
        colorSelectNordrheinWestfalen: [''],
        imageNordrheinWestfalen: [''],

        opacitySachsenAnhalt: [''],
        commentSachsenAnhalt: [''],
        colorSelectSachsenAnhalt: [''],
        imageSachsenAnhalt: [''],

        opacitySachsen: [''],
        commentSachsen: [''],
        colorSelectSachsen: [''],
        imageSachsen: [''],

        opacityHessen: [''],
        commentHessen: [''],
        colorSelectHessen: [''],
        imageHessen: [''],

        opacityThüringen: [''],
        commentThüringen: [''],
        colorSelectThüringen: [''],
        imageThüringen: [''],

        opacityBadenWürttemberg: [''],
        commentBadenWürttemberg: [''],
        colorSelectBadenWürttemberg: [''],
        imageBadenWürttemberg: [''],

        opacityRheinlandPfalz: [''],
        commentRheinlandPfalz: [''],
        colorSelectRheinlandPfalz: [''],
        imageRheinlandPfalz: [''],

       
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
          this.createInfoBox();
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
      this._div.innerHTML = '<div style="padding:5px;background-color:black;color:white;opacity:0.5;border:2px solid orangered; box-shadow: 0 0 15px rgba(0,0,0,0.2); border-radius: 9px;"><h4>Infobox</h4>' +  (props ? '<b>' + props.GEN + '</b><br />' +
          '<p>' + 'ADE: ' + props.ADE + '</p><br />' + '<p>' + 'BSG: ' + props.BSG + '</p><br />' + '<p>' + 'GF: ' + props.GF + '</p></div>'
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
  /**
   * to convert to older version change testArray to
   * newArray delete the trim() function and swap the appereances */ 
  // console.log(this.testArray);
      this.newArray.forEach((element) =>{
        let grayLayer = L.geoJSON(this.geoData, {
          style:(feature)=>{
            if(feature.properties.GEN === element.trim()){
              console.log(element.trim());
              console.log(feature.properties.GEN);
              console.log("return gray out");
              return appereance
            }else{
              console.log(element.trim());
              console.log(feature.properties.GEN);
              console.log("return NO gray out");
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

addShitToMapTestFunction(){
/**
 * test function to rebuild the controls one after
 * another
 */
  var nameNiedersachsen = document.getElementById('Niedersachsen').innerHTML;
  var nameBayern = document.getElementById('Bayern').innerHTML;
  var nameSaarland = document.getElementById('Saarland').innerHTML;
  var nameSchleswigHolstein = document.getElementById('Schleswig-Holstein').innerHTML;
  var nameMeckPom = document.getElementById('Mecklenburg-Vorpommern').innerHTML;
  var nameHamburg = document.getElementById('Hamburg').innerHTML;
  var nameBremen = document.getElementById('Bremen').innerHTML;
  var nameBrandenburg = document.getElementById('Brandenburg').innerHTML;
  var nameBerlin = document.getElementById('Berlin').innerHTML;
  var nameNRW = document.getElementById('Nordrhein-Westfalen').innerHTML;
  var nameSachsenAnhalt = document.getElementById('Sachsen-Anhalt').innerHTML;
  var nameSachsen = document.getElementById('Sachsen').innerHTML;
  var nameHessen = document.getElementById('Hessen').innerHTML;
  var nameThüringen = document.getElementById('Thüringen').innerHTML;
  var nameBadenWürttemberg = document.getElementById('Baden-Württemberg').innerHTML;
  var nameRheinlandPfalz = document.getElementById('Rheinland-Pfalz').innerHTML;
  // var colorNiedersachsen = this.inputFields.controls.colorSelectNiedersachsen.value;
  // var commentNiedersachsen = this.inputFields.controls.commentNiedersachsen.value;
  // var opacityNiedersachsen = this.inputFields.controls.opacityNiedersachsen.value;


  if(this.inputFields.controls.colorSelectNiedersachsen.value){
    this.testArray.push(nameNiedersachsen.trim());
  }
  if(this.inputFields.controls.colorSelectBayern.value){
    this.testArray.push(nameBayern.trim());
  }
  if(this.inputFields.controls.colorSelectSaarland.value){
    this.testArray.push(nameSaarland.trim());
  }
  if(this.inputFields.controls.colorSelectSchleswigHolstein.value){
    this.testArray.push(nameSchleswigHolstein.trim());
  }
  if(this.inputFields.controls.colorSelectMecklenburgVorpommern.value){
    this.testArray.push(nameMeckPom.trim());
  }
  if(this.inputFields.controls.colorSelectHamburg.value){
    this.testArray.push(nameHamburg.trim());
  }
  if(this.inputFields.controls.colorSelectBremen.value){
    this.testArray.push(nameBremen.trim());
  }
  if(this.inputFields.controls.colorSelectBrandenburg.value){
    this.testArray.push(nameBrandenburg.trim());
  }
  if(this.inputFields.controls.colorSelectBerlin.value){
    this.testArray.push(nameBerlin.trim());
  }
  if(this.inputFields.controls.colorSelectNordrheinWestfalen.value){
    this.testArray.push(nameNRW.trim());
  }
  if(this.inputFields.controls.colorSelectSachsenAnhalt.value){
    this.testArray.push(nameSachsenAnhalt.trim());
  }
  if(this.inputFields.controls.colorSelectSachsen.value){
    this.testArray.push(nameSachsen.trim());
  }
  if(this.inputFields.controls.colorSelectHessen.value){
    this.testArray.push(nameHessen.trim());
  }
  if(this.inputFields.controls.colorSelectThüringen.value){
    this.testArray.push(nameThüringen.trim());
  }
  if(this.inputFields.controls.colorSelectBadenWürttemberg.value){
    this.testArray.push(nameBadenWürttemberg.trim());
  }
  if(this.inputFields.controls.colorSelectRheinlandPfalz.value){
    this.testArray.push(nameRheinlandPfalz.trim());
  }
  var bundeslaender;
  bundeslaender = new L.LayerGroup();

  console.log("test Array", this.testArray);

//   var appereance = {
//     stroke: true,
//     fill: true,
//     fillColor: colorNiedersachsen,
//     fillOpacity: opacityNiedersachsen,
//     weight: 1,
//     color: "#5c5c5c",
//     dashArray: '3',
// }
var defaultAppereance = {
    stroke: false,
    fill: false,
    fillColor: '#7d8085',
    fillOpacity: 0
}
this.testArray.forEach(element=>{
  var testLayer = L.geoJSON(this.geoData, {
    style:(feature)=>{
      if(feature.properties.GEN == element.trim()){
        console.log("YES");
        console.log(feature.properties.GEN);
        console.log(name);
        const index = this.newArray.indexOf(feature.properties.GEN, 0);
            if (index > -1) {
               this.newArray.splice(index, 1);
            }
        return {
          stroke: true,
          fill: this.getColorByName(element)?true:false,
          fillColor:this.getColorByName(element),
          fillOpacity: this.getOpacityByName(element),
          weight: 1,
          color: '#5c5c5c',
          dashArray: '3'
        }
      }else{
        console.log("NOPE");
        console.log(feature.properties.GEN);
        console.log(name);
        return defaultAppereance
      }
    },
    onEachFeature:(feature, layer)=> {
      layer.on({
          mouseover: (e) =>{
            var layer = e.target;
        
            layer.setStyle({
                weight: 5,
               
            });
        
            if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
              layer.bringToFront();
              console.log("highlighting")
            }
            this.info.update(layer.feature.properties);
        },
          mouseout: (e) =>{
            var layer = e.target;
            layer.setStyle({
              weight: 0
            });
            this.info.update();
          },
          //click: zoomToFeature   <p>${this.getCommentByName(element)}</p><img style="width:200px;heigth:250px;border:3px solid white;" src="${this.getImageByName(element)}">
      });
    }
  }).bringToFront().addTo(bundeslaender).bindPopup(`<div style="text-align:center;"><h1>${element}</h1><p>${this.getCommentByName(element)}</p><img style="width:200px;heigth:250px;border:3px solid white;" onerror="this.style.display='none'" src="${this.getImageByName(element)}"></div>`);
})

bundeslaender.addTo(this.map);
this.inputFields.reset();

}

getColorByName(name){
  var colorNiedersachsen = this.inputFields.controls.colorSelectNiedersachsen.value;
  var colorBayern = this.inputFields.controls.colorSelectBayern.value;
  var colorSaarland = this.inputFields.controls.colorSelectSaarland.value;
  var colorSchleswig = this.inputFields.controls.colorSelectSchleswigHolstein.value;
  var colorMeckPom = this.inputFields.controls.colorSelectMecklenburgVorpommern.value;
  var colorHamburg = this.inputFields.controls.colorSelectHamburg.value;
  var colorBremen = this.inputFields.controls.colorSelectBremen.value;
  var colorBrandenburg = this.inputFields.controls.colorSelectBrandenburg.value;
  var colorBerlin = this.inputFields.controls.colorSelectBerlin.value;
  var colorNRW = this.inputFields.controls.colorSelectNordrheinWestfalen.value;
  var colorSachsenAnhalt = this.inputFields.controls.colorSelectSachsenAnhalt.value;
  var colorSachsen = this.inputFields.controls.colorSelectSachsen.value;
  var colorHessen = this.inputFields.controls.colorSelectHessen.value;
  var colorThüringen = this.inputFields.controls.colorSelectThüringen.value;
  var colorBaden = this.inputFields.controls.colorSelectBadenWürttemberg.value;
  var colorRheinland = this.inputFields.controls.colorSelectRheinlandPfalz.value;
  return name.trim() == "Niedersachsen"?colorNiedersachsen:
         name.trim() == "Bayern"?colorBayern:
         name.trim() == "Saarland"?colorSaarland:
         name.trim() == "Schleswig-Holstein"?colorSchleswig:
         name.trim() == "Mecklenburg-Vorpommern"?colorMeckPom:
         name.trim() == "Hamburg"?colorHamburg:
         name.trim() == "Bremen"?colorBremen:
         name.trim() == "Brandenburg"?colorBrandenburg:
         name.trim() == "Berlin"?colorBerlin:
         name.trim() == "Nordrhein-Westfalen"?colorNRW:
         name.trim() == "Sachsen-Anhalt"?colorSachsenAnhalt:
         name.trim() == "Sachsen"?colorSachsen:
         name.trim() == "Hessen"?colorHessen:
         name.trim() == "Thüringen"?colorThüringen:
         name.trim() == "Baden-Württemberg"?colorBaden:
         name.trim() == "Rheinland-Pfalz"?colorRheinland:'';
}

//TODO
getOpacityByName(name){
  var opacityNiedersachsen = this.inputFields.controls.opacityNiedersachsen.value;
  var opacityBayern = this.inputFields.controls.opacityBayern.value;
  var opacitySaarland = this.inputFields.controls.opacitySaarland.value;
  var opacitySchleswigHolstein = this.inputFields.controls.opacitySchleswigHolstein.value;
  var opacityMecklenburgVorpommern = this.inputFields.controls.opacityMecklenburgVorpommern.value;
  var opacityHamburg = this.inputFields.controls.opacityHamburg.value;
  var opacityBremen = this.inputFields.controls.opacityBremen.value;
  var opacityBrandenburg = this.inputFields.controls.opacityBrandenburg.value;
  var opacityBerlin = this.inputFields.controls.opacityBerlin.value;
  var opacityNordrheinWestfalen = this.inputFields.controls.opacityNordrheinWestfalen.value;
  var opacitySachsenAnhalt = this.inputFields.controls.opacitySachsenAnhalt.value;
  var opacitySachsen = this.inputFields.controls.opacitySachsen.value;
  var opacityHessen = this.inputFields.controls.opacityHessen.value;
  var opacityThüringen = this.inputFields.controls.opacityThüringen.value;
  var opacityBadenWürttemberg = this.inputFields.controls.opacityBadenWürttemberg.value;
  var opacityRheinlandPfalz = this.inputFields.controls.opacityRheinlandPfalz.value;
  return name.trim() == "Niedersachsen"?opacityNiedersachsen:
         name.trim() == "Bayern"?opacityBayern:
         name.trim() == "Saarland"?opacitySaarland:
         name.trim() == "Schleswig-Holstein"?opacitySchleswigHolstein:
         name.trim() == "Mecklenburg-Vorpommern"?opacityMecklenburgVorpommern:
         name.trim() == "Hamburg"?opacityHamburg:
         name.trim() == "Bremen"?opacityBremen:
         name.trim() == "Brandenburg"?opacityBrandenburg:
         name.trim() == "Berlin"?opacityBerlin:
         name.trim() == "Nordrhein-Westfalen"?opacityNordrheinWestfalen:
         name.trim() == "Sachsen-Anhalt"?opacitySachsenAnhalt:
         name.trim() == "Sachsen"?opacitySachsen:
         name.trim() == "Hessen"?opacityHessen:
         name.trim() == "Thüringen"?opacityThüringen:
         name.trim() == "Baden-Württemberg"?opacityBadenWürttemberg:
         name.trim() == "Rheinland-Pfalz"?opacityRheinlandPfalz:'';
}

//TODO
getImageByName(name){
  var imageNiedersachsen = this.inputFields.controls.imageNiedersachsen.value;
  var imageBayern = this.inputFields.controls.imageBayern.value;
  var imageSaarland = this.inputFields.controls.imageSaarland.value;
  var imageSchleswigHolstein = this.inputFields.controls.imageSchleswigHolstein.value;
  var imageMecklenburgVorpommern = this.inputFields.controls.imageMecklenburgVorpommern.value;
  var imageHamburg = this.inputFields.controls.imageHamburg.value;
  var imageBremen = this.inputFields.controls.imageBremen.value;
  var imageBrandenburg = this.inputFields.controls.imageBrandenburg.value;
  var imageBerlin = this.inputFields.controls.imageBerlin.value;
  var imageNordrheinWestfalen = this.inputFields.controls.imageNordrheinWestfalen.value;
  var imageSachsenAnhalt = this.inputFields.controls.imageSachsenAnhalt.value;
  var imageSachsen = this.inputFields.controls.imageSachsen.value;
  var imageHessen = this.inputFields.controls.imageHessen.value;
  var imageThüringen = this.inputFields.controls.imageThüringen.value;
  var imageBadenWürttemberg = this.inputFields.controls.imageBadenWürttemberg.value;
  var imageRheinlandPfalz = this.inputFields.controls.imageRheinlandPfalz.value;
  return name.trim() == "Niedersachsen"?imageNiedersachsen:
         name.trim() == "Bayern"?imageBayern:
         name.trim() == "Saarland"?imageSaarland:
         name.trim() == "Schleswig-Holstein"?imageSchleswigHolstein:
         name.trim() == "Mecklenburg-Vorpommern"?imageMecklenburgVorpommern:
         name.trim() == "Hamburg"?imageHamburg:
         name.trim() == "Bremen"?imageBremen:
         name.trim() == "Brandenburg"?imageBrandenburg:
         name.trim() == "Berlin"?imageBerlin:
         name.trim() == "Nordrhein-Westfalen"?imageNordrheinWestfalen:
         name.trim() == "Sachsen-Anhalt"?imageSachsenAnhalt:
         name.trim() == "Sachsen"?imageSachsen:
         name.trim() == "Hessen"?imageHessen:
         name.trim() == "Thüringen"?imageThüringen:
         name.trim() == "Baden-Württemberg"?imageBadenWürttemberg:
         name.trim() == "Rheinland-Pfalz"?imageRheinlandPfalz:'';
}

//TODO
getCommentByName(name){
  var commentNiedersachsen = this.inputFields.controls.commentNiedersachsen.value;
  var commentBayern = this.inputFields.controls.commentBayern.value;
  var commentSaarland = this.inputFields.controls.commentSaarland.value;
  var commentSchleswigHolstein = this.inputFields.controls.commentSchleswigHolstein.value;
  var commentMecklenburgVorpommern = this.inputFields.controls.commentMecklenburgVorpommern.value;
  var commentHamburg = this.inputFields.controls.commentHamburg.value;
  var commentBremen = this.inputFields.controls.commentBremen.value;
  var commentBrandenburg = this.inputFields.controls.commentBrandenburg.value;
  var commentBerlin = this.inputFields.controls.commentBerlin.value;
  var commentNordrheinWestfalen = this.inputFields.controls.commentNordrheinWestfalen.value;
  var commentSachsenAnhalt = this.inputFields.controls.commentSachsenAnhalt.value;
  var commentSachsen = this.inputFields.controls.commentSachsen.value;
  var commentHessen = this.inputFields.controls.commentHessen.value;
  var commentThüringen = this.inputFields.controls.commentThüringen.value;
  var commentBadenWürttemberg = this.inputFields.controls.commentBadenWürttemberg.value;
  var commentRheinlandPfalz = this.inputFields.controls.commentRheinlandPfalz.value;
  return name.trim() == "Niedersachsen"?commentNiedersachsen:
         name.trim() == "Bayern"?commentBayern:
         name.trim() == "Saarland"?commentSaarland:
         name.trim() == "Schleswig-Holstein"?commentSchleswigHolstein:
         name.trim() == "Mecklenburg-Vorpommern"?commentMecklenburgVorpommern:
         name.trim() == "Hamburg"?commentHamburg:
         name.trim() == "Bremen"?commentBremen:
         name.trim() == "Brandenburg"?commentBrandenburg:
         name.trim() == "Berlin"?commentBerlin:
         name.trim() == "Nordrhein-Westfalen"?commentNordrheinWestfalen:
         name.trim() == "Sachsen-Anhalt"?commentSachsenAnhalt:
         name.trim() == "Sachsen"?commentSachsen:
         name.trim() == "Hessen"?commentHessen:
         name.trim() == "Thüringen"?commentThüringen:
         name.trim() == "Baden-Württemberg"?commentBadenWürttemberg:
         name.trim() == "Rheinland-Pfalz"?commentRheinlandPfalz:'';
}

createInfoBox(){
  this.info = new L.Control();

    this.info.onAdd = function(map){
      this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
      this.update();
      return this._div;
    }
    this.info.update = function (props) {
      this._div.innerHTML = '<div style="padding:5px;background-color:black;color:white;opacity:0.5;border:2px solid orangered; box-shadow: 0 0 15px rgba(0,0,0,0.2); border-radius: 9px;"><h4>Infobox</h4>' +  (props ? '<b>' + props.GEN + '</b><br />' +
          '<p>' + 'ADE: ' + props.ADE + '</p><br />' + '<p>' + 'BSG: ' + props.BSG + '</p><br />' + '<p>' + 'GF: ' + props.GF + '</p></div>'
          : 'Fahre über ein Bundesland');
  };
  this.info.addTo(this.map);
}

}

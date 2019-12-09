import {Injectable} from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from "rxjs";
import { map, catchError } from 'rxjs/operators';
@Injectable()
export class GeoDataService {



    constructor(
        private http: HttpClient,
    ){}

    public getWorldJson(): Observable<any>{
        console.log("Geodata Service getWorld");
        return this.http.get('http://localhost:5005/api/src/assets/geojsonFiles/world.geojson')
        .pipe(map(data =>{
            return data;
        }),
        catchError(()=> throwError("world.geojson not found")));
    }

    public getEuropaJson(): Observable<any>{
        console.log("Geodata Service getEuropa");
        return this.http.get('http://localhost:5005/api/src/assets/geojsonFiles/european-union-countries.geojson')
        .pipe(map(data =>{
            return data;
        }),
        catchError(()=> throwError("Europa json konnte nicht geladen werden")));
    }

    public getGermanyJson(): Observable<any>{
        console.log("Geodata Service getGermany");
        return this.http.get('http://localhost:5005/api/src/assets/geojsonFiles/bundeslaender.geojson')
        .pipe(map(data =>{
            return data;
        }),
        catchError(()=> throwError("bundeslaender json konnte nicht geladen werden")));
    }
    
} 
import {Injectable} from "@angular/core";

@Injectable()
export class HelperService {

    constructor(){}


    capitalize(input){
        if(typeof input !== 'string' )return '';
        return input.charAt(0).toUpperCase() + input.slice(1);
    }
}
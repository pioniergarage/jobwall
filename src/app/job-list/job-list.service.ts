import { Injectable } from '@angular/core';

@Injectable()
export class JobListService {

  constructor() { }

  getFilterName(eventTargetName:string):string{
    let filterArg="";
    if(eventTargetName == "checkboxWerkstudentenstelle") {filterArg = "werkstudentenstelle";}
    else if(eventTargetName == "checkboxPraktikum") {filterArg = "praktikum";}
    else if(eventTargetName == "checkboxThesis") {filterArg = "thesis";}
    else if(eventTargetName == "checkboxVollzeitstelle") {filterArg = "vollzeitstelle";}
    else if(eventTargetName == "checkboxTeilzeitstelle") {filterArg = "teilzeitstelle";}
    else if(eventTargetName == "checkboxMitgründer") {filterArg = "mitgründer";}
    else { console.error("You use an unknown jobType!!!"); return null;}

    return filterArg;
  }

}

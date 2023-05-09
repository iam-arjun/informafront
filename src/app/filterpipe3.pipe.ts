import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterpipe3'
})
export class Filterpipe3Pipe implements PipeTransform {

  transform(value: any,searchTerm:any): any{
    return value.filter(function(search){
      return search.fullname.toLowerCase().indexOf(searchTerm.toLowerCase())>-1;

    })
  }

}

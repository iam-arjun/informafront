import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterpipe5'
})
export class Filterpipe5Pipe implements PipeTransform {
  transform(value: any, searchTerm: any): any {
    return value.filter(function (search) {
      let sal_month = search._sal_month.indexOf(searchTerm)
      let name = search.fullname.indexOf(searchTerm)
      return sal_month>-1;

    })
  }

}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'myfilter'
})
export class MyfilterPipe implements PipeTransform {

  transform(workersList, searchStr: string): any[] {
    if (workersList.lenght === 0 || searchStr === '') {
      return workersList;
    }
    else {
      let filteredItems = workersList.filter(
        function (item) {
          let str = item.name.toLowerCase() + ' ' + item.surname.toLowerCase() + ' ' + item.phone.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '').replace(/\s+/g, '');
          return str.indexOf(searchStr.toLowerCase()) !== -1;
        });
      return filteredItems;
    }
  }

}

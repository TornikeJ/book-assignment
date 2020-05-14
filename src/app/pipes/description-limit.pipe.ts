import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'descriptionLimit'
})
export class DescriptionLimitPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {

    const limit = 20;

    if (!value) {
      return 'TBD';
    }

    const wordCount = value.split(' ');

    if (wordCount.length > limit) {
      return wordCount.slice(0, limit).join(' ') + '...';
    }

    return value;
  }

}

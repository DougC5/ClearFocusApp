import { Todo } from 'src/app/lists/todo/todo.model';
import { PipeTransform, Pipe } from '@angular/core';

@Pipe({name: 'count'})
export class CountPipe implements PipeTransform {
    transform(value: Todo[], parent ) {

        return value.filter(t => t.parent === parent ).length;
    }

}
import { Component } from '@angular/core';

/**
 * Generated class for the ElasticTextareaComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'elastic-textarea',
  templateUrl: 'elastic-textarea.html'
})
export class ElasticTextareaComponent {

  text: string;

  constructor() {
    console.log('Hello ElasticTextareaComponent Component');
    this.text = 'Hello World';
  }

}

import { Component, Input, OnInit } from '@angular/core';
import { BaseComponent } from '../base-component/base.component';

@Component({
  selector: 'app-message-error',
  templateUrl: './message-error.component.html',
  styleUrls: ['./message-error.component.scss']
})
export class MessageErrorComponent extends BaseComponent implements OnInit {
  @Input() messages?: string[];
  @Input() styleMessage?: string;
  public defaultStyle = 'danger';

  constructor() {
    super();
  }

  ngOnInit(): void {}
}

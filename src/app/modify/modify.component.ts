import { Component, EventEmitter, Input, Output, } from '@angular/core';
import { GameModel } from '../models/Game-model';

@Component({
  selector: 'app-modify',
  standalone: true,
  templateUrl: './modify.component.html',
  styleUrls: ['./modify.component.css']
})
export class ModifyComponent {
  @Input() data: GameModel | undefined = undefined;
  @Output() saved = new EventEmitter<GameModel>();

  getValue(event: any): string {
    return event.target.value;
  }

  save() {
    this.saved.emit(this.data);
  }
}

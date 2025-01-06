import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GameModel } from './models/Game-model';
import { DataService } from '../services/Data.service';
import { ModifyComponent } from './modify/modify.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ModifyComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  games: GameModel[] = [];
  modify: GameModel | undefined = undefined;
  new: GameModel | undefined = undefined;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getGames().subscribe({
      next: (data: GameModel[]) => {
        this.games = data;
      },
      error: (err) => console.log(err)
    });
  }

  newGame() {
    this.new = {
      id: undefined,
      release_date: '',
      name: '',
      game_description: '',
      gametype: ''
    }
  }

  saveNew(gam: GameModel) {
    this.dataService.addGame(gam).subscribe({
      next: (data: GameModel) => {
        this.games.push(data);
        this.new = undefined;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  modifyGame(gam: GameModel) {
    this.modify = JSON.parse(JSON.stringify(gam));
  }

  saveModify(gam: GameModel) {
    this.dataService.modifyGame(gam).subscribe({
      next: (data: GameModel) => {
        const index = this.games.findIndex(g => g.id == data.id);
        this.games[index] = data;
        this.modify = undefined;
      },
      error: (err) => console.log(err)
    });
  }

  delGame(gam: GameModel) {
    this.dataService.deleteGame(gam).subscribe({
      next: (data: GameModel) => {
        const index = this.games.findIndex(g => g.id == data.id);
        this.games.splice(index, 1);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}

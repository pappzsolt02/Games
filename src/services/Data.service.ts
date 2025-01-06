import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GameModel } from '../app/models/Game-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  url = "http://localhost:3000/games"

  constructor(private http: HttpClient) { }

  getGames(): Observable<GameModel[]> {
    return this.http.get<GameModel[]>(this.url);
  }

  addGame(gam: GameModel): Observable<GameModel> {
    return this.http.post<GameModel>(this.url, gam);
  }

  modifyGame(gam: GameModel): Observable<GameModel> {
    return this.http.put<GameModel>(`${this.url}/${gam.id}`, gam);
  }

  deleteGame(gam: GameModel): Observable<GameModel> {
    return this.http.delete<GameModel>(`${this.url}/${gam.id}`);
  }

}

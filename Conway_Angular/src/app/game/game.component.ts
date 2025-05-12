import { Component, OnInit } from '@angular/core';
//import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  rows = 30;
  cols = 30;
  grid: boolean[][] = [];
  generation = 0;
  population = 0;
  interval: any;

  ngOnInit() {
    this.reset();
  }

  reset() {
    this.grid = Array.from({ length: this.rows }, () =>
      Array.from({ length: this.cols }, () => false)
    );
    this.generation = 0;
    this.population = 0;
    clearInterval(this.interval);
    this.interval = null;
  }

  toggleCell(row: number, col: number) {
    this.grid[row][col] = !this.grid[row][col];
    this.updatePopulation();
  }

  updatePopulation() {
    this.population = this.grid.flat().filter(Boolean).length;
  }

  start() {
    if (this.interval) return;
    this.interval = setInterval(() => this.nextGeneration(), 200);
  }

  stop() {
    clearInterval(this.interval);
    this.interval = null;
  }

  nextGeneration() {
    const newGrid = this.grid.map(arr => [...arr]);
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        const alive = this.grid[i][j];
        const neighbors = this.countNeighbors(i, j);
        newGrid[i][j] = alive
          ? neighbors === 2 || neighbors === 3
          : neighbors === 3;
      }
    }
    this.grid = newGrid;
    this.generation++;
    this.updatePopulation();
  }

  countNeighbors(x: number, y: number): number {
    let count = 0;
    for (let dx of [-1, 0, 1]) {
      for (let dy of [-1, 0, 1]) {
        if (dx === 0 && dy === 0) continue;
        const nx = x + dx;
        const ny = y + dy;
        if (
          nx >= 0 &&
          nx < this.rows &&
          ny >= 0 &&
          ny < this.cols &&
          this.grid[nx][ny]
        ) {
          count++;
        }
      }
    }
    return count;
  }
}

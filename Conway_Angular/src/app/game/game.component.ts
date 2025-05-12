import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit, OnDestroy {
  rows = 20;
  cols = 20;
  grid: number[][] = [];
  intervalId: any;
  generation = 0;
  population = 0;
  running = false;

  constructor() { }

  ngOnInit(): void {
    this.initGrid();
  }

  ngOnDestroy(): void {
    this.stopGame();
  }

  initGrid(): void {
    this.grid = Array.from({ length: this.rows }, () =>
      Array.from({ length: this.cols }, () => 0)
    );
    this.generation = 0;
    this.updatePopulation();
  }

  toggleCell(row: number, col: number): void {
    this.grid[row][col] = this.grid[row][col] ? 0 : 1;
    this.updatePopulation();
  }

  startGame(): void {
    if (this.running) return;
    this.running = true;
    this.intervalId = setInterval(() => this.tick(), 200);
  }

  stopGame(): void {
    this.running = false;
    clearInterval(this.intervalId);
  }

  tick(): void {
    const next = this.grid.map(arr => [...arr]);
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        const alive = this.countAliveNeighbors(r, c);
        const current = this.grid[r][c];
        next[r][c] = current === 1
          ? (alive === 2 || alive === 3 ? 1 : 0)
          : (alive === 3 ? 1 : 0);
      }
    }
    this.grid = next;
    this.generation++;
    this.updatePopulation();
  }

  countAliveNeighbors(row: number, col: number): number {
    let count = 0;
    for (let dr = -1; dr <= 1; dr++) {
      for (let dc = -1; dc <= 1; dc++) {
        if (dr === 0 && dc === 0) continue;
        const r = row + dr;
        const c = col + dc;
        if (r >= 0 && r < this.rows && c >= 0 && c < this.cols) {
          count += this.grid[r][c];
        }
      }
    }
    return count;
  }

  updatePopulation(): void {
    this.population = this.grid.flat().reduce((a, b) => a + b, 0);
  }

  reset(): void {
    this.stopGame();
    this.initGrid();
  }
}

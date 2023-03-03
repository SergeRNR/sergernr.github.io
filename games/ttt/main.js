const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

class Renderer {
  constructor(canvasElId) {
    this.canvas = new fabric.Canvas(canvasElId, {
      interactive: false,
      selection: false,
    });
  }

  onCellClick(handler) {
    this.canvas.on('mouse:up', ({ pointer }) => {
      const rowIndex = Math.floor(pointer.y / 100);
      const colIndex = Math.floor(pointer.x / 100);

      handler(rowIndex, colIndex);
    });
  }

  clear() {
    this.canvas.clear();
  }

  createLine(points, lineWidth) {
    return new fabric.Line(points, {
      hoverCursor: 'default',
      selectable: false,
      stroke: '#fff',
      strokeWidth: lineWidth,
    });
  }

  renderGrid() {
    const gridLines = [
      [100, 0, 100, 0],
      [200, 0, 200, 0],
      [0, 100, 0, 100],
      [0, 200, 0, 200],
    ].map((points) => this.createLine(points, 2));

    gridLines.forEach((line) => this.canvas.add(line));
    gridLines.forEach((line) =>
      line.animate(
        {
          x2: line.get('x2') || 300,
          y2: line.get('y2') || 300,
        },
        {
          onChange: this.canvas.renderAll.bind(this.canvas),
          onComplete: () => line.setCoords(),
          duration: 400,
        }
      )
    );
  }

  renderCell({ type, rowIndex, colIndex }) {
    const offsetX = colIndex * 100 + 20;
    const offsetY = rowIndex * 100 + 20;

    if (type) {
      const coordsOffset = 60;

      const crossLines = [
        [offsetX, offsetY, offsetX, offsetY],
        [offsetX + coordsOffset, offsetY, offsetX + coordsOffset, offsetY],
      ].map((points) => this.createLine(points, 1.5));

      crossLines.forEach((line) => this.canvas.add(line));

      crossLines.forEach((line, index) =>
        line.animate(
          {
            x2: index ? offsetX : offsetX + coordsOffset,
            y2: offsetY + coordsOffset,
          },
          {
            onChange: this.canvas.renderAll.bind(this.canvas),
            onComplete: () => line.setCoords(),
            duration: 200,
          }
        )
      );

      return crossLines;
    } else {
      const circle = new fabric.Circle({
        hoverCursor: 'default',
        left: offsetX,
        top: offsetY,
        radius: 30,
        selectable: false,
        strokeWidth: 1.5,
        stroke: '#fff',
      });

      this.canvas.add(circle);

      return [circle];
    }
  }

  renderWinLine(indexFrom, indexTo) {
    let x1 = (indexFrom % 3) * 100;
    let y1 = Math.floor(indexFrom / 3) * 100;
    let x2 = (indexTo % 3) * 100;
    let y2 = Math.floor(indexTo / 3) * 100;

    // N -> S
    if (x1 === x2 && y1 < y2) {
      x1 += 50;
      x2 += 50;
      y2 += 100;
    }
    // W -> E
    if (x1 < x2 && y1 === y2) {
      x2 += 100;
      y1 += 50;
      y2 += 50;
    }
    // NW -> SE
    if (x1 < x2 && y1 < y2) {
      x2 += 100;
      y2 += 100;
    }
    // NE -> SW
    if (x1 > x2 && y1 < y2) {
      x1 += 100;
      y2 += 100;
    }

    const line = this.createLine([x1, y1, x1, y1], 2);

    this.canvas.add(line);

    line.animate(
      { x2, y2 },
      {
        onChange: this.canvas.renderAll.bind(this.canvas),
        onComplete: () => {
          line.setCoords();
          this.canvas
            .getObjects()
            .forEach((o) => o.setOptions({ stroke: '#aaa' }));
          line.setOptions({ stroke: '#fff' });
          this.canvas.renderAll();
        },
        duration: 200,
      }
    );
  }
}

class UI {
  constructor() {
    document.querySelectorAll('[data-bind]').forEach((el) =>
      Object.defineProperty(this, el.dataset.bind, {
        set(value) {
          el.innerText = value;
        },
      })
    );
    document.querySelectorAll('[data-click]').forEach((el) =>
      Object.defineProperty(this, el.dataset.click, {
        set(handler) {
          el.addEventListener('click', handler);
        },
      })
    );
  }
}

class Cell {
  constructor({ type, rowIndex, colIndex }) {
    this.type = type;
    this.rowIndex = rowIndex;
    this.colIndex = colIndex;
  }
}

class Game {
  constructor(renderer, ui) {
    this.renderer = renderer;
    this.renderer.onCellClick(this.onCellClick.bind(this));

    this.ui = ui;
    this.ui.restartGame = this.start.bind(this);

    this.winCount1 = 0;
    this.winCount0 = 0;
    this.drawCount = 0;
  }

  getWin(turn) {
    return winningCombinations.find((combination) =>
      combination.every(
        (index) => this.cells[index] && this.cells[index].type === turn
      )
    );
  }

  gameOver(winner) {
    this.gameIsOver = true;

    // update UI after render animation
    setTimeout(() => {
      if (winner === null) {
        this.drawCount++;
        this.ui.scoreD = this.drawCount;
      } else if (winner) {
        this.winCount1++;
        this.ui.scoreX = this.winCount1;
      } else {
        this.winCount0++;
        this.ui.scoreO = this.winCount0;
      }

      this.ui.message =
        winner === null ? 'Draw!' : `Player ${winner ? 1 : 2} win!`;
    }, 200);
  }

  onCellClick(rowIndex, colIndex) {
    const index = rowIndex * 3 + colIndex;

    if (!this.gameIsOver && !this.cells[index]) {
      const cell = new Cell({ type: this.turn, rowIndex, colIndex });

      this.cells[index] = cell;
      this.renderer.renderCell(cell);

      const winningCombination = this.getWin(this.turn);

      if (winningCombination) {
        this.renderer.renderWinLine(
          winningCombination[0],
          winningCombination[2]
        );
        return this.gameOver(this.turn);
      } else if (this.cells.filter(Boolean).length === 9) {
        return this.gameOver(null);
      }

      this.turn = this.turn ? 0 : 1;
    }
  }

  start() {
    this.renderer.clear();
    this.renderer.renderGrid();
    this.ui.message = '';
    this.cells = new Array(9);
    this.gameIsOver = false;
    // 1 = cross, 0 = nought
    this.turn = 1;
  }
}

const renderer = new Renderer('canvas');
const ui = new UI();
const game = new Game(renderer, ui);

game.start();

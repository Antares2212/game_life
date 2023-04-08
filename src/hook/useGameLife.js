export const useGameLife = () => {
    let grid = []
    let cols = 0
    let rows = 0
    let resolution = 10
    // Создание 2д массива
    const make2DArray = (cols, rows) => {
        let arr = new Array(cols)
  
        for (let i = 0; i < arr.length; i++) {
          arr[i] = new Array(rows)
        }
  
        return arr
    }
    
    // Подсчет соседей
    const countNeighbors = (grid, x, y) => {
        let sum = 0
        for (let i = -1; i < 2; i++) {
            for (let j = -1; j < 2; j++) {
                let col = (x + i + cols) % cols
                let row = (y + j + rows) % rows

                sum += grid[col][row]
            }
        }
        sum -= grid[x][y]
        return sum
    }

    const script = function (p5) {
        // Базовые параметры
        p5.setup = () => {
            let canvas = p5.createCanvas(800, 600)
            canvas.parent("p5Canvas")

            cols = p5.width / resolution
            rows = p5.height / resolution
    
            grid = make2DArray(cols, rows)
            for (let i = 0; i < cols; i++) {
                for (let j = 0; j < rows; j++) {
                grid[i][j] = p5.floor(p5.random() * 2)
                }
            }
        }
        // Заполняем поле жизнью
        p5.draw = () => {
            p5.background(0)
        
            for (let i = 0; i < cols; i++) {
                for (let j = 0; j < rows; j++) {
                    let x = i * resolution
                    let y = j * resolution
                    
                    if (grid[i][j] === 1) {
                        p5.fill(255)
                        p5.stroke(0)
                        p5.rect(x, y, resolution - 1, resolution - 1)
                    }
                }
            }

            // Создаем 2Д массив
            let next = make2DArray(cols, rows)

            for (let i = 0; i < cols; i++) {
                for (let j = 0; j < rows; j++) {
                    let state = grid[i][j]

                    // Счетчич живых соседей
                    let neighbors = countNeighbors(grid, i, j)
                                
                    
                    // Условия появления жизни
                    if (state == 0 && neighbors == 3) {
                        next[i][j] = 1
                    }
                    // Условия отсутствия жизни
                    else if (state == 1 && (neighbors < 2 || neighbors > 3)) {
                        next[i][j] = 0
                    }
                    // Условия продолжения
                    else {
                        next[i][j] = state
                    }
                }
            }
            grid = next
        }
    }

    // Граффическая библеотека
    const P5 = require('p5')
    const App = new P5(script)

    return {
        App
    }
}
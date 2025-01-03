<template>
  <div class="game-container">
    <div class="game-header">
      <h2>数独</h2>
      <div class="game-controls">
        <div class="difficulty-selector">
          <button 
            v-for="level in ['easy', 'medium', 'hard']" 
            :key="level"
            :class="{ active: difficulty === level }"
            @click="changeDifficulty(level)"
          >
            {{ getDifficultyLabel(level) }}
          </button>
        </div>
        <div class="game-status">
          <div class="status-box">
            <span class="icon">⏱️</span>
            <span class="value">{{ formatTime }}</span>
          </div>
          <button class="new-game-btn" @click="startGame">新游戏</button>
        </div>
      </div>
    </div>
    <div class="board-wrapper">
      <div class="sudoku-grid">
        <div v-for="(row, i) in board" :key="i" class="row">
          <div v-for="(cell, j) in row" 
               :key="j" 
               class="cell"
               :class="{
                 'fixed': isFixed[i][j],
                 'selected': selected.row === i && selected.col === j,
                 'error': hasError(i, j),
                 'same-number': isSameNumber(i, j),
                 'same-block': isInSameBlock(i, j)
               }"
               @click="selectCell(i, j)">
            {{ cell || '' }}
          </div>
        </div>
      </div>
      <div class="number-pad">
        <button v-for="n in 9" 
                :key="n"
                :class="{ 'active': isNumberSelected(n) }"
                @click="inputNumber(n)">
          {{ n }}
        </button>
        <button class="clear-btn" @click="clearCell">清除</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onUnmounted, onMounted } from 'vue'

const difficulty = ref('easy')
const board = ref(Array(9).fill().map(() => Array(9).fill(0)))
const isFixed = ref(Array(9).fill().map(() => Array(9).fill(false)))
const selected = ref({ row: -1, col: -1 })
const timer = ref(0)
let timerInterval = null

const difficultyLabels = {
  easy: '简单',
  medium: '中等',
  hard: '困难'
}

const getDifficultyLabel = (level) => difficultyLabels[level]

const formatTime = computed(() => {
  const minutes = Math.floor(timer.value / 60)
  const seconds = timer.value % 60
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
})

const changeDifficulty = (level) => {
  if (timer.value > 0) {
    if (confirm('确定要开始新游戏吗？')) {
      difficulty.value = level
      startGame()
    }
  } else {
    difficulty.value = level
    startGame()
  }
}

const generateSolution = () => {
  // 生成基础数独解决方案
  const solution = Array(9).fill().map(() => Array(9).fill(0))
  
  // 填充对角线上的3个3x3方块
  for (let block = 0; block < 9; block += 3) {
    fillBlock(solution, block, block)
  }
  
  // 填充剩余的格子
  solveSudoku(solution)
  return solution
}

const fillBlock = (grid, row, col) => {
  const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const idx = Math.floor(Math.random() * nums.length)
      grid[row + i][col + j] = nums[idx]
      nums.splice(idx, 1)
    }
  }
}

const solveSudoku = (grid) => {
  const emptyCell = findEmptyCell(grid)
  if (!emptyCell) return true
  
  const [row, col] = emptyCell
  for (let num = 1; num <= 9; num++) {
    if (isValidPlacement(grid, row, col, num)) {
      grid[row][col] = num
      if (solveSudoku(grid)) return true
      grid[row][col] = 0
    }
  }
  return false
}

const findEmptyCell = (grid) => {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (grid[i][j] === 0) return [i, j]
    }
  }
  return null
}

const isValidPlacement = (grid, row, col, num) => {
  // 检查行
  for (let j = 0; j < 9; j++) {
    if (grid[row][j] === num) return false
  }
  
  // 检查列
  for (let i = 0; i < 9; i++) {
    if (grid[i][col] === num) return false
  }
  
  // 检查3x3方块
  const blockRow = Math.floor(row / 3) * 3
  const blockCol = Math.floor(col / 3) * 3
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (grid[blockRow + i][blockCol + j] === num) return false
    }
  }
  
  return true
}

const startGame = () => {
  clearInterval(timerInterval)
  timer.value = 0
  generatePuzzle()
  timerInterval = setInterval(() => {
    timer.value++
  }, 1000)
}

const generatePuzzle = () => {
  // 生成完整的数独解
  const solution = generateSolution()
  // 根据难度移除一些数字
  const emptyCells = {
    easy: 40,
    medium: 50,
    hard: 60
  }
  
  // 复制解决方案到当前板
  board.value = solution.map(row => [...row])
  isFixed.value = board.value.map(row => row.map(cell => cell !== 0))
  
  // 随机移除数字
  let count = emptyCells[difficulty.value]
  while (count > 0) {
    const row = Math.floor(Math.random() * 9)
    const col = Math.floor(Math.random() * 9)
    if (board.value[row][col] !== 0) {
      board.value[row][col] = 0
      isFixed.value[row][col] = false
      count--
    }
  }
}

const selectCell = (row, col) => {
  if (!isFixed.value[row][col]) {
    selected.value = { row, col }
  }
}

const inputNumber = (num) => {
  const { row, col } = selected.value
  if (row === -1 || col === -1 || isFixed.value[row][col]) return
  
  board.value[row][col] = num
}

const clearCell = () => {
  const { row, col } = selected.value
  if (row === -1 || col === -1 || isFixed.value[row][col]) return
  
  board.value[row][col] = 0
}

const hasError = (row, col) => {
  const num = board.value[row][col]
  if (num === 0) return false
  
  // 检查行
  for (let j = 0; j < 9; j++) {
    if (j !== col && board.value[row][j] === num) return true
  }
  
  // 检查列
  for (let i = 0; i < 9; i++) {
    if (i !== row && board.value[i][col] === num) return true
  }
  
  // 检查3x3方格
  const boxRow = Math.floor(row / 3) * 3
  const boxCol = Math.floor(col / 3) * 3
  for (let i = boxRow; i < boxRow + 3; i++) {
    for (let j = boxCol; j < boxCol + 3; j++) {
      if (i !== row && j !== col && board.value[i][j] === num) return true
    }
  }
  
  return false
}

// 检查是否是相同数字
const isSameNumber = (row, col) => {
  if (selected.value.row === -1 || selected.value.col === -1) return false
  const selectedNum = board.value[selected.value.row][selected.value.col]
  return selectedNum !== 0 && board.value[row][col] === selectedNum
}

// 检查是否在同一个3x3块中
const isInSameBlock = (row, col) => {
  if (selected.value.row === -1 || selected.value.col === -1) return false
  const blockRow = Math.floor(row / 3)
  const blockCol = Math.floor(col / 3)
  const selectedBlockRow = Math.floor(selected.value.row / 3)
  const selectedBlockCol = Math.floor(selected.value.col / 3)
  return blockRow === selectedBlockRow && blockCol === selectedBlockCol
}

// 检查数字是否被选中
const isNumberSelected = (num) => {
  if (selected.value.row === -1 || selected.value.col === -1) return false
  return board.value[selected.value.row][selected.value.col] === num
}

// 在组件挂载时自动开始游戏
onMounted(() => {
  startGame()
})

onUnmounted(() => {
  clearInterval(timerInterval)
})
</script>

<style scoped>
.game-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  min-height: calc(100vh - 40px);
  display: flex;
  flex-direction: column;
}

.game-header {
  text-align: center;
  margin-bottom: 30px;
}

.game-header h2 {
  font-size: 2em;
  margin-bottom: 20px;
}

.difficulty-selector {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 20px;
}

.difficulty-selector button {
  padding: 10px 20px;
  font-size: 1em;
  border: none;
  border-radius: 20px;
  background: #fff;
  color: #666;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.difficulty-selector button.active {
  background: #4CAF50;
  color: white;
  transform: scale(1.05);
}

.board-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  flex-grow: 1;
}

.sudoku-grid {
  display: grid;
  grid-template-rows: repeat(9, 1fr);
  gap: 1px;
  background: #333;
  padding: 3px;
  border: 3px solid #333;
}

.row {
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  gap: 1px;
}

/* 3x3块的边框 */
.row:nth-child(3n) {
  border-bottom: 2px solid #333;
}

.row:last-child {
  border-bottom: none;
}

.cell {
  width: 50px;
  height: 50px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5em;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  border-right: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
}

/* 加粗3x3块的右边框 */
.cell:nth-child(3n) {
  border-right: 2px solid #333;
}

.cell:nth-child(9n) {
  border-right: none;
}

/* 加粗3x3块的底部边框 */
.row:nth-child(3n) .cell {
  border-bottom: 2px solid #333;
}

.cell.fixed {
  background: #f5f5f5;
  font-weight: bold;
  color: #333;
}

.cell.selected {
  background: #e3f2fd;
  box-shadow: inset 0 0 0 2px #2196F3;
}

.cell.error {
  color: #f44336;
}

.cell.same-number:not(.selected) {
  background: #e8f5e9;
}

.cell.same-block:not(.selected):not(.same-number) {
  background: #f5f5f5;
}

.number-pad {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
  padding: 20px;
  background: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.number-pad button {
  width: 50px;
  height: 50px;
  font-size: 1.3em;
  border: none;
  border-radius: 8px;
  background: white;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.number-pad button:hover {
  background: #e3f2fd;
  transform: translateY(-2px);
}

.number-pad button.active {
  background: #2196F3;
  color: white;
}

.clear-btn {
  background: #f44336 !important;
  color: white !important;
  grid-column: span 2;
  width: 100% !important;
}

.game-status {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 10px;
}

.status-box {
  background: #fff;
  padding: 10px 20px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.new-game-btn {
  padding: 10px 20px;
  font-size: 1em;
  border: none;
  border-radius: 8px;
  background: #4CAF50;
  color: white;
  cursor: pointer;
  transition: all 0.2s ease;
}

.new-game-btn:hover {
  background: #45a049;
}

@media (max-width: 600px) {
  .cell {
    width: 35px;
    height: 35px;
    font-size: 1.2em;
  }

  .number-pad button {
    width: 40px;
    height: 40px;
  }
}
</style> 
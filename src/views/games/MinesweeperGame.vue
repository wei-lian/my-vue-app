<template>
  <div class="game-container">
    <div class="game-header">
      <h2>扫雷</h2>
      <div class="difficulty-selector">
        <button 
          v-for="(setting, key) in difficultySettings" 
          :key="key"
          :class="{ active: difficulty === key }"
          @click="changeDifficulty(key)"
        >
          {{ getDifficultyLabel(key) }}
        </button>
      </div>
      <div class="game-status">
        <div class="status-box">
          <span class="icon">💣</span>
          <span class="value">{{ remainingMines }}</span>
        </div>
        <button class="restart-btn" @click="startGame">
          {{ getGameFace() }}
        </button>
        <div class="status-box">
          <span class="icon">⏱️</span>
          <span class="value">{{ formatTime }}</span>
        </div>
      </div>
    </div>
    <div class="board-wrapper">
      <div class="minesweeper-board" :style="gridStyle">
        <div v-for="(row, i) in board" :key="i" class="row">
          <div v-for="(cell, j) in row" 
               :key="j"
               class="cell"
               :class="getCellClass(cell)"
               @click="revealCell(i, j)"
               @contextmenu.prevent="flagCell(i, j)">
            {{ getCellContent(cell) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'

const difficulty = ref('easy')
const board = ref([])
const gameStatus = ref('ready') // ready, playing, won, lost
const timer = ref(0)
const remainingMines = ref(0)
let timerInterval = null

const difficultySettings = {
  easy: { rows: 9, cols: 9, mines: 10, label: '初级' },
  medium: { rows: 16, cols: 16, mines: 40, label: '中级' },
  hard: { rows: 30, cols: 30, mines: 99, label: '高级' }
}

const getDifficultyLabel = (key) => {
  const setting = difficultySettings[key]
  return `${setting.label} (${setting.rows}×${setting.cols})`
}

const getGameFace = () => {
  switch (gameStatus.value) {
    case 'won': return '😎'
    case 'lost': return '😵'
    default: return '🙂'
  }
}

// 监听难度变化
watch(difficulty, () => {
  startGame()
})

const changeDifficulty = (newDifficulty) => {
  if (gameStatus.value === 'playing') {
    if (confirm('当前游戏尚未结束，确定要开始新游戏吗？')) {
      difficulty.value = newDifficulty
    }
  } else {
    difficulty.value = newDifficulty
  }
}

const gridStyle = computed(() => {
  const { cols } = difficultySettings[difficulty.value]
  return {
    gridTemplateColumns: `repeat(${cols}, 40px)`
  }
})

const formatTime = computed(() => {
  const minutes = Math.floor(timer.value / 60)
  const seconds = timer.value % 60
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
})

const startGame = () => {
  const { rows, cols, mines } = difficultySettings[difficulty.value]
  board.value = Array(rows).fill().map(() => 
    Array(cols).fill().map(() => ({ 
      isMine: false,
      isRevealed: false,
      isFlagged: false,
      neighborMines: 0
    }))
  )
  
  gameStatus.value = 'ready'
  timer.value = 0
  remainingMines.value = mines
  clearInterval(timerInterval)
}

const placeMines = (firstRow, firstCol) => {
  const { rows, cols, mines } = difficultySettings[difficulty.value]
  let minesToPlace = mines
  
  while (minesToPlace > 0) {
    const row = Math.floor(Math.random() * rows)
    const col = Math.floor(Math.random() * cols)
    
    if (!board.value[row][col].isMine && 
        (row !== firstRow || col !== firstCol)) {
      board.value[row][col].isMine = true
      minesToPlace--
      
      // 更新周围格子的地雷计数
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          const newRow = row + i
          const newCol = col + j
          if (newRow >= 0 && newRow < rows && 
              newCol >= 0 && newCol < cols) {
            board.value[newRow][newCol].neighborMines++
          }
        }
      }
    }
  }
}

const revealCell = (row, col) => {
  const cell = board.value[row][col]
  if (cell.isRevealed || cell.isFlagged) return
  
  if (gameStatus.value === 'ready') {
    gameStatus.value = 'playing'
    placeMines(row, col)
    timerInterval = setInterval(() => {
      timer.value++
    }, 1000)
  }
  
  cell.isRevealed = true
  
  if (cell.isMine) {
    gameOver()
    return
  }
  
  if (cell.neighborMines === 0) {
    revealNeighbors(row, col)
  }
  
  checkWin()
}

const revealNeighbors = (row, col) => {
  const { rows, cols } = difficultySettings[difficulty.value]
  
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      const newRow = row + i
      const newCol = col + j
      if (newRow >= 0 && newRow < rows && 
          newCol >= 0 && newCol < cols) {
        const neighbor = board.value[newRow][newCol]
        if (!neighbor.isRevealed && !neighbor.isFlagged) {
          revealCell(newRow, newCol)
        }
      }
    }
  }
}

const flagCell = (row, col) => {
  if (gameStatus.value !== 'playing') return
  
  const cell = board.value[row][col]
  if (!cell.isRevealed) {
    cell.isFlagged = !cell.isFlagged
    remainingMines.value += cell.isFlagged ? -1 : 1
  }
}

const gameOver = () => {
  gameStatus.value = 'lost'
  clearInterval(timerInterval)
  // 显示所有地雷
  board.value.forEach(row => {
    row.forEach(cell => {
      if (cell.isMine) cell.isRevealed = true
    })
  })
}

const checkWin = () => {
  const allNonMinesRevealed = board.value.every(row =>
    row.every(cell => cell.isMine ? !cell.isRevealed : cell.isRevealed)
  )
  
  if (allNonMinesRevealed) {
    gameStatus.value = 'won'
    clearInterval(timerInterval)
  }
}

const getCellClass = (cell) => ({
  revealed: cell.isRevealed,
  mine: cell.isRevealed && cell.isMine,
  flagged: cell.isFlagged
})

const getCellContent = (cell) => {
  if (cell.isFlagged) return '🚩'
  if (!cell.isRevealed) return ''
  if (cell.isMine) return '💣'
  return cell.neighborMines || ''
}

onMounted(() => {
  startGame()
})

onUnmounted(() => {
  clearInterval(timerInterval)
})
</script>

<style scoped>
.game-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
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
  color: #333;
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

.difficulty-selector button:hover:not(.active) {
  background: #eee;
}

.game-status {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
  margin-bottom: 20px;
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

.status-box .icon {
  font-size: 1.2em;
}

.status-box .value {
  font-size: 1.2em;
  font-weight: bold;
  color: #333;
  min-width: 60px;
}

.restart-btn {
  font-size: 2em;
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
  transition: transform 0.2s ease;
}

.restart-btn:hover {
  transform: scale(1.1);
}

.board-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  margin: 20px 0;
}

.minesweeper-board {
  display: inline-grid;
  gap: 2px;
  background: #999;
  padding: 3px;
  border-radius: 4px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.cell {
  width: 40px;
  height: 40px;
  background: #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  cursor: pointer;
  user-select: none;
  font-size: 1.2em;
  transition: all 0.2s ease;
  border-radius: 0;
  border: 1px solid #bbb;
  box-shadow: inset 1px 1px 2px rgba(255, 255, 255, 0.6),
              inset -1px -1px 2px rgba(0, 0, 0, 0.1);
}

.cell:hover:not(.revealed) {
  background: #d0d0d0;
  box-shadow: inset 1px 1px 3px rgba(0, 0, 0, 0.2);
}

.cell.revealed {
  background: #fff;
  border: 1px solid #ccc;
  box-shadow: none;
}

.cell.mine {
  background: #ff5252;
  border-color: #ff1744;
}

.cell.flagged {
  background: #ffeb3b;
  border-color: #fdd835;
}

.cell.revealed[data-mines="1"] { color: #2196F3; }
.cell.revealed[data-mines="2"] { color: #4CAF50; }
.cell.revealed[data-mines="3"] { color: #FF5722; }
.cell.revealed[data-mines="4"] { color: #673AB7; }
.cell.revealed[data-mines="5"] { color: #795548; }
.cell.revealed[data-mines="6"] { color: #009688; }
.cell.revealed[data-mines="7"] { color: #000000; }
.cell.revealed[data-mines="8"] { color: #757575; }

@media (max-width: 768px) {
  .game-container {
    padding: 10px;
  }

  .cell {
    width: 35px;
    height: 35px;
    font-size: 1em;
  }

  .difficulty-selector {
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }

  .difficulty-selector button {
    width: 100%;
    max-width: 300px;
  }

  .game-status {
    flex-wrap: wrap;
    gap: 15px;
  }

  .status-box {
    padding: 8px 15px;
  }
}

:root.dark .game-container {
  background: #2c2c2c;
}

:root.dark .cell {
  background: #424242;
  border-color: #333;
}

:root.dark .cell.revealed {
  background: #383838;
  border-color: #2c2c2c;
}

:root.dark .status-box {
  background: #383838;
  color: #fff;
}

:root.dark .difficulty-selector button {
  background: #383838;
  color: #fff;
}

:root.dark .difficulty-selector button.active {
  background: #4CAF50;
}
</style> 
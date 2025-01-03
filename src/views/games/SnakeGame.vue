<template>
  <div class="game-container">
    <div class="game-header">
      <h2>贪吃蛇</h2>
      <div class="game-controls">
        <div class="difficulty-selector">
          <button 
            v-for="(setting, level) in difficulties" 
            :key="level"
            :class="{ active: difficulty === level }"
            @click="changeDifficulty(level)"
          >
            {{ getDifficultyLabel(level) }}
          </button>
        </div>
        <div class="game-status">
          <div class="status-box">
            <span class="icon">🏆</span>
            <span class="value">{{ score }}</span>
          </div>
          <button class="control-btn start" @click="toggleGame">
            {{ getControlButtonText() }}
          </button>
          <button class="control-btn pause" 
                  @click="togglePause" 
                  :disabled="!isPlaying || !gameStarted">
            {{ isPaused ? '继续' : '暂停' }}
          </button>
        </div>
      </div>
    </div>
    <div class="board-wrapper">
      <canvas ref="gameCanvas" :width="canvasSize" :height="canvasSize"></canvas>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'

const gameCanvas = ref(null)
const difficulty = ref('easy')
const score = ref(0)
const isPlaying = ref(false)
const isPaused = ref(false)
const gameStarted = ref(false)

let snake = []
let foods = []
const gridSize = 25 // 更小的格子大小
const baseSpeed = 200 // 基础速度保持不变

// 根据难度设置不同的画布大小
const difficulties = {
  easy: { size: 600, label: '简单 20×20' },
  medium: { size: 750, label: '中等 25×25' },
  hard: { size: 900, label: '困难 30×30' }
}

const canvasSize = computed(() => difficulties[difficulty.value].size)

const getDifficultyLabel = (level) => difficulties[level].label

let direction = 'right'
let gameLoop = null

const getControlButtonText = () => {
  if (!gameStarted.value) return '开始游戏'
  if (!isPlaying.value) return '重新开始'
  return '游戏中'
}

const toggleGame = () => {
  if (isPlaying.value) return
  startGame()
}

const togglePause = () => {
  if (!isPlaying.value || !gameStarted.value) return
  
  isPaused.value = !isPaused.value
  if (isPaused.value) {
    clearInterval(gameLoop)
    // 绘制暂停提示
    const ctx = gameCanvas.value.getContext('2d')
    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)'
    ctx.fillRect(0, 0, canvasSize.value, canvasSize.value)
    ctx.fillStyle = 'white'
    ctx.font = '30px Arial'
    ctx.textAlign = 'center'
    ctx.fillText('已暂停', canvasSize.value / 2, canvasSize.value / 2)
  } else {
    gameLoop = setInterval(update, baseSpeed)
  }
}

const startGame = () => {
  isPlaying.value = true
  gameStarted.value = true
  isPaused.value = false
  score.value = 0
  
  // 初始化蛇的位置（从中心开始）
  const centerPos = Math.floor(canvasSize.value / gridSize / 2)
  snake = [
    { x: centerPos, y: centerPos },
    { x: centerPos - 1, y: centerPos },
    { x: centerPos - 2, y: centerPos }
  ]
  
  direction = 'right'
  generateFoods()
  
  if (gameLoop) clearInterval(gameLoop)
  gameLoop = setInterval(update, baseSpeed)
  drawGame()
}

const generateFoods = () => {
  foods = []
  const foodCount = Math.floor(Math.random() * 3) + 3 // 生成3-5个食物
  while (foods.length < foodCount) {
    const food = {
      x: Math.floor(Math.random() * (canvasSize.value / gridSize)),
      y: Math.floor(Math.random() * (canvasSize.value / gridSize))
    }
    // 确保食物不会生成在蛇身上
    if (!snake.some(segment => segment.x === food.x && segment.y === food.y)) {
      foods.push(food)
    }
  }
}

const changeDifficulty = (level) => {
  if (isPlaying.value) {
    if (confirm('当前游戏尚未结束，确定要切换难度吗？')) {
      difficulty.value = level
      startGame()
    }
  } else {
    difficulty.value = level
  }
}

const update = () => {
  const head = { ...snake[0] }

  switch (direction) {
    case 'up': head.y--; break
    case 'down': head.y++; break
    case 'left': head.x--; break
    case 'right': head.x++; break
  }

  // 检查碰撞
  if (checkCollision(head)) {
    gameOver()
    return
  }

  snake.unshift(head)

  // 检查是否吃到食物
  const foodIndex = foods.findIndex(food => food.x === head.x && food.y === head.y)
  if (foodIndex !== -1) {
    score.value += 10
    foods.splice(foodIndex, 1)
    if (foods.length === 0) {
      generateFoods()
    }
  } else {
    snake.pop()
  }

  drawGame()
}

const checkCollision = (head) => {
  // 检查墙壁碰撞
  if (head.x < 0 || head.x >= canvasSize.value / gridSize ||
      head.y < 0 || head.y >= canvasSize.value / gridSize) {
    return true
  }

  // 检查自身碰撞
  return snake.some(segment => segment.x === head.x && segment.y === head.y)
}

const gameOver = () => {
  isPlaying.value = false
  gameStarted.value = false
  clearInterval(gameLoop)
  const ctx = gameCanvas.value.getContext('2d')
  ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'
  ctx.fillRect(0, 0, canvasSize.value, canvasSize.value)
  ctx.fillStyle = 'white'
  ctx.font = '30px Arial'
  ctx.textAlign = 'center'
  ctx.fillText('游戏结束!', canvasSize.value / 2, canvasSize.value / 2)
  ctx.fillText(`得分: ${score.value}`, canvasSize.value / 2, canvasSize.value / 2 + 40)
}

const drawGame = () => {
  const ctx = gameCanvas.value.getContext('2d')
  ctx.clearRect(0, 0, canvasSize.value, canvasSize.value)

  // 绘制网格背景
  ctx.fillStyle = '#f5f5f5'
  ctx.fillRect(0, 0, canvasSize.value, canvasSize.value)
  
  // 绘制网格线
  ctx.strokeStyle = '#e0e0e0'
  ctx.lineWidth = 1
  for (let i = 0; i <= canvasSize.value; i += gridSize) {
    ctx.beginPath()
    ctx.moveTo(i, 0)
    ctx.lineTo(i, canvasSize.value)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(0, i)
    ctx.lineTo(canvasSize.value, i)
    ctx.stroke()
  }

  // 绘制蛇
  snake.forEach((segment, index) => {
    const x = segment.x * gridSize
    const y = segment.y * gridSize
    
    // 蛇身渐变色
    const hue = (120 + index * 2) % 360
    ctx.fillStyle = `hsl(${hue}, 70%, 50%)`
    
    // 绘制圆形蛇身
    ctx.beginPath()
    ctx.arc(x + gridSize/2, y + gridSize/2, gridSize/2 - 2, 0, Math.PI * 2)
    ctx.fill()
    
    // 如果是蛇头，添加眼睛
    if (index === 0) {
      ctx.fillStyle = 'white'
      const eyeSize = gridSize/6
      // 根据方向调整眼睛位置
      let eyeX1, eyeY1, eyeX2, eyeY2
      switch(direction) {
        case 'right':
          eyeX1 = eyeX2 = x + gridSize * 0.75
          eyeY1 = y + gridSize * 0.3
          eyeY2 = y + gridSize * 0.7
          break
        case 'left':
          eyeX1 = eyeX2 = x + gridSize * 0.25
          eyeY1 = y + gridSize * 0.3
          eyeY2 = y + gridSize * 0.7
          break
        case 'up':
          eyeX1 = x + gridSize * 0.3
          eyeX2 = x + gridSize * 0.7
          eyeY1 = eyeY2 = y + gridSize * 0.25
          break
        case 'down':
          eyeX1 = x + gridSize * 0.3
          eyeX2 = x + gridSize * 0.7
          eyeY1 = eyeY2 = y + gridSize * 0.75
          break
      }
      ctx.beginPath()
      ctx.arc(eyeX1, eyeY1, eyeSize, 0, Math.PI * 2)
      ctx.arc(eyeX2, eyeY2, eyeSize, 0, Math.PI * 2)
      ctx.fill()
    }
  })

  // 绘制食物
  foods.forEach(food => {
    const x = food.x * gridSize
    const y = food.y * gridSize
    
    // 绘制苹果形状
    ctx.fillStyle = '#ff5252'
    ctx.beginPath()
    ctx.arc(x + gridSize/2, y + gridSize/2, gridSize/2 - 2, 0, Math.PI * 2)
    ctx.fill()
    
    // 添加苹果叶子
    ctx.fillStyle = '#4CAF50'
    ctx.beginPath()
    ctx.ellipse(x + gridSize/2, y + gridSize/4, gridSize/6, gridSize/8, Math.PI/4, 0, Math.PI * 2)
    ctx.fill()
  })
}

const handleKeyPress = (e) => {
  if (!isPlaying.value) return

  switch (e.key) {
    case 'ArrowUp':
      if (direction !== 'down') direction = 'up'
      break
    case 'ArrowDown':
      if (direction !== 'up') direction = 'down'
      break
    case 'ArrowLeft':
      if (direction !== 'right') direction = 'left'
      break
    case 'ArrowRight':
      if (direction !== 'left') direction = 'right'
      break
  }
}

// 阻止方向键滚动页面
const preventDefault = (e) => {
  if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
    e.preventDefault()
  }
}

onMounted(() => {
  window.addEventListener('keydown', preventDefault)
  window.addEventListener('keydown', handleKeyPress)
  // 不再自动开始游戏
  drawGame()
})

onUnmounted(() => {
  window.removeEventListener('keydown', preventDefault)
  window.removeEventListener('keydown', handleKeyPress)
  if (gameLoop) clearInterval(gameLoop)
})
</script>

<style scoped>
.game-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px;
  min-height: calc(100vh - 80px);
  display: flex;
  flex-direction: column;
  background: #f8f9fa;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
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
  padding: 12px 24px;
  font-size: 1.1em;
  border: none;
  border-radius: 25px;
  background: white;
  color: #666;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.difficulty-selector button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
}

.difficulty-selector button.active {
  background: #4CAF50;
  color: white;
  transform: scale(1.05);
}

.board-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  margin: 20px 0;
  padding: 20px;
  background: white;
  border-radius: 12px;
  box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.05);
}

canvas {
  border: 4px solid #333;
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease;
}

canvas:hover {
  transform: scale(1.01);
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

.status-box .value {
  font-size: 1.2em;
  font-weight: bold;
  min-width: 40px;
}

.control-btn {
  padding: 12px 30px;
  font-size: 1.1em;
  border: none;
  border-radius: 25px;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 120px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.control-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
}

.control-btn.start {
  background: #4CAF50;
}

.control-btn.start:hover:not(:disabled) {
  background: #45a049;
}

.control-btn.pause {
  background: #2196F3;
}

.control-btn.pause:hover:not(:disabled) {
  background: #1976D2;
}

.control-btn:disabled {
  background: #cccccc;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  canvas {
    width: 100%;
    height: auto;
  }
  
  .difficulty-selector {
    flex-direction: column;
    align-items: center;
  }
  
  .difficulty-selector button {
    width: 100%;
    max-width: 300px;
  }
}

/* 深色模式支持 */
:root.dark .game-container {
  background: #1a1a1a;
}

:root.dark .board-wrapper {
  background: #2c2c2c;
}

:root.dark .difficulty-selector button {
  background: #383838;
  color: #fff;
}

:root.dark .status-box {
  background: #383838;
  color: #fff;
}
</style> 
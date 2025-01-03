<template>
  <div class="games-container">
    <h1 class="page-title">游戏中心</h1>
    <div class="games-grid">
      <router-link to="/games/snake" class="game-card">
        <div class="game-icon">🐍</div>
        <div class="game-content">
          <h2>贪吃蛇</h2>
          <p>经典的贪吃蛇游戏，通过方向键控制蛇的移动，吃到食物变得更长。支持多难度和暂停功能。</p>
          <div class="game-features">
            <span>3种难度</span>
            <span>多个食物</span>
            <span>即时得分</span>
          </div>
        </div>
        <div class="play-button">开始游戏</div>
      </router-link>

      <router-link to="/games/sudoku" class="game-card">
        <div class="game-icon">🔢</div>
        <div class="game-content">
          <h2>数独</h2>
          <p>经典的数字益智游戏，在9×9的格子中填入1-9的数字，考验你的逻辑思维能力。</p>
          <div class="game-features">
            <span>3种难度</span>
            <span>计时功能</span>
            <span>错误提示</span>
          </div>
        </div>
        <div class="play-button">开始游戏</div>
      </router-link>

      <router-link to="/games/minesweeper" class="game-card">
        <div class="game-icon">💣</div>
        <div class="game-content">
          <h2>扫雷</h2>
          <p>经典的扫雷游戏，通过逻辑推理找出所有地雷的位置。支持多种难度级别。</p>
          <div class="game-features">
            <span>3种难度</span>
            <span>计时功能</span>
            <span>旗子标记</span>
          </div>
        </div>
        <div class="play-button">开始游戏</div>
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.games-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
}

.page-title {
  text-align: center;
  font-size: 2.5em;
  margin-bottom: 50px;
  color: #333;
  position: relative;
}

.page-title::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 4px;
  background: #4CAF50;
  border-radius: 2px;
}

.games-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  padding: 20px;
}

.game-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  text-decoration: none;
  color: inherit;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 400px;
}

.game-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
}

.game-icon {
  font-size: 4em;
  padding: 30px;
  text-align: center;
  background: #f8f9fa;
  transition: all 0.3s ease;
}

.game-card:hover .game-icon {
  transform: scale(1.1);
}

.game-content {
  padding: 20px;
  flex-grow: 1;
}

.game-content h2 {
  font-size: 1.8em;
  margin-bottom: 15px;
  color: #333;
}

.game-content p {
  color: #666;
  line-height: 1.6;
  margin-bottom: 20px;
}

.game-features {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 20px;
}

.game-features span {
  background: #e8f5e9;
  color: #2e7d32;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.9em;
}

.play-button {
  background: #4CAF50;
  color: white;
  text-align: center;
  padding: 15px;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

.game-card:hover .play-button {
  background: #45a049;
}

/* 深色模式支持 */
:root.dark .page-title {
  color: #fff;
}

:root.dark .game-card {
  background: #2c2c2c;
}

:root.dark .game-icon {
  background: #1a1a1a;
}

:root.dark .game-content h2 {
  color: #fff;
}

:root.dark .game-content p {
  color: #bbb;
}

:root.dark .game-features span {
  background: #1b5e20;
  color: #a5d6a7;
}

@media (max-width: 768px) {
  .games-grid {
    grid-template-columns: 1fr;
  }
  
  .game-card {
    min-height: 350px;
  }
}
</style> 
<template>
  <div class="app" :class="{ 'dark-mode': isDark }">
    <el-container>
      <el-header>
        <el-menu
          :router="true"
          mode="horizontal"
          :ellipsis="false"
          class="nav-menu"
        >
          <el-menu-item index="/">首页</el-menu-item>
          <el-menu-item index="/articles">文章列表</el-menu-item>
          <el-menu-item index="/about">个人信息</el-menu-item>
          <el-menu-item index="/dashboard">数据大屏</el-menu-item>
          <el-menu-item index="/games">游戏中心</el-menu-item>
          <div class="flex-grow" />
          <el-menu-item>
            <el-switch
              v-model="isDark"
              inline-prompt
              active-text="🌙"
              inactive-text="☀️"
              @change="toggleDark"
            />
          </el-menu-item>
        </el-menu>
      </el-header>
      <el-main>
        <router-view v-slot="{ Component }">
          <keep-alive>
            <component :is="Component" />
          </keep-alive>
        </router-view>
      </el-main>
      <el-footer>
        <p>© 2024 我的个人博客. All rights reserved.</p>
      </el-footer>
    </el-container>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isDark = ref(false)

const toggleDark = (val) => {
  document.documentElement.className = val ? 'dark' : ''
}
</script>

<style>
.app {
  min-height: 100vh;
  background-color: #fff;
  color: #333;
  transition: all 0.3s;
}

.app.dark-mode {
  background-color: #1a1a1a;
  color: #fff;
}

.dark-mode .el-menu {
  background-color: #2c2c2c;
  border-color: #3f3f3f;
}

.dark-mode .el-menu-item {
  color: #fff !important;
}

.dark-mode .el-sub-menu__title {
  color: #fff !important;
}

.el-container {
  min-height: 100vh;
}

.el-header {
  padding: 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);
}

.nav-menu {
  height: 60px;
  padding: 0 20px;
}

.flex-grow {
  flex-grow: 1;
}

.el-footer {
  text-align: center;
  color: #666;
  padding: 20px 0;
}

.el-main {
  padding: 20px;
}

/* 深色模式下的其他元素样式 */
.dark-mode .el-footer {
  color: #999;
}

.dark-mode .el-main {
  background-color: #1a1a1a;
}

.games-menu {
  position: relative;
}

.games-dropdown {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 10px;
  min-width: 250px;
  z-index: 1000;
}

.games-menu:hover .games-dropdown {
  display: block;
}

.game-item {
  display: flex;
  align-items: center;
  padding: 15px;
  text-decoration: none;
  color: #333;
  border-radius: 6px;
  transition: all 0.3s ease;
}

.game-item:hover {
  background: #f5f5f5;
  transform: translateX(5px);
}

.game-item .icon {
  font-size: 24px;
  margin-right: 15px;
}

.game-info h3 {
  margin: 0;
  font-size: 16px;
}

.game-info p {
  margin: 5px 0 0;
  font-size: 12px;
  color: #666;
}

.dark-mode .games-dropdown {
  background: #2c2c2c;
}

.dark-mode .game-item {
  color: #fff;
}

.dark-mode .game-item:hover {
  background: #383838;
}

.dark-mode .game-info p {
  color: #999;
}
</style>

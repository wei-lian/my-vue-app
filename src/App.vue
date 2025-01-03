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
          <el-menu-item index="/">
            <el-icon><HomeFilled /></el-icon>首页
          </el-menu-item>
          <el-menu-item index="/articles">
            <el-icon><Document /></el-icon>文章列表
          </el-menu-item>
          <el-menu-item index="/about">
            <el-icon><User /></el-icon>个人信息
          </el-menu-item>
          <el-menu-item index="/dashboard">
            <el-icon><DataLine /></el-icon>数据大屏
          </el-menu-item>
          <div class="flex-grow" />
          <el-menu-item>
            <el-switch
              v-model="isDark"
              inline-prompt
              :active-icon="Moon"
              :inactive-icon="Sunny"
              @change="toggleDark"
            />
          </el-menu-item>
        </el-menu>
      </el-header>
      <el-main>
        <router-view />
      </el-main>
      <el-footer>
        <p>© 2024 我的个人博客. All rights reserved.</p>
      </el-footer>
    </el-container>
  </div>
</template>

<script setup>
import { Moon, Sunny, DataLine } from '@element-plus/icons-vue'

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

.dark-mode .el-card {
  background-color: #2c2c2c;
  border-color: #3f3f3f;
  color: #fff;
}

.dark-mode .el-menu {
  background-color: #2c2c2c;
  border-color: #3f3f3f;
}

.dark-mode .el-menu-item {
  color: #fff;
}

.dark-mode .el-menu-item.is-active {
  color: #409EFF;
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
  /* max-width: 1200px; */
  /* margin: 0 auto; */
  padding: 20px;
}
</style>

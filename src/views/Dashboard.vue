<template>
  <div class="dashboard">
    <!-- 头部区域 -->
    <header class="dashboard-header">
      <h1>数据大屏</h1>
      <div class="header-right">
        <span class="time">{{ currentTime }}</span>
      </div>
    </header>

    <!-- 内容区域 -->
    <main class="dashboard-content">
      <!-- 左侧面板 -->
      <section class="panel left-panel">
        <el-card class="panel-card">
          <template #header>
            <div class="card-header">
              <span>访问来源分析</span>
            </div>
          </template>
          <div class="chart-container">
            <pie-chart />
          </div>
        </el-card>
      </section>

      <!-- 中间面板 -->
      <section class="panel center-panel">
        <el-card class="panel-card">
          <template #header>
            <div class="card-header">
              <span>销售额统计</span>
            </div>
          </template>
          <div class="chart-container">
            <bar-chart />
          </div>
        </el-card>
      </section>

      <!-- 右侧面板 -->
      <section class="panel right-panel">
        <el-card class="panel-card">
          <template #header>
            <div class="card-header">
              <span>增长趋势分析</span>
            </div>
          </template>
          <div class="chart-container">
            <line-chart />
          </div>
        </el-card>
      </section>
    </main>
  </div>
</template>

<script setup>
import PieChart from '@/components/charts/PieChart.vue'
import BarChart from '../components/charts/BarChart.vue'
import LineChart from '../components/charts/LineChart.vue'

const currentTime = ref(new Date().toLocaleString())

onMounted(() => {
  setInterval(() => {
    currentTime.value = new Date().toLocaleString()
  }, 1000)
})
</script>

<style scoped>
.dashboard {
  width: 100%;
  height: 100vh;
  background-color: #0f1c3c;
  color: #fff;
  overflow: hidden;
}

.dashboard-header {
  height: 80px;
  padding: 0 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.2);
}

.header-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.time {
  font-size: 14px;
  color: #fff;
}

.dashboard-content {
  height: calc(100% - 80px);
  padding: 16px;
  display: flex;
  gap: 16px;
}

.panel {
  height: 100%;
}

.left-panel {
  flex: 1;
}

.center-panel {
  flex: 1.5;
}

.right-panel {
  flex: 1;
}

.panel-card {
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3) !important;
  border: none;
}

.panel-card :deep(.el-card__header) {
  padding: 12px 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
}

.chart-container {
  height: calc(100% - 50px);
  padding: 16px;
}

/* 暗黑模式适配 */
:deep(.el-card) {
  --el-card-bg-color: transparent;
  --el-card-border-color: rgba(255, 255, 255, 0.1);
}
</style> 
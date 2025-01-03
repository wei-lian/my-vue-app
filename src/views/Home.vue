<template>
  <div class="home">
    <el-row :gutter="20">
      <el-col :span="16">
        <el-card class="welcome-card">
          <template #header>
            <div class="card-header">
              <h2>欢迎来到我的博客</h2>
            </div>
          </template>
          <div class="welcome-content">
            <el-image
              src="https://placeholder.co/400x200"
              fit="cover"
              class="welcome-image"
            />
            <p class="welcome-text">
              这里是我分享技术见解、学习心得和生活感悟的地方。
            </p>
          </div>
        </el-card>

        <h3 class="section-title">最新文章</h3>
        <el-timeline>
          <el-timeline-item
            v-for="article in latestArticles"
            :key="article.id"
            :timestamp="article.date"
            placement="top"
          >
            <el-card>
              <h4>
                <router-link :to="`/article/${article.id}`">
                  {{ article.title }}
                </router-link>
              </h4>
              <p>{{ article.summary }}</p>
              <div class="article-meta">
                <el-tag size="small">{{ article.category }}</el-tag>
                <el-tag
                  v-for="tag in article.tags"
                  :key="tag"
                  size="small"
                  type="info"
                  class="ml-2"
                >
                  {{ tag }}
                </el-tag>
              </div>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </el-col>

      <el-col :span="8">
        <el-card class="about-card">
          <template #header>
            <div class="card-header">
              <h3>关于我</h3>
            </div>
          </template>
          <div class="about-content">
            <el-avatar
              :size="100"
              src="https://placeholder.co/100"
              class="mb-4"
            />
            <h4>博主昵称</h4>
            <p>热爱技术，热爱生活</p>
            <div class="social-links">
              <el-button type="primary" circle>
                <el-icon><Position /></el-icon>
              </el-button>
              <el-button type="success" circle>
                <el-icon><ChatDotRound /></el-icon>
              </el-button>
              <el-button type="warning" circle>
                <el-icon><Star /></el-icon>
              </el-button>
            </div>
          </div>
        </el-card>

        <el-card class="tags-card">
          <template #header>
            <div class="card-header">
              <h3>标签云</h3>
            </div>
          </template>
          <div class="tags-content">
            <el-tag
              v-for="tag in tags"
              :key="tag.name"
              :type="tag.type"
              class="mx-1 mb-2"
            >
              {{ tag.name }}
            </el-tag>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
const latestArticles = [
  {
    id: 1,
    title: 'Vue3 组合式 API 实战指南',
    date: '2024-01-15',
    summary: '深入探讨 Vue3 组合式 API 的使用方法和最佳实践...',
    category: '前端开发',
    tags: ['Vue3', 'JavaScript']
  },
  {
    id: 2,
    title: 'Node.js 性能优化技巧',
    date: '2024-01-10',
    summary: '分享一些实用的 Node.js 性能优化方法和工具...',
    category: '后端开发',
    tags: ['Node.js', '性能优化']
  },
  {
    id: 3,
    title: '微服务架构设计实践',
    date: '2024-01-05',
    summary: '基于实际项目经验，讨论微服务架构的设计与实现...',
    category: '架构设计',
    tags: ['微服务', '系统设计']
  }
]

const tags = [
  { name: 'Vue3', type: '' },
  { name: 'React', type: 'success' },
  { name: 'Node.js', type: 'warning' },
  { name: 'TypeScript', type: 'danger' },
  { name: 'Docker', type: 'info' },
  { name: '微服务', type: '' },
  { name: '性能优化', type: 'success' },
  { name: '前端工程化', type: 'warning' }
]
</script>

<style scoped>
.welcome-card {
  margin-bottom: 20px;
}

.welcome-image {
  width: 100%;
  margin-bottom: 20px;
}

.welcome-text {
  font-size: 16px;
  line-height: 1.6;
}

.section-title {
  margin: 30px 0 20px;
  font-weight: 600;
}

.article-meta {
  margin-top: 10px;
}

.article-meta .el-tag {
  margin-right: 5px;
}

.about-card,
.tags-card {
  margin-bottom: 20px;
}

.about-content {
  text-align: center;
}

.social-links {
  margin-top: 20px;
}

.social-links .el-button {
  margin: 0 5px;
}

.tags-content {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.mb-4 {
  margin-bottom: 16px;
}

.ml-2 {
  margin-left: 8px;
}

.mx-1 {
  margin: 0 4px;
}

.mb-2 {
  margin-bottom: 8px;
}
</style> 
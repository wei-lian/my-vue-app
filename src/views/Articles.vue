<template>
  <div class="articles">
    <el-row :gutter="20">
      <el-col :span="18">
        <el-card>
          <template #header>
            <div class="card-header">
              <h2>文章列表</h2>
              <el-input
                v-model="searchQuery"
                placeholder="搜索文章..."
                class="search-input"
              >
                <template #prefix>
                  <el-icon><Search /></el-icon>
                </template>
              </el-input>
            </div>
          </template>

          <el-tabs v-model="activeTab" class="article-tabs">
            <el-tab-pane label="全部文章" name="all">
              <div class="article-list">
                <el-card
                  v-for="article in filteredArticles"
                  :key="article.id"
                  class="article-item"
                  shadow="hover"
                >
                  <div class="article-content">
                    <h3 class="article-title">
                      <router-link :to="`/article/${article.id}`">
                        {{ article.title }}
                      </router-link>
                    </h3>
                    <p class="article-summary">{{ article.summary }}</p>
                    <div class="article-meta">
                      <el-tag size="small">{{ article.category }}</el-tag>
                      <span class="article-date">{{ article.date }}</span>
                      <div class="article-tags">
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
                    </div>
                  </div>
                </el-card>
              </div>
              <div class="pagination">
                <el-pagination
                  v-model:current-page="currentPage"
                  v-model:page-size="pageSize"
                  :total="total"
                  :page-sizes="[10, 20, 30, 40]"
                  layout="total, sizes, prev, pager, next, jumper"
                />
              </div>
            </el-tab-pane>
            <el-tab-pane label="热门文章" name="popular">
              <!-- 热门文章内容 -->
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>

      <el-col :span="6">
        <el-card class="category-card">
          <template #header>
            <div class="card-header">
              <h3>分类</h3>
            </div>
          </template>
          <el-menu>
            <el-menu-item
              v-for="category in categories"
              :key="category.name"
              :index="category.name"
            >
              <el-icon><Folder /></el-icon>
              <span>{{ category.name }}</span>
              <template #title>
                <el-badge
                  :value="category.count"
                  class="category-count"
                  type="info"
                />
              </template>
            </el-menu-item>
          </el-menu>
        </el-card>

        <el-card class="archive-card">
          <template #header>
            <div class="card-header">
              <h3>归档</h3>
            </div>
          </template>
          <el-timeline>
            <el-timeline-item
              v-for="archive in archives"
              :key="archive.date"
              :timestamp="archive.date"
              placement="top"
            >
              {{ archive.count }} 篇文章
            </el-timeline-item>
          </el-timeline>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
const searchQuery = ref('')
const activeTab = ref('all')
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(100)

// 模拟文章数据
const articles = [
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

const categories = [
  { name: '前端开发', count: 25 },
  { name: '后端开发', count: 18 },
  { name: '架构设计', count: 12 },
  { name: '开发工具', count: 8 },
  { name: '项目管理', count: 5 }
]

const archives = [
  { date: '2024-01', count: 8 },
  { date: '2023-12', count: 12 },
  { date: '2023-11', count: 10 },
  { date: '2023-10', count: 15 }
]

const filteredArticles = computed(() => {
  return articles.filter(article =>
    article.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const router = useRouter()

const goToDetail = (id) => {
  router.push(`/article/${id}`)
}
</script>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.search-input {
  width: 300px;
}

.article-tabs {
  margin-top: 20px;
}

.article-item {
  margin-bottom: 20px;
  cursor: pointer;
  transition: transform 0.3s;
}

.article-item:hover {
  transform: translateY(-5px);
}

.article-title {
  margin: 0 0 10px 0;
}

.article-title a {
  color: #303133;
  text-decoration: none;
}

.article-title a:hover {
  color: #409EFF;
}

.article-summary {
  color: #666;
  margin: 10px 0;
}

.article-meta {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #999;
}

.article-date {
  font-size: 14px;
}

.article-tags {
  margin-left: auto;
}

.pagination {
  margin-top: 20px;
  text-align: center;
}

.category-card,
.archive-card {
  margin-bottom: 20px;
}

.category-count {
  margin-left: auto;
}

.ml-2 {
  margin-left: 8px;
}
</style> 
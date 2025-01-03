<template>
  <div class="article-detail">
    <el-row :gutter="20">
      <el-col :span="18">
        <el-card class="article-card">
          <template #header>
            <div class="article-header">
              <h1>{{ article.title }}</h1>
              <div class="article-meta">
                <el-avatar :size="30" :src="article.author.avatar" />
                <span class="author-name">{{ article.author.name }}</span>
                <span class="publish-date">{{ article.date }}</span>
                <el-tag size="small">{{ article.category }}</el-tag>
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
          </template>

          <div class="article-content" v-html="article.content"></div>

          <div class="article-footer">
            <el-divider />
            <div class="article-actions">
              <el-button type="primary" :icon="ThumbsUp">
                点赞 {{ article.likes }}
              </el-button>
              <el-button type="success" :icon="StarFilled">
                收藏 {{ article.favorites }}
              </el-button>
              <el-button type="info" :icon="Share">分享</el-button>
            </div>
          </div>
        </el-card>

        <el-card class="comments-card">
          <template #header>
            <div class="card-header">
              <h3>评论 ({{ comments.length }})</h3>
            </div>
          </template>

          <div class="comment-form">
            <el-input
              v-model="newComment"
              type="textarea"
              :rows="3"
              placeholder="写下你的评论..."
            />
            <el-button type="primary" class="submit-comment">
              发表评论
            </el-button>
          </div>

          <div class="comments-list">
            <div
              v-for="comment in comments"
              :key="comment.id"
              class="comment-item"
            >
              <div class="comment-header">
                <el-avatar :size="40" :src="comment.avatar" />
                <div class="comment-info">
                  <span class="comment-author">{{ comment.author }}</span>
                  <span class="comment-date">{{ comment.date }}</span>
                </div>
              </div>
              <div class="comment-content">
                {{ comment.content }}
              </div>
              <div class="comment-actions">
                <el-button text type="primary" size="small">
                  回复
                </el-button>
                <el-button text type="info" size="small">
                  点赞 {{ comment.likes }}
                </el-button>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>

      <el-col :span="6">
        <el-card class="toc-card">
          <template #header>
            <div class="card-header">
              <h3>目录</h3>
            </div>
          </template>
          <el-tree :data="toc" :props="defaultProps" />
        </el-card>

        <el-card class="related-card">
          <template #header>
            <div class="card-header">
              <h3>相关文章</h3>
            </div>
          </template>
          <ul class="related-list">
            <li v-for="item in relatedArticles" :key="item.id">
              <router-link :to="`/article/${item.id}`">
                {{ item.title }}
              </router-link>
              <span class="article-date">{{ item.date }}</span>
            </li>
          </ul>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
const route = useRoute()
const articleId = route.params.id
const newComment = ref('')

// 模拟文章数据
const article = ref({
  id: articleId,
  title: 'Vue3 组合式 API 实战指南',
  author: {
    name: '博主',
    avatar: 'https://placeholder.co/100'
  },
  date: '2024-01-15',
  category: '前端开发',
  tags: ['Vue3', 'JavaScript'],
  content: `
    <h2>引言</h2>
    <p>Vue3 的组合式 API 是一个革命性的特性...</p>
    <h2>基础概念</h2>
    <p>在开始使用组合式 API 之前，我们需要理解几个核心概念...</p>
    <h2>实战示例</h2>
    <p>让我们通过一个实际的例子来看看如何使用组合式 API...</p>
  `,
  likes: 42,
  favorites: 18
})

const comments = [
  {
    id: 1,
    author: '张三',
    avatar: 'https://placeholder.co/100',
    date: '2024-01-16',
    content: '写得很好，学习了！',
    likes: 5
  },
  {
    id: 2,
    author: '李四',
    avatar: 'https://placeholder.co/100',
    date: '2024-01-16',
    content: '期待更多相关内容',
    likes: 3
  }
]

const toc = [
  {
    label: '引言',
    children: []
  },
  {
    label: '基础概念',
    children: []
  },
  {
    label: '实战示例',
    children: []
  }
]

const defaultProps = {
  children: 'children',
  label: 'label'
}

const relatedArticles = [
  {
    id: 2,
    title: 'Vue3 性能优化技巧',
    date: '2024-01-10'
  },
  {
    id: 3,
    title: 'Composition API vs Options API',
    date: '2024-01-05'
  }
]
</script>

<style scoped>
.article-header {
  margin-bottom: 20px;
}

.article-header h1 {
  margin: 0 0 20px 0;
}

.article-meta {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #666;
}

.article-content {
  line-height: 1.8;
  font-size: 16px;
}

.article-footer {
  margin-top: 30px;
}

.article-actions {
  display: flex;
  gap: 10px;
  justify-content: center;
}

.comments-card {
  margin-top: 20px;
}

.comment-form {
  margin-bottom: 20px;
}

.submit-comment {
  margin-top: 10px;
  float: right;
}

.comment-item {
  padding: 20px 0;
  border-bottom: 1px solid #eee;
}

.comment-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

.comment-info {
  display: flex;
  flex-direction: column;
}

.comment-author {
  font-weight: bold;
}

.comment-date {
  font-size: 12px;
  color: #999;
}

.comment-content {
  margin: 10px 0;
}

.comment-actions {
  display: flex;
  gap: 10px;
}

.toc-card,
.related-card {
  margin-bottom: 20px;
}

.related-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.related-list li {
  padding: 10px 0;
  border-bottom: 1px solid #eee;
}

.related-list a {
  color: #303133;
  text-decoration: none;
}

.related-list a:hover {
  color: #409EFF;
}

.article-date {
  font-size: 12px;
  color: #999;
  float: right;
}

.ml-2 {
  margin-left: 8px;
}
</style> 
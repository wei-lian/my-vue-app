import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/views/Home.vue'),
      meta: {
        title: '首页'
      }
    },
    {
      path: '/articles',
      name: 'Articles',
      component: () => import('@/views/Articles.vue'),
      meta: {
        title: '文章列表'
      }
    },
    {
      path: '/article/:id',
      name: 'ArticleDetail',
      component: () => import('@/views/ArticleDetail.vue'),
      meta: {
        title: '文章详情'
      }
    },
    {
      path: '/about',
      name: 'About',
      component: () => import('@/views/About.vue'),
      meta: {
        title: '关于我'
      }
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: () => import('@/views/Dashboard.vue'),
      meta: {
        title: '数据大屏'
      }
    },
    {
      path: '/games/snake',
      name: 'Snake',
      component: () => import('@/views/games/SnakeGame.vue'),
      meta: {
        title: '贪吃蛇'
      }
    },
    {
      path: '/games/sudoku',
      name: 'Sudoku',
      component: () => import('@/views/games/SudokuGame.vue'),
      meta: {
        title: '数独'
      }
    },
    {
      path: '/games/minesweeper',
      name: 'Minesweeper',
      component: () => import('@/views/games/MinesweeperGame.vue'),
      meta: {
        title: '扫雷'
      }
    },
    {
      path: '/games',
      name: 'Games',
      component: () => import('@/views/Games.vue'),
      meta: {
        title: '游戏中心'
      }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/views/NotFound.vue'),
      meta: {
        title: '404'
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | 我的博客`
  next()
})

export default router 
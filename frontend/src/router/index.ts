import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/auth/Login.vue'),
    meta: { layout: 'auth', title: '登录' },
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/auth/Register.vue'),
    meta: { layout: 'auth', title: '注册' },
  },
  {
    path: '/',
    name: 'dashboard',
    component: () => import('../views/dashboard/Index.vue'),
    meta: { layout: 'default', title: '仪表盘' },
  },
  {
    path: '/audio',
    name: 'audio-index',
    component: () => import('../views/audio/Index.vue'),
    meta: { layout: 'default', title: '音声收藏' },
  },
  {
    path: '/audio/:id',
    name: 'audio-detail',
    component: () => import('../views/audio/Detail.vue'),
    meta: { layout: 'default', title: '音声详情' },
  },
  {
    path: '/novels',
    name: 'novel-index',
    component: () => import('../views/novel/Index.vue'),
    meta: { layout: 'default', title: '小说书架' },
  },
  {
    path: '/novels/reader/:id',
    name: 'novel-reader',
    component: () => import('../views/novel/Reader.vue'),
    meta: { layout: 'blank', title: '在线阅读' },
  },
  {
    path: '/wiki',
    name: 'wiki-index',
    component: () => import('../views/wiki/Index.vue'),
    meta: { layout: 'default', title: 'TWICE Wiki' },
  },
  {
    path: '/wiki/members',
    name: 'wiki-members',
    component: () => import('../views/wiki/Members.vue'),
    meta: { layout: 'default', title: '成员列表' },
  },
  {
    path: '/wiki/members/:id',
    name: 'wiki-member-detail',
    component: () => import('../views/wiki/MemberDetail.vue'),
    meta: { layout: 'default', title: '成员详情' },
  },
  {
    path: '/wiki/albums',
    name: 'wiki-albums',
    component: () => import('../views/wiki/Albums.vue'),
    meta: { layout: 'default', title: '专辑列表' },
  },
  {
    path: '/wiki/albums/:id',
    name: 'wiki-album-detail',
    component: () => import('../views/wiki/AlbumDetail.vue'),
    meta: { layout: 'default', title: '专辑详情' },
  },
  {
    path: '/beads',
    name: 'bead-index',
    component: () => import('../views/bead/Index.vue'),
    meta: { layout: 'default', title: '拼豆库存' },
  },
  {
    path: '/drive',
    name: 'drive-index',
    component: () => import('../views/drive/Index.vue'),
    meta: { layout: 'default', title: '云盘管理' },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('../views/NotFound.vue'),
    meta: { layout: 'default', title: '页面未找到' },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

router.afterEach((to) => {
  const title = typeof to.meta.title === 'string' ? to.meta.title : '个人综合应用系统'
  document.title = `${title} · 个人综合应用系统`
})

export default router

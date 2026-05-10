import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import type { MenuProps } from 'ant-design-vue';

export interface AppRouteMeta {
  title?: string;
  icon?: string;
  requiresAuth?: boolean;
  layout?: 'default' | 'auth' | 'blank';
}

declare module 'vue-router' {
  interface RouteMeta extends AppRouteMeta {}
}

const routes: RouteRecordRaw[] = [
  {
    path: '/auth',
    name: 'Auth',
    component: () => import('@/layouts/AuthLayout.vue'),
    redirect: '/auth/login',
    children: [
      {
        path: 'login',
        name: 'Login',
        component: () => import('@/views/auth/Login.vue'),
        meta: { title: '登录' }
      },
      {
        path: 'register',
        name: 'Register',
        component: () => import('@/views/auth/Register.vue'),
        meta: { title: '注册' }
      }
    ]
  },
  {
    path: '/',
    component: () => import('@/layouts/DefaultLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/Index.vue'),
        meta: { 
          title: '仪表盘', 
          icon: 'Home',
          breadcrumb: ['首页']
        }
      },
      {
        path: 'audio',
        name: 'Audio',
        component: () => import('@/views/audio/Index.vue'),
        meta: { 
          title: '音声管理', 
          icon: 'Audio',
          breadcrumb: ['首页', '音声管理']
        },
        children: [
          {
            path: ':id',
            name: 'AudioDetail',
            component: () => import('@/views/audio/Detail.vue'),
            meta: { title: '音声详情', breadcrumb: ['首页', '音声管理', '音声详情'] }
          }
        ]
      },
      {
        path: 'novel',
        name: 'Novel',
        component: () => import('@/views/novel/Index.vue'),
        meta: { 
          title: '小说管理', 
          icon: 'BookOpen',
          breadcrumb: ['首页', '小说管理']
        },
        children: [
          {
            path: ':id',
            name: 'NovelDetail',
            component: () => import('@/views/novel/Detail.vue'),
            meta: { title: '小说详情', breadcrumb: ['首页', '小说管理', '小说详情'] }
          },
          {
            path: ':id/read',
            name: 'NovelReader',
            component: () => import('@/views/novel/Reader.vue'),
            meta: { title: '阅读', breadcrumb: ['首页', '小说管理', '阅读'] }
          }
        ]
      },
      {
        path: 'wiki',
        name: 'Wiki',
        component: () => import('@/views/wiki/Index.vue'),
        meta: { 
          title: 'TWICE Wiki', 
          icon: 'Microphone',
          breadcrumb: ['首页', 'TWICE Wiki']
        },
        children: [
          {
            path: 'members',
            name: 'WikiMembers',
            component: () => import('@/views/wiki/Members.vue'),
            meta: { title: '成员', breadcrumb: ['首页', 'TWICE Wiki', '成员'] }
          },
          {
            path: 'members/:id',
            name: 'MemberDetail',
            component: () => import('@/views/wiki/MemberDetail.vue'),
            meta: { title: '成员详情', breadcrumb: ['首页', 'TWICE Wiki', '成员', '详情'] }
          },
          {
            path: 'albums',
            name: 'WikiAlbums',
            component: () => import('@/views/wiki/Albums.vue'),
            meta: { title: '专辑', breadcrumb: ['首页', 'TWICE Wiki', '专辑'] }
          },
          {
            path: 'albums/:id',
            name: 'AlbumDetail',
            component: () => import('@/views/wiki/AlbumDetail.vue'),
            meta: { title: '专辑详情', breadcrumb: ['首页', 'TWICE Wiki', '专辑', '详情'] }
          }
        ]
      },
      {
        path: 'bead',
        name: 'Bead',
        component: () => import('@/views/bead/Index.vue'),
        meta: { 
          title: '拼豆库存', 
          icon: 'Palette',
          breadcrumb: ['首页', '拼豆库存']
        }
      },
      {
        path: 'drive',
        name: 'Drive',
        component: () => import('@/views/drive/Index.vue'),
        meta: { 
          title: '云盘管理', 
          icon: 'Cloud',
          breadcrumb: ['首页', '云盘管理']
        }
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFound.vue'),
    meta: { layout: 'blank' }
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { top: 0 };
  }
});

let isAuthChecked = false;

router.beforeEach(async (to, _from, next) => {
  if (!isAuthChecked) {
    isAuthChecked = true;
    const { useAuthStore } = await import('@/stores/auth');
    const authStore = useAuthStore();
    const isAuthenticated = !!authStore.token;
    
    if (to.meta.requiresAuth && !isAuthenticated) {
      next({ name: 'Login', query: { redirect: to.fullPath } });
      return;
    }
    
    if (to.name === 'Login' && isAuthenticated) {
      next({ name: 'Dashboard' });
      return;
    }
  }
  
  if (to.meta.title) {
    document.title = `${to.meta.title} - 数字收藏馆`;
  }
  
  next();
});

export const menuItems: MenuProps['items'] = [
  {
    key: 'dashboard',
    icon: 'Home',
    label: '仪表盘',
    path: '/'
  },
  {
    key: 'audio',
    icon: 'Audio',
    label: '音声',
    path: '/audio'
  },
  {
    key: 'novel',
    icon: 'BookOpen',
    label: '小说',
    path: '/novel'
  },
  {
    key: 'wiki',
    icon: 'Microphone',
    label: 'TWICE Wiki',
    path: '/wiki'
  },
  {
    key: 'bead',
    icon: 'Palette',
    label: '拼豆',
    path: '/bead'
  },
  {
    key: 'drive',
    icon: 'Cloud',
    label: '云盘',
    path: '/drive'
  }
];

export default router;

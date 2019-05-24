import Layout from '@/views/layout/Layout'

const adminRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/admin',
    name: 'admin',
    children: [
      {
        name: 'admin',
        path: '/admin',
        meta: {
          title: '管理员管理',
          icon: 'user'
        },
        component: () => import('@/views/adminUser')
      },

    ]
  },
  {path: '*', redirect: '/404', hidden: true}
]

const repairRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/repair',
    name: 'repair',
    children: [
      {
        name: 'repair',
        path: '/repair',
        meta: {
          title: '维修员管理',
          icon: 'user'
        },
        component: () => import('@/views/repair')
      }
    ]
  },
  {
    path: '/check',
    component: Layout,
    name: 'repairCheck',
    redirect:'/repairCheck',
    meta: {
      title: '订单审核管理',
      icon: 'form'
    },
    children: [
      {
        name: 'repairCheck',
        path: '/repairCheck',
        meta: {
          title: '报修单审核',
          icon: 'manage'
        },
        component: () => import('@/views/repairCheck')
      },
      {
        name: 'maintainCheck',
        path: '/maintainCheck',
        meta: {
          title: '维修单审核',
          icon: 'send'
        },
        component: () => import('@/views/maintainCheck')
      }
    ]
  },
  {
    path: '/type',
    component: Layout,
    name: 'repairType',
    children: [
      {
        name: 'repairType',
        path: '/repairType',
        meta: {
          title: '报修类型管理',
          icon: 'all'
        },
        component: () => import('@/views/repairType')
      },

    ]
  },
  {
    path: '/char',
    component: Layout,
    name: 'char',
    redirect:'/statistics',
    meta:{
      title: '数据统计',
      icon: 'example'
    },
    children: [
      {
        name: 'statistics',
        path: '/statistics',
        meta: {
          title: '报修类型统计',
          icon: 'add'
        },
        component: () => import('@/views/statistics')
      },
      {
        name: 'repairsMatch',
        path: '/repairsMatch',
        meta: {
          title: '维修员对比统计',
          icon: 'done'
        },
        component: () => import('@/views/repairsMatch')
      },
      {
        name: 'repairsMonth',
        path: '/repairsMonth',
        meta: {
          title: '维修员月统计',
          icon: 'tree'
        },
        component: () => import('@/views/repairsMonth')
      },
      {
        name: 'happy',
        path: '/happy',
        meta: {
          title: '满意度统计',
          icon: 'form'
        },
        component: () => import('@/views/happy')
      }
    ]
  },
  {path: '*', redirect: '/404', hidden: true}
]

export default {
  adminRoutes,
  repairRoutes
}

import Main from '@/components/main'
// import parentView from '@/components/parent-view'

/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         使用'{{ 多语言字段 }}'形式结合多语言使用，例子看多语言的路由配置;
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  hideInBread: (false) 设为true后此级路由将不会出现在面包屑中，示例看QQ群路由配置
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面在切换标签后不会缓存，如果需要缓存，无需
 * 设置这个字段，而且需要设置页面组件name属性和路由配置的name一致
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */

export default [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login - 登录',
      hideInMenu: true
    },
    component: () => import('@/view/login/login.vue')
  },
  {
    path: '/report',
    name: 'report',
    meta: {
      title: '报告',
      hideInMenu: true
    },
    component: () => import('@/view/report/575.vue')
  },
  {
    path: '/',
    name: '_home',
    redirect: '/home',
    component: Main,
    meta: {
      hideInMenu: true,
      notCache: true
    },
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          hideInMenu: true,
          title: '首页',
          notCache: true,
          icon: 'md-home'
        },
        component: () => import('@/view/single-page/home')
      }
    ]
  },
  // {
  //   path: '',
  //   name: 'doc',
  //   meta: {
  //     title: '文档',
  //     href: 'https://lison16.github.io/iview-admin-doc/#/',
  //     icon: 'ios-book'
  //   }
  // },
  // {
  //   path: '/join',
  //   name: 'join',
  //   component: Main,
  //   meta: {
  //     hideInBread: true
  //   },
  //   children: [
  //     {
  //       path: 'join_page',
  //       name: 'join_page',
  //       meta: {
  //         icon: '_qq',
  //         title: 'QQ群'
  //       },
  //       component: () => import('@/view/join-page.vue')
  //     }
  //   ]
  // },
  {
    path: '/message',
    name: 'message',
    component: Main,
    meta: {
      hideInBread: true,
      hideInMenu: true
    },
    children: [
      {
        path: 'message_page',
        name: 'message_page',
        meta: {
          icon: 'md-notifications',
          title: '消息中心'
        },
        component: () => import('@/view/single-page/message/index.vue')
      }
    ]
  },
  // {
  //   path: '/input',
  //   name: 'input',
  //   component: Main,
  //   children: [
  //     {
  //       path: '/input_test',
  //       name: 'input_test',
  //       meta: {
  //         icon: 'md-arrow-dropdown-circle',
  //         title: '测试',
  //         access: ['admin']
  //       },
  //       component: () => import('@/view/report/mutation/mutation-filter.vue')
  //     }
  //   ]
  // },
  {
    path: '/okr',
    name: 'okr',
    component: Main,
    children: [
      {
        path: '/okr_575',
        name: 'okr_575',
        meta: {
          icon: 'md-arrow-dropdown-circle',
          title: '575OKR',
          access: ['admin']
        },
        component: () => import('@/view/report/okr/okr-575.vue')
      }
    ]
  },
  {
    path: '/upload',
    name: 'upload',
    meta: {
      title: '样本信息',
      icon: 'logo-buffer'
    },
    component: Main,
    children: [
      // {
      //   path: 'sample_info',
      //   name: 'sample_info',
      //   meta: {
      //     icon: 'md-arrow-dropdown-circle',
      //     title: '样本信息上传'
      //   },
      //   component: () => import('@/view/row-data-upload/sample-info.vue')
      // },
      // {
      //   path: '/sample_info_record',
      //   name: 'sample_info_record',
      //   meta: {
      //     icon: 'md-arrow-dropdown-circle',
      //     title: '测试',
      //     access: ['admin']
      //   },
      //   component: () => import('@/view/row-data-upload/sample-info-record.vue')
      // },
      {
        path: '/sample_info_rec',
        name: 'sample_info_rec',
        meta: {
          icon: 'md-arrow-dropdown-circle',
          title: '测试1'
        },
        component: () => import('@/view/row-data-upload/sample-info-rec.vue')
      }
      // {
      //   path: 'view_sample',
      //   name: 'view_sample',
      //   meta: {
      //     icon: 'md-arrow-dropdown-circle',
      //     title: '搜索'
      //   },
      //   component: () => import('@/view/view-sample/view-sample.vue')
      // }
    ]
  },
  {
    path: '/sample_detial',
    name: 'sample_detial',
    meta: {
      hideInMenu: true
    },
    component: Main,
    children: [
      {
        path: 'sample_mg/:mg_id',
        name: 'sample_mg',
        meta: {
          icon: 'md-flower',
          title: route => `{{ sample_mg }}-${route.params.mg_id}`,
          notCache: true
        },
        component: () => import('@/view/view-sample/view-by-mg-id.vue')
      },
      {
        path: 'sample_name/:name',
        name: 'sample_name',
        meta: {
          icon: 'md-flower',
          title: route => `{{ sample_name }}-${route.params.name}`,
          notCache: true
        },
        component: () => import('@/view/view-sample/view-by-name.vue')
      },
      {
        path: 'seq_info/:name',
        name: 'seq_info',
        meta: {
          icon: 'md-flower',
          title: route => `{{ seq_info }}-${route.params.name}`,
          notCache: true
        },
        component: () => import('@/view/view-run/seq-info.vue')
      }
    ]
  },
  {
    path: '/report',
    name: 'report',
    meta: {
      title: '报告',
      icon: 'logo-buffer',
      access: ['admin', 'rep', 'rep_admin']
    },
    component: Main,
    children: [
      {
        path: 'run_info',
        name: 'run_info',
        meta: {
          icon: 'md-arrow-dropdown-circle',
          title: '上机信息上传'
        },
        component: () => import('@/view/row-data-upload/run-info.vue')
      },
      {
        path: 'all_run',
        name: 'all_run',
        meta: {
          icon: 'md-arrow-dropdown-circle',
          title: '上机信息'
        },
        component: () => import('@/view/view-run/all-run.vue')
      },
      {
        path: 'all-report',
        name: 'all_report',
        meta: {
          access: ['super_admin'],
          icon: 'md-arrow-dropdown-circle',
          title: '所有报告'
        },
        component: () => import('@/view/report/all-report.vue')
      },
      {
        path: 'report-list',
        name: 'report_list',
        meta: {
          icon: 'md-arrow-dropdown-circle',
          title: '报告制作'
        },
        component: () => import('@/view/report/report-list.vue')
      },
      // {
      //   path: '575',
      //   name: '575',
      //   meta: {
      //     icon: 'md-arrow-dropdown-circle',
      //     title: '575'
      //   },
      //   component: () => import('@/view/report/575.vue')
      // },
      {
        path: 'check-mutation/:name/:mg_id',
        name: 'check_mutation',
        meta: {
          icon: 'md-flower',
          title: route => `${route.params.mg_id}-{{ check_mutation }}`,
          hideInMenu: true
        },
        component: () => import('@/view/report/mutation/check-mutation.vue')
      },
      {
        path: 'report-qc/:name/:mg_id',
        name: 'report_qc',
        meta: {
          icon: 'md-flower',
          title: route => `${route.params.mg_id}-{{ QC }}`,
          hideInMenu: true
        },
        component: () => import('@/view/report/mutation/report-qc.vue')
      },
      {
        path: 'annotate/:name/:mg_id',
        name: 'rep_mutation',
        meta: {
          icon: 'md-flower',
          title: route => `${route.params.mg_id}-{{ rep_mutation }}`,
          hideInMenu: true
        },
        component: () => import('@/view/report/annotate/annotate-first.vue')
      },
      {
        path: 'annotate_check/:name/:mg_id',
        name: 'okr_edit',
        meta: {
          icon: 'md-flower',
          title: route => `${route.params.mg_id}-{{ okr_edit }}`,
          hideInMenu: true
        },
        component: () => import('@/view/report/annotate/annotate-check.vue')
      },
      {
        path: 'mutation-raw/:name/:mg_id',
        name: 'mutation_raw',
        meta: {
          icon: 'md-flower',
          title: route => `${route.params.mg_id}-{{ mutation_raw }}`,
          hideInMenu: true
        },
        component: () => import('@/view/report/mutation/mutation-raw.vue')
      },
      {
        path: 'zip_file',
        name: 'zip_file',
        meta: {
          icon: 'md-arrow-dropdown-circle',
          title: 'Ion Report数据上传',
          hideInMenu: true
        },
        component: () => import('@/view/row-data-upload/ir_zip_file.vue')
      }
    ]
  },
  {
    path: '/admin',
    name: 'admin',
    meta: {
      title: '后台管理',
      icon: 'logo-buffer',
      access: ['admin']
    },
    component: Main,
    children: [
      {
        path: 'user',
        name: 'admin_user',
        meta: {
          access: ['super_admin'],
          icon: 'md-arrow-dropdown-circle',
          title: '用户'
        },
        component: () => import('@/view/admin/admin-user.vue')
      },
      {
        path: 'sample',
        name: 'admin_sample',
        meta: {
          icon: 'md-arrow-dropdown-circle',
          title: '样本'
        },
        component: () => import('@/view/admin/admin-sample.vue')
      },
      {
        path: 'patient',
        name: 'admin_patient',
        meta: {
          icon: 'md-arrow-dropdown-circle',
          title: '病人'
        },
        component: () => import('@/view/admin/admin-patient.vue')
      },
      {
        path: 'record',
        name: 'admin_record',
        meta: {
          icon: 'md-arrow-dropdown-circle',
          title: '录入配置'
        },
        component: () => import('@/view/admin/sample-record/index.vue')
      },
      {
        path: 'template',
        name: 'admin_report_template',
        meta: {
          icon: 'md-arrow-dropdown-circle',
          title: '模板配置'
        },
        component: () => import('@/view/admin/template/admin-report-template.vue')
      },
      {
        path: 'admin_okr',
        name: 'admin_okr',
        meta: {
          icon: 'md-arrow-dropdown-circle',
          title: 'OKR'
        },
        component: () => import('@/view/admin/okr/admin-okr.vue')
      }
    ]
  },
  {
    path: '/admin/add-template',
    name: 'add-template',
    meta: {
      hideInMenu: true
    },
    component: Main,
    children: [
      {
        path: 'template',
        name: 'admin_template_upload',
        meta: {
          icon: 'md-arrow-dropdown-circle',
          title: '增加配置'
        },
        component: () => import('@/view/admin/template/admin-template-upload.vue')
      }
    ]
  },
  // {
  //   path: '/qc',
  //   name: 'qc',
  //   meta: {
  //     title: '质控信息上传',
  //     icon: 'logo-buffer'
  //   },
  //   component: Main,
  //   children: [
  //     {
  //       path: 'select_sample',
  //       name: 'select_sample',
  //       meta: {
  //         icon: 'md-arrow-dropdown-circle',
  //         title: '选择样本'
  //       },
  //       component: () => import('@/view/qc-upload/select.vue')
  //     },
  //     {
  //       path: 'distill_qc',
  //       name: 'distill_qc',
  //       meta: {
  //         icon: 'md-arrow-dropdown-circle',
  //         title: '提取质控'
  //       },
  //       component: () => import('@/view/qc-upload/distill-qc.vue')
  //     }
  //   ]
  // },
  {
    path: '/401',
    name: 'error_401',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/401.vue')
  },
  {
    path: '/500',
    name: 'error_500',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/500.vue')
  },
  {
    path: '*',
    name: 'error_404',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/404.vue')
  }
]

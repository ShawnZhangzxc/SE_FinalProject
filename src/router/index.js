import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import doc from '../views/doc.vue'
import RegisterView from '../views/RegisterView.vue'
import BuildingGroupView from '../views/BuildingGroupView.vue'
import CreatedGroupView from '../views/CreatedGroupView.vue'
import KeptDocView from '../views/KeptDocView.vue'
import GroupDocView from '../views/GroupDocView.vue'
import JoinedGroupView from '../views/JoinedGroupView.vue'
import PersonalDocView from '../views/PersonalDocView.vue'
import PersonalInfoView from '../views/PersonalInfoView.vue'
import RecentView from '../views/RecentView.vue'
import TrashBinView from '../views/TrashBinView.vue'
import SystemNewsView from '../views/SystemNewsView.vue'
import GroupNewsView from '../views/GroupNewsView.vue'
import WorkView from '../views/WorkView.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: LoginView
  },
  {
    path: '/systemnews',
    name: 'systemnews',
    component: SystemNewsView,
    children: [
      {
        path: '/invitation',
        component: () => import('../components/notice/Invitation.vue')
      },
      {
        path: '/application',
        component: () => import('../components/notice/Application.vue')
      },
      {
        path: '/notice',
        component: () => import('../components/notice/Notice.vue')
      }
    ]
  },
  {
    path: '/work',
    name: 'work',
    component: WorkView
  },
  // {
  //   path: '/systemnews',
  //   name: 'systemnews',
  //   component: SystemNewsView
  // },
  {
    path: '/groupnews',
    name: 'groupnews',
    component: GroupNewsView,
    children: [
      {
        path: '/invitation',
        component: () => import('../components/notice/Invitation.vue')
      },
      {
        path: '/application',
        component: () => import('../components/notice/Application.vue')
      },
      {
        path: '/notice',
        component: () => import('../components/notice/Notice.vue')
      }
    ]
  },
  {
    path: '/trashbin',
    name: 'trashbin',
    component: TrashBinView
  },
  {
    path: '/recent',
    name: 'recent',
    component: RecentView
  },
  {
    path: '/personalinfo',
    name: 'personalinfo',
    component: PersonalInfoView
  },
  {
    path: '/personaldoc',
    name: 'personaldoc',
    component: PersonalDocView
  },
  {
    path: '/joinedgroup',
    name: 'joinedgroup',
    component:JoinedGroupView
  },
  {
    path: '/groupdoc',
    name: 'groupdoc',
    component: GroupDocView
  },
  {
    path: '/keptdoc',
    name: 'keptdoc',
    component: KeptDocView
  },
  {
    path: '/createdgroup',
    name: 'createdgroup',
    component: CreatedGroupView
  },
  {
    path: '/buildinggroup',
    name: 'buildinggrou',
    component: BuildingGroupView
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/doc/:id',
    name: 'doc',
    component: doc
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = new VueRouter({
  routes
})


/*router.beforeEach((to,from,next) => {
  //to到哪儿  from从哪儿离开  next跳转 为空就是放行
    if (to.path === '/loginView') {
      //如果跳转为登录，就放行
      next();
    }
    else if(to.path === '/register'){
      next();
    }
    else if(to.path === '/work'){
      next();

    }else {
    //取出localStorage判断
          let token = localStorage.getItem('token');
          if (token == null || token === '') {
                 console.log('请先登录3')
                 console.log(to.path)
                 alert("请先登录！")
                 //next({name:'loginView'});
             } else {
                    next();
             }
  }});*/


export default router

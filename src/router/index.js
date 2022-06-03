import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import WorkView from '../views/WorkView.vue'
import RegisterView from '../views/RegisterView.vue'
import BuildingGroupView from '../views/BuildingGroupView.vue'
import CreatedGroupView from '../views/CreatedGroupView.vue'
import FriendsView from '../views/FriendsView.vue'
import GroupDocView from '../views/GroupDocView.vue'
import JoinedGroupView from '../views/JoinedGroupView.vue'
import PersonalDocView from '../views/PersonalDocView.vue'
import PersonalInfoView from '../views/PersonalInfoView.vue'
import SettingsView from '../views/SettingsView.vue'
import TrashBinView from '../views/TrashBinView.vue'
import SystemNewsView from '../views/SystemNewsView.vue'
import GroupNewsView from '../views/GroupNewsView.vue'
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
    component: SystemNewsView
  },
  {
    path: '/groupnews',
    name: 'groupnews',
    component: GroupNewsView
  },
  {
    path: '/trashbin',
    name: 'trashbin',
    component: TrashBinView
  },
  {
    path: '/settings',
    name: 'settings',
    component: SettingsView
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
    path: '/friends',
    name: 'friends',
    component: FriendsView
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
    path: '/work',
    name: 'work',
    component: WorkView
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

export default router

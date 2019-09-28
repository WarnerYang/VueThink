import Login from './components/Account/Login.vue'
import refresh from './components/refresh.vue'
import Home from './components/Home.vue'
import menuList from './components/Administrative/system/menu/list.vue'
import menuAdd from './components/Administrative/system/menu/add.vue'
import menuEdit from './components/Administrative/system/menu/edit.vue'
import systemConfig from './components/Administrative/system/config/add.vue'
import ruleList from './components/Administrative/system/rule/list.vue'
import ruleAdd from './components/Administrative/system/rule/add.vue'
import ruleEdit from './components/Administrative/system/rule/edit.vue'
import positionList from './components/Administrative/structures/position/list.vue'
import positionAdd from './components/Administrative/structures/position/add.vue'
import positionEdit from './components/Administrative/structures/position/edit.vue'
import structuresList from './components/Administrative/structures/structures/list.vue'
import structuresAdd from './components/Administrative/structures/structures/add.vue'
import structuresEdit from './components/Administrative/structures/structures/edit.vue'
import groupsList from './components/Administrative/structures/groups/list.vue'
import groupsAdd from './components/Administrative/structures/groups/add.vue'
import groupsEdit from './components/Administrative/structures/groups/edit.vue'
import usersList from './components/Administrative/personnel/users/list.vue'
import usersAdd from './components/Administrative/personnel/users/add.vue'
import usersEdit from './components/Administrative/personnel/users/edit.vue'

/**
 * meta参数解析
 * activeMenu 高亮菜单
 */

const routes = [
  { path: '/', component: Login, name: 'Login' },
  {
    path: '/refresh',
    component: Home,
    children: [
      { path: '/refresh', component: refresh, name: 'refresh' }
    ]
  },
  {
    path: '/home',
    component: Home,
    children: [
      { path: 'menu/list', component: menuList, name: 'menuList', meta: { activeMenu: '/home/menu/list' } },
      { path: 'menu/add', component: menuAdd, name: 'menuAdd', meta: { activeMenu: '/home/menu/list' } },
      { path: 'menu/edit/:id', component: menuEdit, name: 'menuEdit', meta: { activeMenu: '/home/menu/list' } }
    ]
  },
  {
    path: '/home',
    component: Home,
    children: [
      { path: 'config/add', component: systemConfig, name: 'systemConfig', meta: { activeMenu: '/home/config/add' } }
    ]
  },

  {
    path: '/home',
    component: Home,
    children: [
      { path: 'rule/list', component: ruleList, name: 'ruleList', meta: { activeMenu: '/home/rule/list' } },
      { path: 'rule/add', component: ruleAdd, name: 'ruleAdd', meta: { activeMenu: '/home/rule/list' } },
      { path: 'rule/edit/:id', component: ruleEdit, name: 'ruleEdit', meta: { activeMenu: '/home/rule/list' } }
    ]
  },
  {
    path: '/home',
    component: Home,
    children: [
      { path: 'position/list', component: positionList, name: 'positionList', meta: { activeMenu: '/home/position/list' } },
      { path: 'position/add', component: positionAdd, name: 'positionAdd', meta: { activeMenu: '/home/position/list' } },
      { path: 'position/edit/:id', component: positionEdit, name: 'positionEdit', meta: { activeMenu: '/home/position/list' } }
    ]
  },
  {
    path: '/home',
    component: Home,
    children: [
      { path: 'structures/list', component: structuresList, name: 'structuresList', meta: { activeMenu: '/home/structures/list' } },
      { path: 'structures/add', component: structuresAdd, name: 'structuresAdd', meta: { activeMenu: '/home/structures/list' } },
      { path: 'structures/edit/:id', component: structuresEdit, name: 'structuresEdit', meta: { activeMenu: '/home/structures/list' } }
    ]
  },
  {
    path: '/home',
    component: Home,
    children: [
      { path: 'groups/list', component: groupsList, name: 'groupsList', meta: { activeMenu: '/home/groups/list' } },
      { path: 'groups/add', component: groupsAdd, name: 'groupsAdd', meta: { activeMenu: '/home/groups/list' } },
      { path: 'groups/edit/:id', component: groupsEdit, name: 'groupsEdit', meta: { activeMenu: '/home/groups/list' } }
    ]
  },
  {
    path: '/home',
    component: Home,
    children: [
      { path: 'users/list', component: usersList, name: 'usersList', meta: { activeMenu: '/home/users/list' } },
      { path: 'users/add', component: usersAdd, name: 'usersAdd', meta: { activeMenu: '/home/users/list' } },
      { path: 'users/edit/:id', component: usersEdit, name: 'usersEdit', meta: { activeMenu: '/home/users/list' } }
    ]
  }
]
export default routes

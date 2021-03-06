import Vue from 'vue'
import VueRouter from 'vue-router'
import NotFound from '../views/NotFound.vue'
import Posts from '../views/Posts.vue'
import SignIn from '../views/SignIn.vue'
import SignUp from '../views/SignUp.vue'
import store from '../store/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'root',
    redirect: '/posts'
  },
  {
    path: '/signin',
    name: 'sign-in',
    component: SignIn
  },
  {
    path: '/signup',
    name: 'sign-up',
    component: SignUp
  },
  {
    path: '/payment',
    name: 'payment',
    component: () => import('../views/Payment.vue')
  },
  {
    path: '/posts',
    name: 'posts',
    component: Posts
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('../views/Search.vue')
  },
  {
    path: '/posts/create',
    name: 'post-create',
    component: () => import('../views/PostCreate.vue')
  },
  {
    path: '/posts/:id/edit',
    name: 'post-edit',
    component: () => import('../views/PostEdit.vue')
  },
  {
    path: '/posts/:id',
    name: 'post',
    component: () => import('../views/Post.vue')
  },
  {
    path: '/posts/:id/replies',
    name: 'replies',
    component: () => import('../views/Reply.vue')
  },
  {
    path: '/users/stories',
    component: () => import('../views/UserStories.vue'),
    children: [
      {
        path: '',
        name: 'UserStoriesPosts',
        component: () => import('@/views/components/UserStoriesPosts.vue')
      },
      {
        path: 'drafts',
        name: 'UserStoriesDrafts',
        component: () => import('@/views/components/UserStoriesDrafts.vue')
      }
    ]
  },
  {
    path: '/users/edit',
    name: 'user-edit',
    component: () => import('../views/UserEdit.vue')
  },
  {
    path: '/users/:id',
    component: () => import('@/views/user/Index.vue'),
    children: [
      {
        path: '',
        name: 'users',
        component: () => import('../views/user/User.vue')
      },
      {
        path: 'claps',
        name: 'user-claps',
        component: () => import('../views/user/UserClaps.vue')
      },
      {
        path: 'highlights',
        name: 'user-highlights',
        component: () => import('../views/user/UserHighlights.vue')
      },
      {
        path: 'responses',
        name: 'user-responses',
        component: () => import('../views/user/UserResponses.vue')
      }
    ]
  },
  {
    path: '/users/:id/followings',
    name: 'user-followings',
    component: () => import('../views/UserFollowings.vue')
  },
  {
    path: '/users/:id/followers',
    name: 'user-followers',
    component: () => import('../views/UserFollowers.vue')
  },

  {
    path: '*',
    name: 'not-found',
    component: NotFound
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = store.state.isAuthenticated
  if (isAuthenticated) {
    store.dispatch('fetchCurrentUser')
  }
  next()
})

export default router

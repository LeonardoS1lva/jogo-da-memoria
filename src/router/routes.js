const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/MenuGame.vue'), name: 'MenuGame' },
      { path: '/game/:difficulty?', component: () => import('src/pages/GameScreen.vue'), name: 'Game' },
      {
        path: '/chooseDifficulty',
        component: () => import('src/pages/ChooseDifficulty.vue'),
        name: 'ChooseDifficulty',
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes

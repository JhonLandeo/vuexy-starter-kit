export default
{
    path: '/create-category',
    name: 'create-category',
    component: () => import('@/views/category/component/Grid.vue'),
    meta: {
      pageTitle: 'Crear categoría',
      breadcrumb: [
        {
          text: 'Crear categoría',
          active: true,
        },
      ],
    }
}
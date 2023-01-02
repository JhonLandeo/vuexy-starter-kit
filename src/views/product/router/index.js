export default
{
    path: '/create-product',
    name: 'create-product',
    component: () => import('@/views/product/component/Grid.vue'),
    meta: {
      pageTitle: 'Generar producto',
      breadcrumb: [
        {
          text: 'Crear Producto',
          active: true,
        },
      ],
    }
}
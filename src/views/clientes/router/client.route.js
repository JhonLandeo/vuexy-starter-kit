export default
{
    path: '/crear-cliente',
    name: 'crear-cliente',
    component: () => import('@/views/clientes/views/principal.vue'),
    meta: {
      pageTitle: 'Crear cliente',
      breadcrumb: [
        {
          text: 'Crear cliente',
          active: true,
        },
      ],
    }
}
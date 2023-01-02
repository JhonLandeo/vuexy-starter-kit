export default
{
    path: '/create-invoice',
    name: 'create-invoice',
    component: () => import('@/views/invoice/components/Principal'),
    meta: {
      pageTitle: 'Generar factura',
      breadcrumb: [
        {
          text: 'Generar Factura',
          active: true,
        },
      ],
    }
}
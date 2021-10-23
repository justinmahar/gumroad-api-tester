export const v2Api: RESTEndpoint[] = [
  {
    endpointUrl: '/licenses/disable',
    method: 'PUT',
    description: 'Disable a license',
    params: [
      { k: 'product_permalink', v: '' },
      { k: 'license_key', v: '' },
    ],
  },
  {
    endpointUrl: '/licenses/enable',
    method: 'PUT',
    description: 'Enable a license',
    params: [
      { k: 'product_permalink', v: '' },
      { k: 'license_key', v: '' },
    ],
  },
  {
    endpointUrl: '/licenses/verify',
    method: 'POST',
    description: 'Verify a license',
    params: [
      { k: 'license_key', v: '' },
      { k: 'increment_uses_count', v: 'true' },
      { k: 'decrement_uses_count', v: '' },
    ],
  },
  {
    endpointUrl: '/products',
    method: 'GET',
    description: 'Retrieve all of the existing products for the authenticated user.',
    params: [],
  },
  { endpointUrl: '/products/:id', method: 'DELETE', description: 'Permanently delete a product.', params: [] },
  { endpointUrl: '/products/:id', method: 'GET', description: 'Retrieve the details of a product.', params: [] },
  { endpointUrl: '/products/:id/disable', method: 'PUT', description: 'Disable an existing product.', params: [] },
  { endpointUrl: '/products/:id/enable', method: 'PUT', description: 'Enable an existing product.', params: [] },
  {
    endpointUrl: '/products/:product_id/custom_fields',
    method: 'GET',
    description: 'Retrieve all of the existing custom fields for a product.',
    params: [],
  },
  {
    endpointUrl: '/products/:product_id/custom_fields',
    method: 'POST',
    description: 'Create a new custom field for a product.',
    params: [
      { k: 'name', v: '' },
      { k: 'required', v: '' },
    ],
  },
  {
    endpointUrl: '/products/:product_id/custom_fields/:name',
    method: 'DELETE',
    description: "Permanently delete a product's custom field.",
    params: [],
  },
  {
    endpointUrl: '/products/:product_id/custom_fields/:name',
    method: 'PUT',
    description: "Edit an existing product's custom field.",
    params: [{ k: 'required', v: '' }],
  },
  {
    endpointUrl: '/products/:product_id/offer_codes',
    method: 'GET',
    description:
      'Retrieve all of the existing offer codes for a product. Either amount_cents or percent_off will be returned depending if the offer code is a fixed amount off or a percentage off. A universal offer code is one that applies to all products.',
    params: [],
  },
  {
    endpointUrl: '/products/:product_id/offer_codes',
    method: 'POST',
    description:
      'Create a new offer code for a product. Default offer code is in cents. A universal offer code is one that applies to all products.',
    params: [
      { k: 'name', v: '' },
      { k: 'amount_off', v: '100' },
      { k: 'offer_type', v: 'cents' },
    ],
  },
  {
    endpointUrl: '/products/:product_id/offer_codes/:id',
    method: 'DELETE',
    description: "Permanently delete a product's offer code.",
    params: [],
  },
  {
    endpointUrl: '/products/:product_id/offer_codes/:id',
    method: 'GET',
    description: 'Retrieve the details of a specific offer code of a product',
    params: [
      { k: 'name', v: '' },
      { k: 'amount_cents', v: '' },
    ],
  },
  {
    endpointUrl: '/products/:product_id/offer_codes/:id',
    method: 'PUT',
    description: "Edit an existing product's offer code.",
    params: [
      { k: 'offer_code', v: '' },
      { k: 'max_purchase_count', v: '' },
    ],
  },
  {
    endpointUrl: '/products/:product_id/subscribers',
    method: 'GET',
    description:
      "Retrieves all of the active subscribers for one of the authenticated user's products. Available with the 'view_sales' scope.",
    params: [{ k: 'email', v: '' }],
  },
  {
    endpointUrl: '/products/:product_id/variant_categories',
    method: 'GET',
    description: 'Retrieve all of the existing variant categories of a product.',
    params: [],
  },
  {
    endpointUrl: '/products/:product_id/variant_categories',
    method: 'POST',
    description: 'Create a new variant category on a product.',
    params: [{ k: 'title', v: '' }],
  },
  {
    endpointUrl: '/products/:product_id/variant_categories/:id',
    method: 'DELETE',
    description: 'Permanently delete a variant category of a product.',
    params: [],
  },
  {
    endpointUrl: '/products/:product_id/variant_categories/:id',
    method: 'GET',
    description: 'Retrieve the details of a variant category of a product.',
    params: [],
  },
  {
    endpointUrl: '/products/:product_id/variant_categories/:id',
    method: 'PUT',
    description: 'Edit a variant category of an existing product.',
    params: [{ k: 'title', v: '' }],
  },
  {
    endpointUrl: '/products/:product_id/variant_categories/:variant_category_id/variants',
    method: 'GET',
    description: 'Retrieve all of the existing variants in a variant category.',
    params: [],
  },
  {
    endpointUrl: '/products/:product_id/variant_categories/:variant_category_id/variants',
    method: 'POST',
    description: 'Create a new variant of a product.',
    params: [
      { k: 'name', v: '' },
      { k: 'price_difference_cents', v: '' },
      { k: 'max_purchase_count', v: '' },
    ],
  },
  {
    endpointUrl: '/products/:product_id/variant_categories/:variant_category_id/variants/:id',
    method: 'DELETE',
    description: 'Permanently delete a variant of a product.',
    params: [],
  },
  {
    endpointUrl: '/products/:product_id/variant_categories/:variant_category_id/variants/:id',
    method: 'GET',
    description: 'Retrieve the details of a variant of a product.',
    params: [],
  },
  {
    endpointUrl: '/products/:product_id/variant_categories/:variant_category_id/variants/:id',
    method: 'PUT',
    description: 'Edit a variant of an existing product.',
    params: [
      { k: 'name', v: '' },
      { k: 'price_difference_cents', v: '' },
      { k: 'max_purchase_count', v: '' },
    ],
  },
  {
    endpointUrl: '/resource_subscriptions',
    method: 'GET',
    description: 'Show all active subscriptions of user for the input resource.',
    params: [{ k: 'resource_name', v: 'sale' }],
  },
  {
    endpointUrl: '/resource_subscriptions',
    method: 'PUT',
    description:
      'Subscribe to a resource. Currently there are 8 supported resource names - "sale", "refund", "dispute", "dispute_won", "cancellation", "subscription_updated", "subscription_ended", and "subscription_restarted".',
    params: [
      { k: 'resource_name', v: 'sale' },
      { k: 'post_url', v: '' },
    ],
  },
  {
    endpointUrl: '/resource_subscriptions/:resource_subscription_id',
    method: 'DELETE',
    description: 'Unsubscribe from a resource.',
    params: [],
  },
  {
    endpointUrl: '/sales',
    method: 'GET',
    description:
      "Retrieves all of the successful sales by the authenticated user. Available with the 'view_sales' scope.",
    params: [
      { k: 'before', v: '' },
      { k: 'after', v: '' },
      { k: 'product_id', v: '' },
      { k: 'email', v: '' },
      { k: 'order_id', v: '' },
      { k: 'page', v: '' },
    ],
  },
  {
    endpointUrl: '/sales/:id',
    method: 'GET',
    description: "Retrieves the details of a sale by this user. Available with the 'view_sales' scope.",
    params: [],
  },
  {
    endpointUrl: '/sales/:id/mark_as_shipped',
    method: 'PUT',
    description: "Marks a sale as shipped. Available with the 'mark_sales_as_shipped' scope.",
    params: [{ k: 'tracking_url', v: '' }],
  },
  {
    endpointUrl: '/sales/:id/refund',
    method: 'PUT',
    description: "Refunds a sale. Available with the 'refund_sales' scope.",
    params: [{ k: 'amount_cents', v: '' }],
  },
  {
    endpointUrl: '/subscribers/:id',
    method: 'GET',
    description: "Retrieves the details of a subscriber to this user's product. Available with the 'view_sales' scope.",
    params: [],
  },
  { endpointUrl: '/user', method: 'GET', description: "Retrieve the user's data.", params: [] },
];

export type Param = { k: string; v: string };
export type RESTEndpoint = { endpointUrl: string; method: string; description: string; params: Param[] };

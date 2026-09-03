export const INITIAL_ADMIN_STATS = {
  totalSales: 482500,
  totalOrders: 142,
  totalCustomers: 118,
  totalProducts: 16,
  salesGrowth: '+18.4%',
  ordersGrowth: '+12.1%',
  customersGrowth: '+24.6%'
};

export const INITIAL_ADMIN_ORDERS = [
  { id: 'VAS20260001', customer: 'Ananya Roy', email: 'ananya@example.com', date: '2026-09-01', amount: 24999, status: 'Processing', payment: 'Paid (UPI)', itemsCount: 1 },
  { id: 'VAS20260002', customer: 'Priyanka Sharma', email: 'priyanka@example.com', date: '2026-08-31', amount: 15499, status: 'Shipped', payment: 'Paid (Card)', itemsCount: 1 },
  { id: 'VAS20260003', customer: 'Kavita Patel', email: 'kavita@example.com', date: '2026-08-30', amount: 34999, status: 'Delivered', payment: 'Paid (Net Banking)', itemsCount: 2 },
  { id: 'VAS20260004', customer: 'Rohan Verma', email: 'rohan@example.com', date: '2026-08-29', amount: 8999, status: 'Delivered', payment: 'Paid (UPI)', itemsCount: 1 },
  { id: 'VAS20260005', customer: 'Deepika Padukone', email: 'deepika@example.com', date: '2026-08-28', amount: 52998, status: 'Processing', payment: 'Paid (Card)', itemsCount: 3 }
];

export const INITIAL_ADMIN_CUSTOMERS = [
  { id: 'CUST-001', name: 'Ananya Roy', email: 'ananya@example.com', phone: '+91 98765 43210', ordersCount: 4, totalSpent: 62496, status: 'VIP Member', joinDate: '2026-01-15' },
  { id: 'CUST-002', name: 'Priyanka Sharma', email: 'priyanka@example.com', phone: '+91 98765 12345', ordersCount: 2, totalSpent: 30998, status: 'Active', joinDate: '2026-03-10' },
  { id: 'CUST-003', name: 'Kavita Patel', email: 'kavita@example.com', phone: '+91 98123 45678', ordersCount: 5, totalSpent: 89495, status: 'VIP Member', joinDate: '2025-11-20' },
  { id: 'CUST-004', name: 'Rohan Verma', email: 'rohan@example.com', phone: '+91 99887 76655', ordersCount: 1, totalSpent: 8999, status: 'Active', joinDate: '2026-08-29' },
  { id: 'CUST-005', name: 'Sunita Menon', email: 'sunita@example.com', phone: '+91 97654 32109', ordersCount: 3, totalSpent: 42997, status: 'Active', joinDate: '2026-04-05' }
];

export const MONTHLY_SALES_CHART = [
  { month: 'Mar', sales: 320000 },
  { month: 'Apr', sales: 380000 },
  { month: 'May', sales: 410000 },
  { month: 'Jun', sales: 390000 },
  { month: 'Jul', sales: 440000 },
  { month: 'Aug', sales: 482500 }
];

import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const orders = [
  {
    id: 'ORD-1001',
    date: '2024-06-01',
    status: 'Delivered',
    total: 120.0,
    items: 3,
  },
  {
    id: 'ORD-1002',
    date: '2024-05-28',
    status: 'Processing',
    total: 45.5,
    items: 1,
  },
  {
    id: 'ORD-1003',
    date: '2024-05-20',
    status: 'Cancelled',
    total: 89.99,
    items: 2,
  },
  {
    id: 'ORD-1004',
    date: '2024-05-15',
    status: 'Shipped',
    total: 67.0,
    items: 1,
  },
];

function StatusBadge({ status }) {
  const color =
    status === 'Delivered'
      ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
      : status === 'Processing'
      ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300'
      : status === 'Shipped'
      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
      : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300';
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${color}`}>
      {status}
    </span>
  );
}

export default function OrdersPage() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 dark:from-[#18181b] dark:via-[#232326] dark:to-[#18181b] text-gray-800 dark:text-white'>
      <Navigation />
      <section className='container mx-auto px-8 md:px-16 xl:px-32 py-16'>
        <div className='max-w-4xl mx-auto'>
          <div className='bg-white/80 dark:bg-gray-800/10 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/10 p-8 md:p-10'>
            <h1 className='text-3xl font-bold mb-8 text-center'>My Orders</h1>
            <div className='overflow-x-auto'>
              <table className='min-w-full text-sm'>
                <thead>
                  <tr className='text-left border-b border-gray-200 dark:border-gray-700'>
                    <th className='py-3 pr-6 font-semibold'>Order #</th>
                    <th className='py-3 pr-6 font-semibold'>Date</th>
                    <th className='py-3 pr-6 font-semibold'>Status</th>
                    <th className='py-3 pr-6 font-semibold'>Items</th>
                    <th className='py-3 pr-6 font-semibold'>Total</th>
                    <th className='py-3 font-semibold'></th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr
                      key={order.id}
                      className='border-b border-gray-100 dark:border-gray-800 hover:bg-[#f8e1da]/20 dark:hover:bg-[#232326]/40 transition'
                    >
                      <td className='py-4 pr-6 font-mono font-semibold'>
                        {order.id}
                      </td>
                      <td className='py-4 pr-6'>{order.date}</td>
                      <td className='py-4 pr-6'>
                        <StatusBadge status={order.status} />
                      </td>
                      <td className='py-4 pr-6'>{order.items}</td>
                      <td className='py-4 pr-6 font-semibold'>
                        GH₵{order.total.toFixed(2)}
                      </td>
                      <td className='py-4'>
                        <button className='px-4 py-2 rounded-lg bg-gradient-to-r from-[#d4845b] to-[#f1c3b5] text-white font-semibold hover:from-[#f1c3b5] hover:to-[#d4845b] transition-all duration-200 shadow'>
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                  {orders.length === 0 && (
                    <tr>
                      <td
                        colSpan={6}
                        className='py-8 text-center text-gray-400 dark:text-gray-500'
                      >
                        No orders found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

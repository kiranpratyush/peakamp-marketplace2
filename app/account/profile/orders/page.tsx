import { getOrderDetailsForUser } from "./actions/getOrderDetails";
import { statusIcon } from "./statusIcon";

export default async function OrdersList() {
  const orders = await getOrderDetailsForUser("dummy@example.com");

  return (
    <section className="bg-white  antialiased dark:bg-gray-900">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <div className="mx-auto max-w-5xl">
          <div className="gap-4 sm:flex sm:items-center sm:justify-between">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
              My orders
            </h2>
          </div>
          <div className="mt-6 flow-root sm:mt-8">
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="flex flex-wrap items-center gap-y-4 py-6"
                >
                  <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                    <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                      Order ID:
                    </dt>
                    <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                      <a href="#" className="hover:underline">
                        #{order.id}
                      </a>
                    </dd>
                  </dl>
                  <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                    <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                      Date:
                    </dt>
                    <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                      {order.createdAt.toDateString()}
                    </dd>
                  </dl>

                  <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                    <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                      Status:
                    </dt>
                    <dd className="me-2 mt-1.5 inline-flex items-center rounded px-2.5 py-0.5 text-xs font-medium bg-primary-highlight">
                      {statusIcon(order.status)}
                      {order.status}
                    </dd>
                  </dl>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

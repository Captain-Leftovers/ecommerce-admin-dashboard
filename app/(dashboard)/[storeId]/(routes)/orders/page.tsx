import { format } from 'date-fns'

import prismaDB from '@/lib/prismaDB'
import OrderClient from './components/OrderClient'
import { OrderColumn } from './components/Columns'
import { formatter } from '@/lib/utils'

export default async function OrdersPage({
	params,
}: {
	params: { storeId: string }
}) {
	const orders = await prismaDB.order.findMany({
		where: { storeId: params.storeId },
		include: {
			orderItems: {
				include: { product: true },
			},
		},
		orderBy: { createdAt: 'desc' },
	})

	const formattedOrders: OrderColumn[] = orders.map((item) => ({
		id: item.id,
		phone: item.phone,
		address: item.address,
		products: item.orderItems
			.map((orderItem) => orderItem.product.name)
			.join(', '),

		totalPrice: formatter.format(
			item.orderItems.reduce((total, item) => {
				return total + Number(item.product.price)
			}, 0)
		),
		isPaid: item.isPaid,
		createdAt: format(item.createdAt, 'dd/MMMM/yyyy'),
	}))

	return (
		<div className="flex-col ">
			<div className="flex-1 space-y-4 p-8 pt-6">
				<OrderClient data={formattedOrders} />
			</div>
		</div>
	)
}

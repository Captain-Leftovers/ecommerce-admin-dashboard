import { format } from 'date-fns'

import prismaDB from '@/lib/prismaDB'
import BillboardClient from './components/BillboardClient'
import { BillboardColumn } from './components/Columns'

export default async function BillboardsPage({
	params,
}: {
	params: { storeId: string }
}) {
	const billboards = await prismaDB.billboard.findMany({
		where: { storeId: params.storeId },
		orderBy: { createdAt: 'desc' },
	})

	const formattedBillboards: BillboardColumn[] = billboards.map((item) => ({
		id: item.id,
		label: item.label,
		createdAt: format(item.createdAt, 'dd/MMMM/yyyy'),
	}))

	return (
		<div className="flex-col ">
			<div className="flex-1 space-y-4 p-8 pt-6">
				<BillboardClient data={formattedBillboards} />
			</div>
		</div>
	)
}

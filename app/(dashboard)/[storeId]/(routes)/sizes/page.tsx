import { format } from 'date-fns'

import prismaDB from '@/lib/prismaDB'
import SizeClient from './components/SizesClient'
import { SizeColumn } from './components/Columns'

export default async function SizesPage({
	params,
}: {
	params: { storeId: string }
}) {
	const sizes = await prismaDB.size.findMany({
		where: { storeId: params.storeId },
		orderBy: { createdAt: 'desc' },
	})

	const formattedsizes: SizeColumn[] = sizes.map((item) => ({
		id: item.id,
		name: item.name,
		value: item.value,
		createdAt: format(item.createdAt, 'dd/MMMM/yyyy'),
	}))

	return (
		<div className="flex-col ">
			<div className="flex-1 space-y-4 p-8 pt-6">
				<SizeClient data={formattedsizes} />
			</div>
		</div>
	)
}

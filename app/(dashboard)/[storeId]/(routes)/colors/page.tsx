import { format } from 'date-fns'

import prismaDB from '@/lib/prismaDB'
import ColorsClient from './components/ColorsClient' 
import { ColorColumn } from './components/Columns'

export default async function ColorsPage({
	params,
}: {
	params: { storeId: string }
}) {
	const colors = await prismaDB.color.findMany({
		where: { storeId: params.storeId },
		orderBy: { createdAt: 'desc' },
	})

	const formattedColors: ColorColumn[] = colors.map((item) => ({
		id: item.id,
		name: item.name,
		value: item.value,
		createdAt: format(item.createdAt, 'dd/MMMM/yyyy'),
	}))

	return (
		<div className="flex-col ">
			<div className="flex-1 space-y-4 p-8 pt-6">
				<ColorsClient data={formattedColors} />
			</div>
		</div>
	)
}

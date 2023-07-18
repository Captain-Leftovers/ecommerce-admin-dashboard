'use client'

import { Separator } from '@/components/ui/Separator'
import { OrderColumn, columns } from './Columns'
import { DataTable } from '@/components/ui/DataTable'
import Heading from '@/components/ui/Heading'

type OrderClientProps = {
	data: OrderColumn[]
}

export default function OrderClient({ data }: OrderClientProps) {
	return (
		<>
			<Heading
				title={`Orders (${data.length})`}
				description="Manage your store orders."
			/>

			<Separator />

			<DataTable columns={columns} data={data} searchKey="label" />
			<Heading title="API" description="API calls for Billboards" />
		</>
	)
}



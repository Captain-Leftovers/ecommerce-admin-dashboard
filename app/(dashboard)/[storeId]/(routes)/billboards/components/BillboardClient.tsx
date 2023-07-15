'use client'

import { Button } from '@/components/ui/Button'
import Heading from '@/components/ui/Heading'
import { Separator } from '@/components/ui/Separator'
import { Plus } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { BillboardColumn, columns } from './Columns'
import { DataTable } from '@/components/ui/DataTable'

type BillboardClientProps = {
	data: BillboardColumn[]
}

export default function BillboardClient({ data }: BillboardClientProps) {
	const router = useRouter()
	const params = useParams()

	return (
		<>
			<div className="flex items-center justify-between ">
				<Heading
					title={`Billboards (${data.length})`}
					description="Manage your store billboards."
				/>
				<Button
					onClick={() => {
						router.push(`/${params.storeId}/billboards/new`)
					}}
				>
					<Plus className="mr-2 h-4 w-4" />
					Add New
				</Button>
			</div>

			<Separator />

			<DataTable columns={columns} data={data} searchKey="label" />
		</>
	)
}

'use client'

import { Button } from '@/components/ui/Button'
import Heading from '@/components/ui/Heading'
import { Separator } from '@/components/ui/Separator'
import { Plus } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { ColorColumn, columns } from './Columns'
import { DataTable } from '@/components/ui/DataTable'
import ApiList from '@/components/ui/ApiList'

type ColorsClientProps = {
	data: ColorColumn[]
}

export default function ColorsClient({ data }: ColorsClientProps) {
	const router = useRouter()
	const params = useParams()

	return (
		<>
			<div className="flex items-center justify-between ">
				<Heading
					title={`Colors (${data.length})`}
					description="Manage colors for your store."
				/>
				<Button
					onClick={() => {
						router.push(`/${params.storeId}/colors/new`)
					}}
				>
					<Plus className="mr-2 h-4 w-4" />
					Add New
				</Button>
			</div>

			<Separator />

			<DataTable columns={columns} data={data} searchKey="name" />
			<Heading title="API" description="API calls for Colors" />
			<Separator />
			<ApiList entityIdName="colorId" entityName="colors" />
		</>
	)
}

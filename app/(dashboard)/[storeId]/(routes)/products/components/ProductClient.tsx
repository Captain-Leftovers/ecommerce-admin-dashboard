'use client'

import { Button } from '@/components/ui/Button'
import Heading from '@/components/ui/Heading'
import { Separator } from '@/components/ui/Separator'
import { Plus } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { ProductColumn, columns } from './Columns'
import { DataTable } from '@/components/ui/DataTable'
import ApiList from '@/components/ui/ApiList'

type ProductClientProps = {
	data: ProductColumn[]
}

export default function ProductClient({ data }: ProductClientProps) {
	const router = useRouter()
	const params = useParams()

	return (
		<>
			<div className="flex items-center justify-between ">
				<Heading
					title={`Products (${data.length})`}
					description="Manage your store products."
				/>
				<Button
					onClick={() => {
						router.push(`/${params.storeId}/products/new`)
					}}
				>
					<Plus className="mr-2 h-4 w-4" />
					Add New
				</Button>
			</div>

			<Separator />

			<DataTable columns={columns} data={data} searchKey="label" />
			<Heading title="API" description="API calls for Products" />
			<Separator />
			<ApiList entityIdName="productId" entityName="products" />
		</>
	)
}

'use client'

import { Button } from '@/components/ui/Button'
import Heading from '@/components/ui/Heading'
import { Separator } from '@/components/ui/Separator'
import { Plus } from 'lucide-react'

export default function BillboardClient() {
	return (
		<>
			<div className="flex items-center justify-between ">
				<Heading
					title="Billboards (0)"
					description="Manage your store billboards."
				/>
				<Button>
					<Plus className="mr-2 h-4 w-4" />
					Add New
				</Button>
			</div>

			<Separator />
		</>
	)
}

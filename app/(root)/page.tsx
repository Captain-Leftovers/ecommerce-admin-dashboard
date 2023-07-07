'use client'

import { Modal } from '@/components/ui/modal'
import { title } from 'process'

export default function RootPage() {
	return (
		<div className="p-4">
			<Modal
				isOpen
				onClose={() => {}}
				title="testing modal"
				description="test description"
			>
				Children
			</Modal>
		</div>
	)
}

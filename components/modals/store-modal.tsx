'use client'

import { useStoreModal } from '@/hooks/use-store-modal'
import { Modal } from '@/components/ui/modal'

export const StoreModal = () => {
	const storeModal = useStoreModal()

	return (
		<Modal
			title="crete store"
			description="add a new store to manage products"
			isOpen={storeModal.isOpen}
			onClose={storeModal.onClose}
		>
			Future Create Store Form
		</Modal>
	)
}

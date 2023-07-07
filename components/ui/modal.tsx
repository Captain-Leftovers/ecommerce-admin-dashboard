'use client'

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from './dialog'

type modalProps = {
	title: string
	description: string
	isOpen: boolean
	onClose: () => void
	children?: React.ReactNode
}

export function modal({
	title,
	description,
	isOpen,
	onClose,
	children,
}: modalProps) {
	const onChange = (open: boolean) => {
		if (!open) {
			onClose()
		}
	}

	return (
		<Dialog open={isOpen} onOpenChange={onChange}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
					<DialogDescription>{description}</DialogDescription>
				</DialogHeader>
                <div>
                    {children}
                </div>
			</DialogContent>
		</Dialog>
	)
}

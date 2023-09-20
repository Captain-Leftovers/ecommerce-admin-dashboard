'use client'

import { Button } from '@/components/ui/Button'
import { Copy } from 'lucide-react'

export default function TestCredentials() {
	const email = 'test.with.me.test@gmail.com'
	const pass = '123456'

	const copyEmail = () => navigator.clipboard.writeText(email)
	const copyPass = () => navigator.clipboard.writeText(pass)

	return (
		<div className="flex flex-col gap-2 mt-32 ">
			<p className="mx-auto text-sm font-medium pr-1">Guest</p>
			<Button
				onClick={copyEmail}
				className="mb-8 p-2 bg-[#103FEF] hover:bg-[#092ba5] active:scale-95 transform origin-center transition-transform"
			>
				<div className="flex items-center w-full">
					<p className="pr-2">email</p>
					<Copy size={12} />
				</div>
			</Button>
			<Button
				onClick={copyPass}
				className="mb-8 p-2 bg-[#103FEF] hover:bg-[#092ba5] active:scale-95 transform origin-center transition-transform"
			>
				<div className="flex items-center w-full">
					<p className="pr-4">pass</p>
					<Copy size={12} />
				</div>
			</Button>
		</div>
	)
}

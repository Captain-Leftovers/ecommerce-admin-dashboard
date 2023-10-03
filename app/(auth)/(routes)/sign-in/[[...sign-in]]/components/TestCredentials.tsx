'use client'

import { Button } from '@/components/ui/Button'
import { Copy } from 'lucide-react'

export default function TestCredentials() {
	const email = 'test.with.me.test@gmail.com'
	const pass = '123456'

	const copyEmail = () => navigator.clipboard.writeText(email)
	const copyPass = () => navigator.clipboard.writeText(pass)

	return (
		<div className="absolute bottom-9 sm:bottom-2 left-1/2 -translate-x-1/2 z-40 flex items-center justify-center gap-2 w-full animate-show ">
			<p className=" absolute left-8 sm:left-[60px] text-center text-black text-sm justify font-medium pr-1 whitespace-nowrap">
				Guest &#8594;
			</p>
			<Button
				onClick={copyEmail}
				className="p-2 bg-[#103FEF] hover:bg-[#092ba5] active:scale-95 transform origin-center transition-transform"
			>
				<div className="flex items-center w-full">
					<p className="pr-2 text-white">email</p>
					<Copy size={12} />
				</div>
			</Button>
			<Button
				onClick={copyPass}
				className=" p-2 bg-[#103FEF] hover:bg-[#092ba5] active:scale-95 transform origin-center transition-transform"
			>
				<div className="flex items-center w-full">
					<p className="pr-4 text-white">pass</p>
					<Copy size={12} />
				</div>
			</Button>
		</div>
	)
}

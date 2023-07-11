import { UserButton } from '@clerk/nextjs'
import MainNav from '@/components/MainNav'

type NavbarProps = {}

export default function Navbar({}: NavbarProps) {
	return (
		<div className="border-b ">
			<div className="flex h-16 items-center px-4">
				<div>This is store switcher</div>
				<MainNav className='mx-6' />
				<div className="ml-auto flex items-center space-x-4">
					<UserButton afterSignOutUrl="/" />
				</div>
			</div>
		</div>
	)
}

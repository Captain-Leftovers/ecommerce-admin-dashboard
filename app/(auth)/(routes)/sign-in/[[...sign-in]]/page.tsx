

import { ClerkLoaded, ClerkLoading, SignIn } from '@clerk/nextjs'
import TestCredentials from './components/TestCredentials'
import LoadingSpinner from '@/components/ui/LoadingSpinner'

export default function Page() {
	return (
		<div className="relative">
			<ClerkLoading>
				<LoadingSpinner />
			</ClerkLoading>
			<ClerkLoaded>
				<SignIn />
				{<TestCredentials />}
			</ClerkLoaded>
		</div>
	)
}

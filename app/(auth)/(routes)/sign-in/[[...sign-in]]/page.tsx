import { SignIn } from '@clerk/nextjs'
import TestCredentials from './components/TestCredentials'

export default function Page() {
	return (
		<>
			<TestCredentials />
			<SignIn />
		</>
	)
}

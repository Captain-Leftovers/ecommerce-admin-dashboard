import prismaDB from '@/lib/prismaDB'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import SettingsForm from './components/SettingsForm'

type SettingsPageProps = {
	params: {
		storeId: string
	}
}
export default async function SettingsPage({
	params: { storeId },
}: SettingsPageProps) {
	const { userId } = auth()

	if (!userId) {
		redirect('/sign-in')
	}

	const store = await prismaDB.store.findFirst({
		where: {
			id: storeId,
			userId,
		},
	})

	if (!store) {
		redirect('/')
	}

	return (
		<div className="flex-col">
			<div className="flex-1 space-y-4 p-8 pt-6">
        <SettingsForm initialData={store} />
        </div>
		</div>
	)
}

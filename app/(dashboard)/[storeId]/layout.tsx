import prismaDB from '@/lib/prismaDB'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

type DashboardLayoutProps = {
	children: React.ReactNode
	params: {
		storeId: string
	}
}

export default async function DashboardLayout({
	children,
	params,
}: DashboardLayoutProps) {
	const { userId } = auth()

	if (!userId) {
		redirect('/sign-in')
	}

	const store = await prismaDB.store.findFirst({
		where: {
			id: params.storeId,
			userId: userId,
		},
	})

	return <div>layout</div>
}

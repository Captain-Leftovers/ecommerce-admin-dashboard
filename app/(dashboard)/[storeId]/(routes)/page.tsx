import prismaDB from "@/lib/prismaDB"

type DashboardPageProps = {
	params: {
		storeId: string
	}
}

export default async function DashboardPage({ params: { storeId } }: DashboardPageProps) {

	const store = await prismaDB.store.findFirst({
		where: {
			id: storeId
		}
	})



	return <div>
		Dashboard Page &rarr;
		Active Store: {store?.name}
	</div>


}

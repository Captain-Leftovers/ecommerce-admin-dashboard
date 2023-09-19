import prismaDB from '@/lib/prismaDB'

export default async function getSalesCount(storeId: string) {
	const salesCount = await prismaDB.order.count({
		where: {
			storeId,
			isPaid: true,
		},
	})

	return salesCount
}

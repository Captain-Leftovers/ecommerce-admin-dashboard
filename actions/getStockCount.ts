import prismaDB from '@/lib/prismaDB'

export default async function getStockCount(storeId: string) {
	const stockCount = await prismaDB.product.count({
		where: {
			storeId,
			isArchived: false,
		},
	})

	return stockCount
}

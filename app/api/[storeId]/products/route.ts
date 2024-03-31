import prismaDB from '@/lib/prismaDB'
import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

export async function POST(
	req: Request,
	{ params }: { params: { storeId: string } }
) {
	try {
		const { userId } = auth()
		const body = await req.json()

		if (!userId) {
			return new NextResponse('Unauthenticated', { status: 401 })
		}

		const {
			name,
			price,
			categoryId,
			sizeId,
			colorId,
			images,
			isFeatured,
			isArchived,
		} = body

		if (!name) {
			return new NextResponse('Name is required', { status: 400 })
		}

		if (!images || !images.length) {
			return new NextResponse('Images are required', { status: 400 })
		}
		if (!price) {
			return new NextResponse('Price is required', { status: 400 })
		}
		if (!categoryId) {
			return new NextResponse('CategoryId is required', { status: 400 })
		}
		if (!sizeId) {
			return new NextResponse('SizeId is required', { status: 400 })
		}
		if (!colorId) {
			return new NextResponse('ColorId is required', { status: 400 })
		}

		if (!params.storeId) {
			return new NextResponse('StoreId is required', { status: 400 })
		}

		const storeByUserId = await prismaDB.store.findFirst({
			where: {
				id: params.storeId,
				userId: userId,
			},
		})

		if (!storeByUserId) {
			return new NextResponse('Unauthorized', { status: 403 })
		}

		// const product = await prismaDB.product.create({
		// 	data: {
		// 		price: price,
		// 		name: name,
		// 		isFeatured: isFeatured,
		// 		isArchived: isArchived,
		// 		categoryId: categoryId,
		// 		sizeId: sizeId,
		// 		colorId: colorId,
		// 		storeId: params.storeId,
		// 		images: {
		// 			createMany: {
		// 				data: [
		// 					...images.map((image: { url: string }) => image),
		// 				],
		// 			},
		// 		},
		// 	},
		// })
		
		const product = await prismaDB.product.create({
			data: {
				price: price,
				name: name,
				isFeatured: isFeatured,
				isArchived: isArchived,
				categoryId: categoryId,
				sizeId: sizeId,
				colorId: colorId,
				storeId: params.storeId,
			},
		})

		for (const image of images) {
			await prismaDB.image.create({
				data: {
					productId: product.id,
					url: image.url,
				},
			})
		}


		
		




		return NextResponse.json(product)
	} catch (error) {
		console.log('[PRODUCTS_POST]', error)
		return new NextResponse('Internal Server Error', { status: 500 })
	}
}

export async function GET(
	req: Request,
	{ params }: { params: { storeId: string } }
) {
	try {
		const { searchParams } = new URL(req.url)

		const categoryId = searchParams.get('categoryId') || undefined
		const colorId = searchParams.get('colorId') || undefined
		const sizeId = searchParams.get('sizeId') || undefined
		const isFeatured = searchParams.get('isFeatured')

		if (!params.storeId) {
			return new NextResponse('StoreId is required', { status: 400 })
		}

		const products = await prismaDB.product.findMany({
			where: {
				storeId: params.storeId,
				categoryId,
				colorId,
				sizeId,
				isFeatured: isFeatured ? true : undefined,
				isArchived: false,
			},
			include: {
				images: true,
				category: true,
				size: true,
				color: true,
			},
			orderBy: {
				createdAt: 'desc',
			},
		})

		return NextResponse.json(products)
	} catch (error) {
		console.log('[PRODUCTS_GET]', error)
		return new NextResponse('Internal Server Error', { status: 500 })
	}
}


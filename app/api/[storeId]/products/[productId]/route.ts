import prismaDB from '@/lib/prismaDB'
import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

export async function PATCH(
	req: Request,
	{ params }: { params: { storeId: string; productId: string } }
) {
	try {
		const { userId } = auth()
		const body = await req.json()
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

		if (!userId) {
			return new NextResponse('Unauthorized', { status: 401 })
		}

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
		if (!params.productId) {
			return new NextResponse('Missing ProductproductId', { status: 400 })
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

		await prismaDB.product.update({
			where: {
				id: params.productId,
			},
			data: {
				name: name,
				price: price,
				colorId: colorId,
				sizeId: sizeId,
				categoryId: categoryId,
				images: {
					deleteMany: {},
				},
				isFeatured: isFeatured,
				isArchived: isArchived,
			},
		})

		// const product = await prismaDB.product.update({
		// 	where: {
		// 		id: params.productId,
		// 	},
		// 	data: {
		// 		images: {
		// 			// TODO - Fix this createMany not available in sqlite
		// 			createMany: {
		// 				data: [
		// 					...images.map((image: { url: string }) => image),
		// 				],
		// 			},
		// 		},
		// 	},
		// })

		for (const image of images) {
			await prismaDB.image.create({
				data: {
					productId: params.productId,
					url: image.url,
				},
			})
		}

		const product = await prismaDB.product.findUnique({
			where: {
				id: params.productId,
			},
			include: {
				images: true,
				category: true,
				size: true,
				color: true,
			},
		})

		return NextResponse.json(product)
	} catch (error) {
		console.log('[PRODUCT_PATCH_ERROR]', error)
		return new NextResponse('Internal error', { status: 500 })
	}
}

export async function DELETE(
	req: Request,
	{
		params,
	}: {
		params: { storeId: string; productId: string }
	}
) {
	try {
		const { userId } = auth()

		if (!userId) {
			return new NextResponse('Unauthorized', { status: 401 })
		}

		if (!params.productId) {
			return new NextResponse('Missing ProductId', { status: 400 })
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

		const product = await prismaDB.product.deleteMany({
			where: {
				id: params.productId,
			},
		})

		return NextResponse.json(product)
	} catch (error) {
		console.log('[PRODUCT_DELETE_ERROR]', error)
		return new NextResponse('Internal error', { status: 500 })
	}
}

export async function GET(
	req: Request,
	{
		params,
	}: {
		params: { productId: string }
	}
) {
	try {
		if (!params.productId) {
			return new NextResponse('Missing ProductId', { status: 400 })
		}

		const product = await prismaDB.product.findUnique({
			where: {
				id: params.productId,
			},
			include: {
				images: true,
				category: true,
				size: true,
				color: true,
			},
		})

		return NextResponse.json(product)
	} catch (error) {
		console.log('[PRODUCT_GET_ERROR]', error)
		return new NextResponse('Internal error', { status: 500 })
	}
}

import prismaDB from '@/lib/prismaDB'
import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

export async function PATCH(
	req: Request,
	{ params }: { params: { storeId: string; categoryId: string } }
) {
	try {
		const { userId } = auth()
		const body = await req.json()
		const { name, billboardId } = body

		if (!userId) {
			return new NextResponse('Unauthorized', { status: 401 })
		}

		if (!name) {
			return new NextResponse('Missing Name', { status: 400 })
		}

		if (!billboardId) {
			return new NextResponse('Missing Billboard Id', { status: 400 })
		}

		if (!params.categoryId) {
			return new NextResponse('Missing Category Id', { status: 400 })
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

		const category = await prismaDB.category.updateMany({
			where: {
				id: params.categoryId,
			},
			data: {
				name: name,
				billboardId: billboardId,
			},
		})

		return NextResponse.json(category)
	} catch (error) {
		console.log('[CATEGORY_PATCH_ERROR]', error)
		return new NextResponse('Internal error', { status: 500 })
	}
}

export async function DELETE(
	req: Request,
	{
		params,
	}: {
		params: { storeId: string; categoryId: string }
	}
) {
	try {
		const { userId } = auth()

		if (!userId) {
			return new NextResponse('Unauthorized', { status: 401 })
		}

		if (!params.categoryId) {
			return new NextResponse('Missing Category Id', { status: 400 })
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

		const category = await prismaDB.category.deleteMany({
			where: {
				id: params.categoryId,
			},
		})

		return NextResponse.json(category)
	} catch (error) {
		console.log('[CATEGORY_DELETE_ERROR]', error)
		return new NextResponse('Internal error', { status: 500 })
	}
}

export async function GET(
	req: Request,
	{
		params,
	}: {
		params: { categoryId: string }
	}
) {
	try {
		if (!params.categoryId) {
			return new NextResponse('Missing Category Id', { status: 400 })
		}

		const category = await prismaDB.category.findUnique({
			where: {
				id: params.categoryId,
			},
			include: {
				billboard: true,
			},
		})

		return NextResponse.json(category)
	} catch (error) {
		console.log('[CATEGORY_GET_ERROR]', error)
		return new NextResponse('Internal error', { status: 500 })
	}
}

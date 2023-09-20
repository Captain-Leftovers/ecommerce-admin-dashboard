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

		const { name, billboardId } = body

		if (!name) {
			return new NextResponse('Name is required', { status: 400 })
		}
		if (!billboardId) {
			return new NextResponse('Billboard Id is required', { status: 400 })
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

		const category = await prismaDB.category.create({
			data: {
				billboardId: billboardId,
				name: name,
				storeId: params.storeId,
			},
		})

		return NextResponse.json(category)
	} catch (error) {
		console.log('[CATEGORIES_POST]', error)
		return new NextResponse('Internal Server Error', { status: 500 })
	}
}

export async function GET(
	req: Request,
	{ params }: { params: { storeId: string } }
) {
	try {
		if (!params.storeId) {
			return new NextResponse('StoreId is required', { status: 400 })
		}

		const categories = await prismaDB.category.findMany({
			where: {
				storeId: params.storeId,
			},
		})

		return NextResponse.json(categories)
	} catch (error) {
		console.log('[CATEGORIES_GET]', error)
		return new NextResponse('Internal Server Error', { status: 500 })
	}
}



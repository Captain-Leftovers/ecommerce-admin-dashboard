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

		const { label, imageUrl } = body

		if (!label) {
			return new NextResponse('Label is required', { status: 400 })
		}
		if (!imageUrl) {
			return new NextResponse('ImageUrl is required', { status: 400 })
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
			return new NextResponse('Unauthorized', { status: 401 })
		}

		const billboard = await prismaDB.billboard.create({
			data: {
				imageUrl: imageUrl,
				label: label,
				storeId: params.storeId,
			},
		})

		return NextResponse.json(billboard)
	} catch (error) {
		console.log('[BILLBOARDS_POST]', error)
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

		const billboards = await prismaDB.billboard.findMany({
			where: {
				storeId: params.storeId,
			},
		})

		return NextResponse.json(billboards)
	} catch (error) {
		console.log('[BILLBOARDS_GET]', error)
		return new NextResponse('Internal Server Error', { status: 500 })
	}
}

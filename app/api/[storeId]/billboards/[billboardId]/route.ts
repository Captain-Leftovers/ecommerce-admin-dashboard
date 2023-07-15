import prismaDB from '@/lib/prismaDB'
import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

export async function PATCH(
	req: Request,
	{ params }: { params: { storeId: string; billboardId: string } }
) {
	try {
		const { userId } = auth()
		const body = await req.json()
		const { label, imageUrl } = body

		if (!userId) {
			return new NextResponse('Unauthorized', { status: 401 })
		}

		if (!label) {
			return new NextResponse('Missing label', { status: 400 })
		}

		if (!imageUrl) {
			return new NextResponse('Missing imageUrl', { status: 400 })
		}

		if (!params.billboardId) {
			return new NextResponse('Missing BillboardId', { status: 400 })
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

		const billboard = await prismaDB.billboard.updateMany({
			where: {
				id: params.billboardId,
			},
			data: {
				label: label,
				imageUrl: imageUrl,
			},
		})

		return NextResponse.json(billboard)
	} catch (error) {
		console.log('[BILLBOARD_PATCH_ERROR]', error)
		return new NextResponse('Internal error', { status: 500 })
	}
}

export async function DELETE(
	req: Request,
	{
		params,
	}: {
		params: { storeId: string; billboardId: string }
	}
) {
	try {
		const { userId } = auth()

		if (!userId) {
			return new NextResponse('Unauthorized', { status: 401 })
		}

		if (!params.billboardId) {
			return new NextResponse('Missing BillboardId', { status: 400 })
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

		const billboard = await prismaDB.billboard.deleteMany({
			where: {
				id: params.billboardId,
			},
		})

		return NextResponse.json(billboard)
	} catch (error) {
		console.log('[BILLBOARD_DELETE_ERROR]', error)
		return new NextResponse('Internal error', { status: 500 })
	}
}

export async function GET(
	req: Request,
	{
		params,
	}: {
		params: { billboardId: string }
	}
) {
	try {
		if (!params.billboardId) {
			return new NextResponse('Missing BillboardId', { status: 400 })
		}

		const billboard = await prismaDB.billboard.findUnique({
			where: {
				id: params.billboardId,
			},
		})

		return NextResponse.json(billboard)
	} catch (error) {
		console.log('[BILLBOARD_GET_ERROR]', error)
		return new NextResponse('Internal error', { status: 500 })
	}
}

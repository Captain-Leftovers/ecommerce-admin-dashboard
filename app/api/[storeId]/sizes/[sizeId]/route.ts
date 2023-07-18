import prismaDB from '@/lib/prismaDB'
import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

export async function PATCH(
	req: Request,
	{ params }: { params: { storeId: string; sizeId: string } }
) {
	try {
		const { userId } = auth()
		const body = await req.json()
		const { name, value } = body

		if (!userId) {
			return new NextResponse('Unauthorized', { status: 401 })
		}

		if (!name) {
			return new NextResponse('Missing name', { status: 400 })
		}

		if (!value) {
			return new NextResponse('Missing value', { status: 400 })
		}

		if (!params.sizeId) {
			return new NextResponse('Missing SizeId', { status: 400 })
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

		const size = await prismaDB.size.updateMany({
			where: {
				id: params.sizeId,
			},
			data: {
				name: name,
				value: value,
			},
		})

		return NextResponse.json(size)
	} catch (error) {
		console.log('[SIZE_PATCH_ERROR]', error)
		return new NextResponse('Internal error', { status: 500 })
	}
}

export async function DELETE(
	req: Request,
	{
		params,
	}: {
		params: { storeId: string; sizeId: string }
	}
) {
	try {
		const { userId } = auth()

		if (!userId) {
			return new NextResponse('Unauthorized', { status: 401 })
		}

		if (!params.sizeId) {
			return new NextResponse('Missing SizeId', { status: 400 })
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

		const size = await prismaDB.size.deleteMany({
			where: {
				id: params.sizeId,
			},
		})

		return NextResponse.json(size)
	} catch (error) {
		console.log('[SIZE_DELETE_ERROR]', error)
		return new NextResponse('Internal error', { status: 500 })
	}
}

export async function GET(
	req: Request,
	{
		params,
	}: {
		params: { sizeId: string }
	}
) {
	try {
		if (!params.sizeId) {
			return new NextResponse('Missing SizeId', { status: 400 })
		}

		const size = await prismaDB.size.findUnique({
			where: {
				id: params.sizeId,
			},
		})

		return NextResponse.json(size)
	} catch (error) {
		console.log('[SIZE_GET_ERROR]', error)
		return new NextResponse('Internal error', { status: 500 })
	}
}

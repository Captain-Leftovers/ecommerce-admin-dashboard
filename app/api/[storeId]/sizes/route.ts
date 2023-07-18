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

		const { name, value } = body

		if (!name) {
			return new NextResponse('Name is required', { status: 400 })
		}
		if (!value) {
			return new NextResponse('Value is required', { status: 400 })
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

		const size = await prismaDB.size.create({
			data: {
				value: value,
				name: name,
				storeId: params.storeId,
			},
		})

		return NextResponse.json(size)
	} catch (error) {
		console.log('[SIZES_POST]', error)
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

		const sizes = await prismaDB.size.findMany({
			where: {
				storeId: params.storeId,
			},
		})

		return NextResponse.json(sizes)
	} catch (error) {
		console.log('[SIZES_GET]', error)
		return new NextResponse('Internal Server Error', { status: 500 })
	}
}

//TODO : remember if you have error somewhere that params are the second argument of the function thats why we need re:Request as the first argument

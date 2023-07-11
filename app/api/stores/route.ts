import prismaDB from "@/lib/prismaDB";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";


export async function POST(req: Request) {

    try {
        const { userId } = auth()
        const body = await req.json();

        if(!userId) {
            return new NextResponse('Unauthorized', { status: 401});
        }

        const { name } = body;

        if(!name) {
            return new NextResponse('Name is required', { status: 400});
        }


        const store = await prismaDB.store.create({
            data:{
                userId: userId,
                name: name
            } 
        })


            return NextResponse.json(store)

    } catch (error) {
        console.log('[STORES_POST]', error);
        return new NextResponse('Internal Server Error', { status: 500});
    }
}
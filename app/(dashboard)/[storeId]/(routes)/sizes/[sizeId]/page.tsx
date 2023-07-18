import prismaDB from '@/lib/prismaDB'
import SizeForm from './components/SizeForm'

type SizePageProps = {
	params: {
		sizeId: string
	}
}

export default async function SizePage({ params }: SizePageProps) {
	const size = await prismaDB.size.findUnique({
		where: {
			id: params.sizeId,
		},
	})

	return (
		<div className="flex-col">
			<div className="flex-1 space-y-4 p-8 pt-6">
				<SizeForm initialData={size} />
			</div>
		</div>
	)
}

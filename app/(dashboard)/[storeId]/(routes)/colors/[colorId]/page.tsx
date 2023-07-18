import prismaDB from '@/lib/prismaDB'
import ColorForm from './components/ColorForm'

type ColorPageProps = {
	params: {
		colorId: string
	}
}

export default async function ColorPage({ params }: ColorPageProps) {
	const color = await prismaDB.color.findUnique({
		where: {
			id: params.colorId,
		},
	})

	return (
		<div className="flex-col">
			<div className="flex-1 space-y-4 p-8 pt-6">
				<ColorForm initialData={color} />
			</div>
		</div>
	)
}

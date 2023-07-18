'use client'

import { Button } from '@/components/ui/Button'
import Heading from '@/components/ui/Heading'
import { Separator } from '@/components/ui/Separator'
import { zodResolver } from '@hookform/resolvers/zod'
import { Category, Color, Image, Product, Size } from '@prisma/client'
import { Trash } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/Form'
import { Input } from '@/components/ui/Input'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'
import AlertModal from '@/components/modals/AlertModal'
import ImageUpload from '@/components/ui/ImageUpload'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/Select'

const formSchema = z.object({
	name: z.string().min(1),
	images: z
		.object({
			url: z.string(),
		})
		.array(),
	price: z.coerce.number().min(1),
	categoryId: z.string().min(1),
	colorId: z.string().min(1),
	sizeId: z.string().min(1),
	isFeatured: z.boolean().default(false).optional(),
	isArchived: z.boolean().default(false).optional(),
})

type ProductFormValues = z.infer<typeof formSchema>

type ProductFormProps = {
	initialData:
		| (Product & {
				images: Image[]
		  })
		| null

	categories: Category[]
	colors: Color[]
	sizes: Size[]
}

export default function BillboardForm({
	initialData,
	categories,
	colors,
	sizes,
}: ProductFormProps) {
	const params = useParams()
	const router = useRouter()

	const [open, setOpen] = useState(false)
	const [loading, setLoading] = useState(false)

	const title = initialData ? 'Edit product' : 'Create product'
	const description = initialData ? 'Edit product' : 'Add a new product'
	const toastMessage = initialData ? 'Product updated.' : 'Product created.'
	const action = initialData ? 'Save changes' : 'Create'

	const form = useForm<ProductFormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: initialData
			? {
					...initialData,
					price: parseFloat(String(initialData?.price)),
			  }
			: {
					name: '',
					images: [],
					price: 0,
					categoryId: '',
					sizeId: '',
					colorId: '',
					isFeatured: false,
					isArchived: false,
			  },
	})

	const onSubmit = async (data: ProductFormValues) => {
		try {
			setLoading(true)
			if (initialData) {
				await axios.patch(
					`/api/${params.storeId}/billboards/${params.billboardId}`,
					data
				)
			} else {
				await axios.post(`/api/${params.storeId}/billboards`, data)
			}

			router.refresh()
			router.push(`/${params.storeId}/billboards`)
			toast.success(toastMessage)
		} catch (error) {
			toast.error('Something went wrong')
		} finally {
			setLoading(false)
		}
	}

	const onDelete = async () => {
		try {
			setLoading(true)
			await axios.delete(
				`/api/${params.storeId}/billboards/${params.billboardId}`
			)
			router.refresh()
			router.push(`/${params.storeId}/billboards`)
			toast.success('Billboard deleted')
		} catch (error) {
			toast.error(
				'Make sure you removed all categories  using this billboard before you proceed'
			)
		} finally {
			setLoading(false)
			setOpen(false)
		}
	}

	return (
		<>
			<AlertModal
				isOpen={open}
				onClose={() => setOpen(false)}
				loading={loading}
				onConfirm={onDelete}
			/>
			<div className="flex itmes-center justify-between">
				<Heading title={title} description={description} />
				{initialData && (
					<Button
						variant="destructive"
						size="icon"
						onClick={() => setOpen(true)}
						disabled={loading}
					>
						<Trash className="h-4 w-4" />
					</Button>
				)}
			</div>
			<Separator />

			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-8 w-full"
				>
					<FormField
						control={form.control}
						name="images"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Images</FormLabel>
								<FormControl>
									<ImageUpload
										value={field.value.map(
											(image) => image.url
										)}
										disabled={loading}
										onChange={(url) =>
											field.onChange([
												...field.value,
												{ url },
											])
										}
										onRemove={(url) =>
											field.onChange([
												...field.value.filter(
													(current) =>
														current.url !== url
												),
											])
										}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className="grid grid-cols-3 gap-8">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input
											disabled={loading}
											placeholder="Product name"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="price"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Price</FormLabel>
									<FormControl>
										<Input
											disabled={loading}
											placeholder="5.99"
											type="number"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="categoryId"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Billboard</FormLabel>
									<Select
										disabled={loading}
										onValueChange={field.onChange}
										value={field.value}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue
													defaultValue={field.value}
													placeholder="Select a billboard"
												/>
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{categories.map((category) => (
												<SelectItem
													key={category.id}
													value={category.id}
												>
													{category.name}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<Button
						disabled={loading}
						className="ml-auto"
						type="submit"
					>
						{action}
					</Button>
				</form>
			</Form>
		</>
	)
}

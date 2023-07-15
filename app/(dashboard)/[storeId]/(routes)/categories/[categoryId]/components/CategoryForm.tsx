'use client'

import { Button } from '@/components/ui/Button'
import Heading from '@/components/ui/Heading'
import { Separator } from '@/components/ui/Separator'
import { zodResolver } from '@hookform/resolvers/zod'
import { Billboard, Category } from '@prisma/client'
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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/Select'

const formSchema = z.object({
	name: z.string().min(1),
	billboardId: z.string().min(1),
})

type CategoryFormValues = z.infer<typeof formSchema>

type CategoryFormProps = {
	initialData: Category | null
	billboards: Billboard[]
}

export default function CategoryForm({ initialData, billboards }: CategoryFormProps) {
	const params = useParams()
	const router = useRouter()

	const [open, setOpen] = useState(false)
	const [loading, setLoading] = useState(false)

	const title = initialData ? 'Edit Category' : 'Create Category'
	const description = initialData ? 'Edit Category' : 'Add a new Category'
	const toastMessage = initialData ? 'Category updated.' : 'Category created.'
	const action = initialData ? 'Save changes' : 'Create'

	const form = useForm<CategoryFormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: initialData || {
			name: '',
			billboardId: '',
		},
	})

	const onSubmit = async (data: CategoryFormValues) => {
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
											placeholder="Category name"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="billboardId"
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
											{billboards.map((billboard) => (
												<SelectItem key={billboard.id} value={billboard.id} >
													{billboard.label}
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

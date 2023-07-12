'use client'

import { Button } from '@/components/ui/Button'
import Heading from '@/components/ui/Heading'
import { Separator } from '@/components/ui/Separator'
import { zodResolver } from '@hookform/resolvers/zod'
import { Store } from '@prisma/client'
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
import ApiAlert from '@/components/ui/ApiAlert'

type SettingsFormProps = {
	initialData: Store
}

const formSchema = z.object({
	name: z.string().min(1).max(255),
})

type SettingsFormValues = z.infer<typeof formSchema>

export default function SettingsForm({ initialData }: SettingsFormProps) {
	const params = useParams()
	const router = useRouter()

	const [open, setOpen] = useState(false)
	const [loading, setLoading] = useState(false)

	const form = useForm<SettingsFormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: initialData,
	})

	const onSubmit = async (data: SettingsFormValues) => {
		try {
			setLoading(true)

			await axios.patch(`/api/stores/${params.storeId}`, data)
			router.refresh()
			toast.success('Store updated')
		} catch (error) {
			toast.error('Something went wrong')
		} finally {
			setLoading(false)
		}
	}

	const onDelete = async () => {
		try {
			setLoading(true)
			await axios.delete(`/api/stores/${params.storeId}`)
			router.refresh()
			router.push('/')
			toast.success('Store deleted')
		} catch (error) {
			toast.error('Make sure you have no products in your store first')
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
				<Heading
					title="Settings"
					description="Update your store settings"
				/>
				<Button
					variant="destructive"
					size="icon"
					onClick={() => setOpen(true)}
					disabled={loading}
				>
					<Trash className="h-4 w-4" />
				</Button>
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
											placeholder="Store name"
											{...field}
										/>
									</FormControl>
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
						Save changes
					</Button>
				</form>
			</Form>
			<Separator />
			<ApiAlert
				title="NEXT_PUBLIC_API_URL"
				description="test description"
				variant="public"
			/>
		</>
	)
}


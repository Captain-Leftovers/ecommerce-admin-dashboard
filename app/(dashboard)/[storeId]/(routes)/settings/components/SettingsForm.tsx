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

type SettingsFormProps = {
	initialData: Store
}

const formSchema = z.object({
	name: z.string().min(1).max(255),
})

type SettingsFormValues = z.infer<typeof formSchema>

export default function SettingsForm({ initialData }: SettingsFormProps) {
	const [open, setOpen] = useState(false)
	const [loading, setLoading] = useState(false)

	const form = useForm<SettingsFormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: initialData,
	})

	const onSubmit = async (data: SettingsFormValues) => {
		console.log(data)
	}

	return (
		<>
			<div className="flex itmes-center justify-between">
				<Heading
					title="Settings"
					description="Update your store settings"
				/>
				<Button variant="destructive" size="icon" onClick={() => {}}>
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
                                <FormMessage/>
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
		</>
	)
}

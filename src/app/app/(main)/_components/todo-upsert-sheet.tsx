'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { useRef } from 'react'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { Movement } from '../types'
import { upsertTodo } from '../actions'
import { zodResolver } from '@hookform/resolvers/zod'
import { upsertMovementSchema } from '../schema'
import { useRouter } from 'next/navigation'
import { toast } from '@/components/ui/use-toast'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

type TodoUpsertSheetProps = {
  children?: React.ReactNode
  defaultValue?: Movement
}

export function TodoUpsertSheet({ children }: TodoUpsertSheetProps) {
  const ref = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const form = useForm({
    resolver: zodResolver(upsertMovementSchema),
  })

  const onSubmit = form.handleSubmit(async (data) => {
    console.log(data)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    await upsertTodo(data)
    router.refresh()

    ref.current?.click()

    toast({
      title: 'Success',
      description: 'Your movement has been updated successfully.',
    })
  })

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div ref={ref}>{children}</div>
      </SheetTrigger>
      <SheetContent>
        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-8 h-screen">
            <SheetHeader>
              <SheetTitle>Upsert Movimentação</SheetTitle>
              <SheetDescription>
                Crie ou edite uma movimentação.
              </SheetDescription>
            </SheetHeader>

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo</FormLabel>
                  {/* <Input placeholder="Enter your todo title" {...field} /> */}
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {/* <SelectLabel>Tipo</SelectLabel> */}
                        <SelectItem value="Entrada">Entrada</SelectItem>
                        <SelectItem value="Saida">Saída</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoria</FormLabel>
                  {/* <Input placeholder="Enter your todo title" {...field} /> */}
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {/* <SelectLabel>Tipo</SelectLabel> */}
                        <SelectItem value="Aplicativo">Aplicativo</SelectItem>
                        <SelectItem value="Manutencao">Manutenção</SelectItem>
                        <SelectItem value="Alguel">Aluguel</SelectItem>
                        <SelectItem value="Combustivel">Combustível</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your todo title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      placeholder="Enter your todo title"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Valor</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter your todo title"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <SheetFooter className="mt-auto">
              <Button type="submit">Salvar</Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
}

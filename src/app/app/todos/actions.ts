'use server'

import { auth } from '@/services/auth'
import { prisma } from '@/services/database'
import { z } from 'zod'
import { deleteTodoSchema, upsertMovementSchema } from './schema'

export async function getUserMovements() {
  const session = await auth()

  const movements = await prisma.movements.findMany({
    where: {
      userId: session?.user?.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return movements
}

export async function upsertTodo(input: z.infer<typeof upsertMovementSchema>) {
  const session = await auth()

  if (!session?.user?.id) {
    return {
      error: 'Not authorized',
      data: null,
    }
  }

  if (input.id) {
    const todo = await prisma.movements.findUnique({
      where: {
        id: input.id,
        userId: session?.user?.id,
      },
      select: {
        id: true,
      },
    })

    if (!todo) {
      return {
        error: 'Not found',
        data: null,
      }
    }

    const updatedTodo = await prisma.movements.update({
      where: {
        id: input.id,
        userId: session?.user?.id,
      },
      data: {
        type: input.type,
        category: input.category,
        date: input.date,
        description: input.description,
      },
    })

    return {
      error: null,
      data: updatedTodo,
    }
  }

  if (!input.type) {
    return {
      error: 'Type is required',
      data: null,
    }
  }

  if (!input.description) {
    return {
      error: 'Description is required',
      data: null,
    }
  }

  if (!input.date) {
    return {
      error: 'Date is required',
      data: null,
    }
  }

  if (!input.category) {
    return {
      error: 'Category is required',
      data: null,
    }
  }

  if (!input.value) {
    return {
      error: 'Value is required',
      data: null,
    }
  }

  const todo = await prisma.movements.create({
    data: {
      value: input.value,
      category: input.category,
      description: input.description,
      type: input.type,
      date: input.date,
      userId: session?.user?.id,
    },
  })

  return todo
}

export async function deleteTodo(input: z.infer<typeof deleteTodoSchema>) {
  const session = await auth()

  if (!session?.user?.id) {
    return {
      error: 'Not authorized',
      data: null,
    }
  }

  const todo = await prisma.movements.findUnique({
    where: {
      id: input.id,
      userId: session?.user?.id,
    },
    select: {
      id: true,
    },
  })

  if (!todo) {
    return {
      error: 'Not found',
      data: null,
    }
  }

  await prisma.movements.delete({
    where: {
      id: input.id,
      userId: session?.user?.id,
    },
  })

  return {
    error: null,
    data: 'Todo deleted successfully',
  }
}

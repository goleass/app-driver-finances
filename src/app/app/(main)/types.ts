import { ReturnTypeWithoutPromise } from '@/types/return-type-without-promise'
import { getUserMovements } from './actions'

export type Movement = ReturnTypeWithoutPromise<typeof getUserMovements>[0]

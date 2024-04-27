import { UseCase } from "@/_modules/types"

export type GetCard = UseCase<GetCardInput, GetCardOutput>

export type GetCardInput = { idExternal: string }
export type GetCardOutput = { id: string }

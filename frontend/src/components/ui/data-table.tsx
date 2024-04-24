"use client"

import { MoveDown, MoveUp } from "lucide-react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import React from "react"

import {
  Table as TableLib,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"

export interface Column<T> {
  key: string
  label?: React.ReactNode
  headerClass?: string
  content?: (data: T, idx: number) => React.ReactNode
  contentClass?: (data: T) => string
  sort?: boolean
  size?: string
  maxSize?: number
  wrapText?: boolean
}

export interface DataTableProps<T> {
  data: T[]
  columns: Column<T>[]
  notFoundItemsMessage?: string
}

export function DataTable<T extends { id: string }>({
  data,
  columns,
  notFoundItemsMessage = "Not found items",
}: DataTableProps<T>) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const orderBy = searchParams.get("orderBy") ?? undefined
  const order = searchParams.get("order") ?? "asc"

  const handleSort = (name: string, direction: string) => {
    const params = new URLSearchParams(searchParams)

    if (name === orderBy && order === direction) {
      params.delete("orderBy")
      params.delete("order")
      return replace(`${pathname}?${params.toString()}`)
    }

    params.delete("orderBy")
    params.append("orderBy", name)

    params.delete("order")
    params.append("order", direction)

    return replace(`${pathname}?${params.toString()}`)
  }

  return (
    <div>
      <TableLib>
        <colgroup>
          {columns.map((column) => (
            <col key={column.key} span={1} style={{ width: column.size }} />
          ))}
        </colgroup>

        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={column.key} className={column.headerClass}>
                <div className="flex items-center">
                  {column.label}
                  {!!column.sort && (
                    <div className="flex">
                      <button onClick={() => handleSort(column.key, "asc")}>
                        <MoveUp
                          data-active={
                            orderBy === column.key && order === "asc"
                          }
                          size={14}
                          className="hover:text-slate-600 data-[active=true]:text-slate-950"
                        />
                      </button>

                      <button onClick={() => handleSort(column.key, "desc")}>
                        <MoveDown
                          data-active={
                            orderBy === column.key && order === "desc"
                          }
                          size={14}
                          className="hover:text-slate-600 data-[active=true]:text-slate-950"
                        />
                      </button>
                    </div>
                  )}
                </div>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, idx) => (
            <TableRow key={item.id}>
              {columns.map((column) => (
                <TableCell
                  key={column.key}
                  className={cn(
                    column.maxSize && !column.wrapText ? "truncate" : null,
                    column.contentClass?.(item)
                  )}
                  style={{
                    overflowWrap: column.maxSize ? "anywhere" : undefined,
                    maxWidth: column.maxSize,
                  }}
                >
                  {column.content ? (
                    column.content(item, idx)
                  ) : (
                    <>{item[column.key as keyof typeof item]}</>
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </TableLib>
      {!data.length && (
        <span className="my-8 flex justify-center text-muted-foreground">
          {notFoundItemsMessage}
        </span>
      )}
    </div>
  )
}

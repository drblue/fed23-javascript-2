import { useState } from "react";
import BS_Table from "react-bootstrap/Table";
import {
	ColumnDef,
	flexRender,
	getCoreRowModel,
	getSortedRowModel,
	SortDirection,
	SortingState,
	useReactTable,
} from "@tanstack/react-table";

interface TanstackSortableTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
}

const sortingIndicators = {
	asc: " 🙂",
	desc: " 🙃",
}

const TanstackSortableTable = <TData, TValue>({ columns, data }: TanstackSortableTableProps<TData, TValue>) => {
	const [sorting, setSorting] = useState<SortingState>([]);

	const table = useReactTable({
		data,
		columns,
		state: {
			sorting,
		},
		onSortingChange: setSorting,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
	});

	return (
		<BS_Table bordered hover responsive striped>
			<thead>
				{table.getHeaderGroups().map(headerGroup => (
					<tr key={headerGroup.id}>
						{headerGroup.headers.map(header => (
							<th key={header.id} colSpan={header.colSpan}>
								{header.isPlaceholder ? null : (
									<div
										className={header.column.getCanSort() ? "cursor-pointer" : ""}
										onClick={header.column.getToggleSortingHandler()}
									>
										{flexRender(
											header.column.columnDef.header,
											header.getContext()
										)}

										{/* Add a sort direction indicator */}
										{sortingIndicators[header.column.getIsSorted() as SortDirection] ?? null}
									</div>
								)}
							</th>
						))}
					</tr>
				))}
			</thead>

			<tbody>
				{table.getRowModel().rows.map(row => (
					<tr key={row.id}>
						{row.getVisibleCells().map(cell => (
							<td key={cell.id} className={cell.column.columnDef.meta?.align || ""}>
								{flexRender(
									cell.column.columnDef.cell,
									cell.getContext()
								)}
							</td>
						))}
					</tr>
				))}
			</tbody>

			{/*
			<tfoot>
				{table.getFooterGroups().map(footerGroup => (
					<tr key={footerGroup.id}>
						{footerGroup.headers.map(header => (
							<th key={header.id} colSpan={header.colSpan}>
								{header.isPlaceholder
									? null
									: flexRender(
										header.column.columnDef.footer,
										header.getContext()
									)}
							</th>
						))}
					</tr>
				))}
			</tfoot>
			*/}
		</BS_Table>
	)
}

export default TanstackSortableTable;

import BS_Table from "react-bootstrap/Table";
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";

interface TanstackBasicTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
}

const TanstackBasicTable = <TData, TValue>({ columns, data }: TanstackBasicTableProps<TData, TValue>) => {
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	return (
		<BS_Table bordered hover responsive striped size="sm">
			<thead>
				{table.getHeaderGroups().map(headerGroup => (
					<tr key={headerGroup.id}>
						{headerGroup.headers.map(header => (
							<th key={header.id} colSpan={header.colSpan}>
								{header.isPlaceholder
									? null
									: flexRender(
										header.column.columnDef.header,
										header.getContext()
									)
								}
							</th>
						))}
					</tr>
				))}
			</thead>

			<tbody>
				{table.getRowModel().rows.map(row => (
					<tr key={row.id}>
						{row.getVisibleCells().map(cell => (
							<td key={cell.id}>
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

export default TanstackBasicTable;

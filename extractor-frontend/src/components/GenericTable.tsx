import React, {ReactNode} from "react";
import {Table} from "flowbite-react";

interface TableProps {
	tableRows: ReactNode[];
	tableColumns: string[];
}

export function GenericTable(props: TableProps) {
	const {tableRows,tableColumns} = props;

	return (
		<Table className="relative">
			<Table.Head>
				{tableColumns.map((tableRow, index)=>(
					<Table.HeadCell key={index}>{tableRow}</Table.HeadCell>
				))}
			</Table.Head>
			<Table.Body className="divide-y">
				{tableRows.map((tableRow, index) => (
					<React.Fragment key={index}>{tableRow}</React.Fragment>
				))}
			</Table.Body>
		</Table>
	);
}

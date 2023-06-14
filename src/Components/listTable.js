import styles from './listTable.module.css';
import { useTable, useSortBy } from 'react-table';
import { Link } from 'react-router-dom';
import Loader from './loader';

function ListTable({ disableLinks, loading, columns, data, loadText }) {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable(
        {
            columns,
            data,
        },
        useSortBy
    )

    // We don't want to render all 2000 rows for this example, so cap
    // it at 20 for this use case
    const firstPageRows = rows;

    return (
        <>
            <table {...getTableProps()} className={styles.table}>
                <thead className={styles.tableHeader}>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()} className={styles.tableHeaderRow}>
                            {headerGroup.headers.map(column => (
                                // Add the sorting props to control sorting. For this example
                                // we can add them into the header props
                                <th {...column.getHeaderProps(column.getSortByToggleProps())} className={styles.tableHeaderRowItem}>
                                    {column.render('Header')}
                                    {/* Add a sort direction indicator */}
                                    <span className={styles.tableArrow}>
                                        {column.isSorted
                                            ? column.isSortedDesc
                                                ? ' ▼'
                                                : ' ▲'
                                            : ''}
                                    </span>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>

                {
                    loading
                        ? <tbody className={styles.center}>
                            <tr>
                                <td>
                                    <Loader text={loadText} />
                                </td>
                            </tr>
                        </tbody>
                        : <tbody {...getTableBodyProps()} className={styles.tableBody}>
                            {firstPageRows.map(
                                (row, i) => {
                                    prepareRow(row);
                                    return (
                                        <tr {...row.getRowProps()} className={styles.tableBodyRow}>
                                            {row.cells.map((cell, index) => {
                                                let renderCell = cell.render('Cell');

                                                if (cell.column.Header === 'Total Job Amount' || cell.column.Header === 'Average Job Amount') {
                                                    let newNum = parseFloat(cell.value);
                                                    renderCell = newNum.toLocaleString();
                                                }
                                                return (
                                                    <td className={styles.tableBodyCell} {...cell.getCellProps()}>
                                                        {
                                                            index === 0 && !disableLinks
                                                                ? <Link to={`${row.cells[0].value}/${row.original._id}`}>
                                                                    {renderCell}
                                                                </Link>
                                                                : renderCell
                                                        }
                                                    </td>
                                                )
                                            })}
                                        </tr>
                                    )
                                }
                            )}
                        </tbody>
                }
            </table>
            <br />
        </>
    )
}

export default ListTable;
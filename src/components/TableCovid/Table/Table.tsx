/* eslint-disable @typescript-eslint/ban-types */
import classNames from 'classnames';
import React, { Fragment } from 'react';
import {
  TableOptions,
  useTable,
  useSortBy,
  useBlockLayout,
  useResizeColumns,
  usePagination,
  useGlobalFilter,
} from 'react-table';

import styles from '@/components/TableCovid/Table/Table.scss';

type TableProps<T extends object = {}> = TableOptions<T>;

function Table<T extends object = {}>({ data, columns }: TableProps<T>): JSX.Element {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    setGlobalFilter,
  } = useTable<T>(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    useBlockLayout,
    useResizeColumns,
    usePagination
  );

  return (
    <Fragment>
      <div className={styles['table-pagination']}>
        <span className={classNames(styles['table-filter'])}>
          Search:
          {' '}
          <input
            className={classNames(styles['table-type'])}
            onChange={e => {
              setGlobalFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
            }}
            placeholder=" type to search"
            style={{
              fontSize: '1.1rem',
              border: '0',
            }}
          />
        </span>
      </div>
      <div {...getTableProps()} className={classNames(styles['table-element'], 'table')}>
        <div>
          {headerGroups.map(headerGroup => (
            <div className={styles['tr']} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <div
                  className={styles['th']}
                  {...column.getHeaderProps(
                    column.getSortByToggleProps({ title: `Sort by ${column.Header!.toString()}` })
                  )}
                >
                  {column.render('Header')}

                  <span>{column.isSorted && (column.isSortedDesc ? ' \u2191' : ' \u2193')}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div {...getTableBodyProps()}>
          {page
            && page.map(row => {
              prepareRow(row);
              return (
                <div className={styles['tr']} {...row.getRowProps()}>
                  {row.cells.map(cell => (
                    <div className={styles['td']} {...cell.getCellProps()}>
                      {cell.render('Cell')}
                    </div>
                  ))}
                </div>
              );
            })}
        </div>
      </div>
    </Fragment>
  );
}

export default Table;

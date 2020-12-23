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

import styles from '@/components/ListCovid/list/List.scss';

type TableProps<T extends object = {}> = TableOptions<T>;

function List<T extends object = {}>({ data, columns }: TableProps<T>): JSX.Element {
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

  // const count: number = preGlobalFilteredRows.length;
  // // const [value, setValue] = React.useState(globalFilter);
  // const onChange = useAsyncDebounce(value => {
  //   setGlobalFilter(value || undefined)
  // }, 200);

  return (
    <Fragment>
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
      <div className={styles['table-pagination']}>
        {/* <button type="button" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>
        {' '}
        <button type="button" onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>
        {' '}
        <button type="button" onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>
        {' '}
        <button type="button" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>
        {' '}
        <span>
          Page
          {' '}
          <strong>
            {pageIndex + 1}
            {' '}
            of
            {pageOptions.length}
          </strong>
          {' '}
        </span>
        <span>
          | Go to page:
          {' '}
          <input
            type="number"
            min="1"
            max={pageCount}
            value={pageIndex + 1}
            onChange={e => {
              const paginationPage = e.currentTarget.value ? +e.currentTarget.value - 1 : 0;
              if (paginationPage < pageCount) {
                gotoPage(paginationPage);
              }
            }}
            style={{ width: '100px' }}
          />

        </span> */}
        <span>
          Search:
          {' '}
          <input
            onChange={e => {
              setGlobalFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
            }}
            placeholder="type to search"
            style={{
              fontSize: '1.1rem',
              border: '0',
            }}
          />
        </span>
      </div>
    </Fragment>
  );
}

export default List;

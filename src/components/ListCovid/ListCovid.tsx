import React from 'react';
import { Column } from 'react-table';

import styles from '@/components/ListCovid/ListCovid.scss';
import List from '@/components/ListCovid/list/List';

import ComponentLayout from '../layout';

interface TestData {
  country: string;
  total: number;
  flag: string;
}

const tableColumns = [
  {
    Header: 'Country',
    accessor: 'country',
    width: 70,
    Cell: ({ row }) => (row.original.country === null ? (
      '-'
    ) : (
      <span className={styles['list-span']}>{row.original.country}</span>
    )),
  },
  {
    Header: 'Icon',
    accessor: 'flag',
    width: 50,
    Cell: ({ row }) => (row.original.flag === null ? (
      0
    ) : (
      <span className={styles['list-span']}>
        <img
          src={`https://www.countryflags.io/${row.original.flag}/shiny/32.png`}
          alt={`flag_${row.original.flag}`}
        />
      </span>
    )),
  },
  {
    Header: 'Total',
    accessor: 'total',
    width: 70,
    Cell: ({ row }) => (row.original.total === null ? (
      0
    ) : (
      <span className={styles['list-span']}>{row.original.total}</span>
    )),
  },
] as Column<TestData>[];

const ListCovid = (): JSX.Element => {
  const tableData: TestData[] = [
    {
      country: 'United States of America',
      total: 1700000,
      flag: 'us',
    },
    {
      country: 'Belarus',
      total: 300000,
      flag: 'by',
    },
    {
      country: 'Poland',
      total: 200000,
      flag: 'pl',
    },
    {
      country: 'Canada',
      total: 1000000,
      flag: 'ca',
    },
    {
      country: 'Germany',
      total: 132123,
      flag: 'de',
    },
    {
      country: 'France',
      total: 9012331,
      flag: 'fr',
    },
    {
      country: 'United States of America',
      total: 1700000,
      flag: 'us',
    },
    {
      country: 'Belarus',
      total: 300000,
      flag: 'by',
    },
    {
      country: 'Poland',
      total: 200000,
      flag: 'pl',
    },
    {
      country: 'Canada',
      total: 1000000,
      flag: 'ca',
    },
    {
      country: 'Germany',
      total: 132123,
      flag: 'de',
    },
    {
      country: 'France',
      total: 9012331,
      flag: 'fr',
    },
  ];

  return (
    <ComponentLayout>
      <div className={styles['list-covid']}>
        <List<TestData> columns={tableColumns} data={tableData} />
      </div>
    </ComponentLayout>
  );
};

export default ListCovid;

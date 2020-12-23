import React from 'react';
import { Column } from 'react-table';

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
    width: 100,
    Cell: ({ row }) => (row.original.country === null ? '-' : row.original.country),
  },
  {
    Header: 'Icon',
    accessor: 'flag',
    width: 50,
    Cell: ({ row }) => (row.original.flag === null ? (
      0
    ) : (
      <img
        src={`https://www.countryflags.io/${row.original.flag}/shiny/32.png`}
        alt={`flag_${row.original.flag}`}
      />
    )),
  },
  {
    Header: 'Total',
    accessor: 'total',
    width: 100,
    Cell: ({ row }) => (row.original.total === null ? 0 : row.original.total),
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
      <List<TestData> columns={tableColumns} data={tableData} />
    </ComponentLayout>
  );
};

export default ListCovid;

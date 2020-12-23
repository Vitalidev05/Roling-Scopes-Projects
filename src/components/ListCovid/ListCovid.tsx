import React, { useEffect, useState } from 'react';
import { Column } from 'react-table';

import styles from '@/components/ListCovid/ListCovid.scss';
import List from '@/components/ListCovid/list/List';
import { useCovidMapService } from '@/services';

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
    width: 80,
    Cell: ({ row }) => (row.original.total === null ? (
      0
    ) : (
      <span className={styles['list-span']}>{row.original.total}</span>
    )),
  },
] as Column<TestData>[];

const tableColumns1 = [
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
          src={`https://www.countryflags.io/${row.original.flag.toLowerCase()}/shiny/32.png`}
          alt={`flag_${row.original.flag}`}
        />
      </span>
    )),
  },
  {
    Header: 'Death',
    accessor: 'total',
    width: 80,
    Cell: ({ row }) => (row.original.total === null ? (
      0
    ) : (
      <span className={styles['list-span']}>{row.original.total}</span>
    )),
  },
] as Column<TestData>[];

const ListCovid = (): JSX.Element => {
  const [stateList, setStateList] = useState<TestData[]>([]);
  const [stateTest] = useState(0);
  const [stateHeader, setStateHeader] = useState(tableColumns);

  const dataBefore = useCovidMapService();

  useEffect(() => {
    if (dataBefore.status === 'loaded') {
      const obj: TestData[] = [];

      for (let i = 0; i < dataBefore.data.length; i += 1) {
        const newobj: TestData[] = [
          {
            country: dataBefore.data[i].country,
            total: dataBefore.data[i].cases,
            flag: dataBefore.data[i].countryInfo.iso2,
          },
        ];
        obj.push(...newobj);
      }

      setStateList(obj);
      if (stateTest === 0) {
        setStateHeader(tableColumns1);
      }
    }
  }, [dataBefore, stateTest]);

  return (
    <ComponentLayout>
      <div className={styles['list-covid']}>
        <List<TestData> columns={stateHeader} data={stateList} />
      </div>
    </ComponentLayout>
  );
};

export default ListCovid;

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
    Header: 'Cases',
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

const tableColumns2 = [
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
    Header: 'Recover',
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
  const [stateTest, setStateTest] = useState(0);
  const [stateHeader, setStateHeader] = useState(tableColumns);

  const dataBefore = useCovidMapService();

  useEffect(() => {
    if (dataBefore.status === 'loaded') {
      let obj: TestData[] = [];
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

      if (stateTest === 0) {
        setStateHeader(tableColumns);
        obj = [];
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
      }
      if (stateTest === 1) {
        setStateHeader(tableColumns1);
        obj = [];
        for (let i = 0; i < dataBefore.data.length; i += 1) {
          const newobj: TestData[] = [
            {
              country: dataBefore.data[i].country,
              total: dataBefore.data[i].deaths,
              flag: dataBefore.data[i].countryInfo.iso2,
            },
          ];
          obj.push(...newobj);
        }
      }
      if (stateTest === 2) {
        setStateHeader(tableColumns2);
        obj = [];
        for (let i = 0; i < dataBefore.data.length; i += 1) {
          const newobj: TestData[] = [
            {
              country: dataBefore.data[i].country,
              total: dataBefore.data[i].recovered,
              flag: dataBefore.data[i].countryInfo.iso2,
            },
          ];
          obj.push(...newobj);
        }
      }
      setStateList(obj);
    }
  }, [dataBefore, stateTest]);

  return (
    <ComponentLayout>
      <div className={styles['list-covid']}>
        <button type="button" className={styles['list-button']} onClick={() => setStateTest(1)}>
          Death
        </button>
        <button type="button" className={styles['list-button']} onClick={() => setStateTest(0)}>
          Cases
        </button>
        <button type="button" className={styles['list-button']} onClick={() => setStateTest(2)}>
          Recovered
        </button>
        <List<TestData> columns={stateHeader} data={stateList} />
      </div>
    </ComponentLayout>
  );
};

export default ListCovid;

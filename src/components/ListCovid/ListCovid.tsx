import React, { useEffect, useState } from 'react';
import { Column } from 'react-table';

import styles from '@/components/ListCovid/ListCovid.scss';
import List from '@/components/ListCovid/list/List';
import { categoriesTable } from '@/constants';
import { useStateApp } from '@/context/appContext';
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
    width: 90,
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
    width: 90,
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

  const context = useStateApp();
  const handlerClickCasses = (state: number) => {
    setStateTest(state);
    if (state === 0) {
      context.updateCasses(categoriesTable[0]);
    }
    if (state === 1) {
      context.updateCasses(categoriesTable[1]);
    }
    if (state === 2) {
      context.updateCasses(categoriesTable[2]);
    }
  };

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

      if (context.stateApp.casses === categoriesTable[0]) {
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
      if (context.stateApp.casses === categoriesTable[1]) {
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
      if (context.stateApp.casses === categoriesTable[2]) {
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
  }, [dataBefore, stateTest, context]);

  return (
    <ComponentLayout>
      <div className={styles['list-covid']}>
        <div className={styles['button-container']}>
          <button
            type="button"
            className={styles['list-button']}
            onClick={() => handlerClickCasses(1)}
          >
            Death
          </button>
          <button
            type="button"
            className={styles['list-button']}
            onClick={() => handlerClickCasses(0)}
          >
            Cases
          </button>
          <button
            type="button"
            className={styles['list-button']}
            onClick={() => handlerClickCasses(2)}
          >
            Recovered
          </button>
        </div>
        <List<TestData> columns={stateHeader} data={stateList} />
      </div>
    </ComponentLayout>
  );
};

export default ListCovid;

import React, { useEffect, useState } from 'react';
import { Column } from 'react-table';

import Table from '@/components/TableCovid/Table/Table';
import styles from '@/components/TableCovid/TableCovid.scss';
import { useCovidMapService } from '@/services';

import ComponentLayout from '../layout';

interface TestData {
  country: string;
  total: number;
  dayone: number;
  per100k: number;
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
    width: 90,
    Cell: ({ row }) => (row.original.total === null ? (
      0
    ) : (
      <span className={styles['list-span']}>{row.original.total}</span>
    )),
  },
  {
    Header: 'Day one',
    accessor: 'dayone',
    width: 90,
    Cell: ({ row }) => (row.original.dayone === null ? (
      0
    ) : (
      <span className={styles['list-span']}>{row.original.dayone}</span>
    )),
  },
  {
    Header: 'per 100k',
    accessor: 'per100k',
    width: 90,
    Cell: ({ row }) => (row.original.per100k === null ? (
      0
    ) : (
      <span className={styles['list-span']}>{Math.round(row.original.per100k / 10)}</span>
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
          src={`https://www.countryflags.io/${row.original.flag}/shiny/32.png`}
          alt={`flag_${row.original.flag}`}
        />
      </span>
    )),
  },
  {
    Header: 'Death',
    accessor: 'total',
    width: 90,
    Cell: ({ row }) => (row.original.total === null ? (
      0
    ) : (
      <span className={styles['list-span']}>{row.original.total}</span>
    )),
  },
  {
    Header: 'Day one',
    accessor: 'dayone',
    width: 90,
    Cell: ({ row }) => (row.original.dayone === null ? (
      0
    ) : (
      <span className={styles['list-span']}>{row.original.dayone}</span>
    )),
  },
  {
    Header: 'per 100k',
    accessor: 'per100k',
    width: 90,
    Cell: ({ row }) => (row.original.per100k === null ? (
      0
    ) : (
      <span className={styles['list-span']}>{Math.round(row.original.per100k / 10)}</span>
    )),
  },
] as Column<TestData>[];

const tableColumns2 = [
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
    Header: 'Recover',
    accessor: 'total',
    width: 90,
    Cell: ({ row }) => (row.original.total === null ? (
      0
    ) : (
      <span className={styles['list-span']}>{row.original.total}</span>
    )),
  },
  {
    Header: 'Day one',
    accessor: 'dayone',
    width: 90,
    Cell: ({ row }) => (row.original.dayone === null ? (
      0
    ) : (
      <span className={styles['list-span']}>{row.original.dayone}</span>
    )),
  },
  {
    Header: 'per 100k',
    accessor: 'per100k',
    width: 90,
    Cell: ({ row }) => (row.original.per100k === null ? (
      0
    ) : (
      <span className={styles['list-span']}>{Math.round(row.original.per100k / 10)}</span>
    )),
  },
] as Column<TestData>[];

const TableCovid = (): JSX.Element => {
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
            dayone: dataBefore.data[i].oneCasePerPeople,
            per100k: dataBefore.data[i].casesPerOneMillion,
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
              dayone: dataBefore.data[i].todayCases,
              per100k: dataBefore.data[i].casesPerOneMillion,
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
              dayone: dataBefore.data[i].todayDeaths,
              per100k: dataBefore.data[i].deathsPerOneMillion,
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
              dayone: dataBefore.data[i].todayRecovered,
              per100k: dataBefore.data[i].recoveredPerOneMillion,
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
      <div className={styles['table-covid']}>
        <div className={styles['button-container']}>
          <button type="button" className={styles['list-button']} onClick={() => setStateTest(1)}>
            Death
          </button>
          <button type="button" className={styles['list-button']} onClick={() => setStateTest(0)}>
            Cases
          </button>
          <button type="button" className={styles['list-button']} onClick={() => setStateTest(2)}>
            Recovered
          </button>
        </div>
        <Table<TestData> columns={stateHeader} data={stateList} />
      </div>
    </ComponentLayout>
  );
};

export default TableCovid;

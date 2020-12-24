/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useState, useEffect } from 'react';
import { Pie, Line } from 'react-chartjs-2';

import styles from '@/components/GraphCovid/GraphCovid.scss';
import { useStateApp } from '@/context/appContext';
import { ICovid } from '@/types/Covid';

const Chart = (): JSX.Element => {
  const [chartData, setChartData] = useState({});
  const [typeOfChart, setTypeOfChart] = useState({});
  const [stateActiveGraph, setStateActiveGraph] = useState(0);
  const cnt = useStateApp();

  function transformDate(date: string): string {
    const options = {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    };
    const dateTransformed = new Date(date);
    return dateTransformed.toLocaleString('ru', options);
  }

  function createNewStateTotalCases() {
    setStateActiveGraph(0);
    fetch('https://api.covid19api.com/summary')
      .then((response: Response) => response.json())
      .then(res => {
        const dateWithCases = res.Global.TotalConfirmed;
        const totalDeaths = res.Global.TotalDeaths;
        const totalRecovered = res.Global.TotalRecovered;
        setChartData({
          labels: ['TotalConfirmed', 'TotalDeaths', 'TotalRecovered'],
          datasets: [
            {
              data: [dateWithCases, totalDeaths, totalRecovered],
              backgroundColor: [
                ['rgba(75, 192, 85, 0.6)'],
                ['rgba(255, 192, 192, 0.6)'],
                ['rgba(50, 192, 192, 0.6)'],
              ],
              borderWidth: 4,
            },
          ],
        });
        setTypeOfChart({
          typeChart: 'pie',
        });
      })
      .catch((error: Error) => setChartData({ error }));
  }

  function createNewStateNewCases() {
    setStateActiveGraph(1);
    fetch('https://api.covid19api.com/summary')
      .then((response: Response) => response.json())
      .then(res => {
        const numberOfCases = res.Global.NewConfirmed;
        const newDeaths = res.Global.NewDeaths;
        const newRecovered = res.Global.NewRecovered;
        setChartData({
          labels: ['NewConfirmed', 'NewDeaths', 'NewRecovered'],
          datasets: [
            {
              data: [numberOfCases, newDeaths, newRecovered],
              backgroundColor: [
                ['rgba(150, 90, 192, 0.6)'],
                ['rgba(200, 192, 192, 0.6)'],
                ['rgba(230, 70, 192, 0.6)'],
              ],
              borderWidth: 4,
            },
          ],
        });
        setTypeOfChart({
          typeChart: 'pie',
        });
      })
      .catch((error: Error) => setChartData({ error }));
  }

  function createNewStateForCountry(country: string, cases: string) {
    setStateActiveGraph(3);
    fetch(`https://api.covid19api.com/country/${country}/status/${cases}`)
      .then((response: Response) => response.json())
      .then((res: []) => {
        const newCases = res.map((el: Record<string, number>) => el['Cases']);
        const newDate = res.map((el: Record<string, string>) => transformDate(el['Date']));
        setChartData({
          labels: newDate,
          datasets: [
            {
              label: `${
                cases[0].toUpperCase() + cases.slice(1)
              } cases for ${country.toUpperCase()}:`,
              data: newCases,
              backgroundColor: [
                ['rgba(150, 90, 192, 0.6)'],
                ['rgba(200, 192, 192, 0.6)'],
                ['rgba(230, 70, 192, 0.6)'],
              ],
              borderWidth: 4,
            },
          ],
        });
        setTypeOfChart({
          typeChart: 'line',
        });
      })
      .catch((error: Error) => setChartData({ error }));
  }

  function createNewStateForRate(country: string, cases: string) {
    setStateActiveGraph(2);
    const urlCurrent = `https://disease.sh/v3/covid-19/countries/${country}`;
    const urlForecast = `https://api.covid19api.com/country/${country}/status/${cases}`;
    const requests = [fetch(urlCurrent), fetch(urlForecast)];

    let selectCountry: ICovid = {} as ICovid;
    let newCases = [] as number[];
    let newDate = [] as string[];
    Promise.all(requests)
      .then(values => Promise.all(values.map(r => r.json())))
      .then((res: [ICovid, Record<string, number>[], Record<string, string>[]]) => {
        res.forEach((item, index) => {
          if (index === 0) {
            selectCountry = item as ICovid;
          } else if (index === 1) {
            newCases = (item as Record<string, number>[]).map(
              (el: Record<string, number>) => el['Cases']
            );
            newCases = newCases.map(el => el / (selectCountry.population / 100000));
            newDate = (item as Record<string, string>[]).map((el: Record<string, string>) => transformDate(el['Date']));
          }
          setChartData({
            labels: newDate,
            datasets: [
              {
                label: `${
                  cases[0].toUpperCase() + cases.slice(1)
                } cases for ${country.toUpperCase()}: per 100k`,
                data: newCases,
                backgroundColor: [
                  ['rgba(150, 90, 192, 0.6)'],
                  ['rgba(200, 192, 192, 0.6)'],
                  ['rgba(230, 70, 192, 0.6)'],
                ],
                borderWidth: 4,
              },
            ],
          });
          setTypeOfChart({
            typeChart: 'line',
          });
        });
      })
      .catch((error: Error) => setChartData({ error }));
  }

  useEffect(() => {
    if (stateActiveGraph === 2) {
      createNewStateForRate(cnt.stateApp.country, cnt.stateApp.casses);
    } else if (stateActiveGraph === 3) {
      createNewStateForCountry(cnt.stateApp.country, cnt.stateApp.casses);
    } else {
      createNewStateTotalCases();
    }
  }, [cnt]);

  function Pies() {
    return (
      <Pie
        data={chartData}
        options={{
          responsive: true,
        }}
      />
    );
  }

  function Lines() {
    return (
      <Line
        data={chartData}
        options={{
          responsive: true,
        }}
      />
    );
  }

  return (
    <React.Fragment>
      <h1>Covid-cases</h1>
      <div className={styles['nav-bar-wrapper']}>
        <div className={styles['nav-bar']}>
          <button
            className={styles['nav-bar__button']}
            type="button"
            onClick={() => createNewStateTotalCases()}
          >
            Total Cases
          </button>
          <button
            className={styles['nav-bar__button']}
            type="button"
            onClick={() => createNewStateNewCases()}
          >
            Daily Cases
          </button>
          <button
            className={styles['nav-bar__button']}
            type="button"
            onClick={() => createNewStateForRate(cnt.stateApp.country, cnt.stateApp.casses)}
          >
            Incidence Rate
          </button>
          <button
            className={styles['nav-bar__button']}
            type="button"
            onClick={() => createNewStateForCountry(cnt.stateApp.country, cnt.stateApp.casses)}
          >
            For Country...
          </button>
        </div>
      </div>
      <div className={styles['graph-container']}>
        <div className={styles['graph-pie']}>
          {typeOfChart['typeChart'] === 'pie' && <Pies />}
          {typeOfChart['typeChart'] === 'line' && <Lines />}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Chart;

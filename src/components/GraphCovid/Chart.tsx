/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';

import styles from '@/components/GraphCovid/GraphCovid.scss';

const Chart = (): JSX.Element => {
  const [chartDataTotal, setChartDataTotal] = useState({});
  /*   function transformDate(date: string): string {
    const options = {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    };
    const dateTransformed = new Date(date);
    return dateTransformed.toLocaleString('ru', options);
  } */

  function fn1() {
    fetch('https://api.covid19api.com/summary')
      .then(response => response.json())
      .then(res => {
        const dateWithCases = res.Global.TotalConfirmed;
        const totalDeaths = res.Global.TotalDeaths;
        const totalRecovered = res.Global.TotalRecovered;
        setChartDataTotal({
          labels: ['TotalConfirmed', 'TotalDeaths', 'TotalRecovered'],
          datasets: [
            {
              label: 'test',
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
      })
      .catch((error: Error) => setChartDataTotal({ error }));
  }

  function fn2() {
    fetch('https://api.covid19api.com/summary')
      .then(response => response.json())
      .then(res => {
        const numberOfCases = res.Global.NewConfirmed;
        const newDeaths = res.Global.NewDeaths;
        const newRecovered = res.Global.NewRecovered;
        setChartDataTotal({
          labels: ['NewConfirmed', 'NewDeaths', 'NewRecovered'],
          datasets: [
            {
              label: 'test',
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
      })
      .catch((error: Error) => setChartDataTotal({ error }));
  }

  useEffect(() => {
    fn1();
  }, []);

  return (
    <div>
      <h1>Covid-cases</h1>
      <div className={styles['nav-bar-wrapper']}>
        <div className={styles['nav-bar']}>
          <button className={styles['nav-bar__button']} type="button" onClick={() => fn1()}>
            One
          </button>
          <button className={styles['nav-bar__button']} type="button" onClick={() => fn2()}>
            Two
          </button>
          <button className={styles['nav-bar__button']} type="button">
            Three
          </button>
        </div>
      </div>
      <div className={styles['graph-pie']}>
        <Pie
          data={chartDataTotal}
          options={{
            responsive: true,
            title: { text: 'Total cases', display: true },
          }}
        />
      </div>
    </div>
  );
};

export default Chart;

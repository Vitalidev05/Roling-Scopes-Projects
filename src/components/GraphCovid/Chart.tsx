/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useState, useEffect } from 'react';
import { Pie, Line } from 'react-chartjs-2';

import styles from '@/components/GraphCovid/GraphCovid.scss';

const Chart = (): JSX.Element => {
  const [chartData, setChartData] = useState({});
  const [typeOfChart, setTypeOfChart] = useState({});

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
    fetch(`https://api.covid19api.com/country/${country}/status/${cases}`)
      .then((response: Response) => response.json())
      .then((res: []) => {
        const newCases = res.map((el: Record<string, number>) => el['Cases']);
        const newDate = res.map((el: Record<string, string>) => transformDate(el['Date']));
        setChartData({
          labels: newDate,
          datasets: [
            {
              label: `Cases for ${country.toUpperCase()}: ${cases}`,
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

  useEffect(() => {
    createNewStateTotalCases();
  }, []);

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
    <div>
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
            onClick={() => createNewStateForCountry('ukraine', 'confirmed')}
          >
            For Country...
          </button>
        </div>
      </div>
      <div>
        {typeOfChart['typeChart'] === 'pie' && <Pies />}
        {typeOfChart['typeChart'] === 'line' && <Lines />}
      </div>
    </div>
  );
};

export default Chart;

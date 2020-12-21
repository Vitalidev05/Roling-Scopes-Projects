/* eslint-disable @typescript-eslint/no-unsafe-member-access */
<<<<<<< HEAD
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';

import styles from '@/components/GraphCovid/GraphCovid.scss';

const Chart = (): JSX.Element => {
  const [chartDataTotal, setChartDataTotal] = useState({});

  /*   function transformDate(date: string): string {
=======
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable react/destructuring-assignment */
import axios from 'axios';
import React, { /* Component, */ useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';

const Chart = (): JSX.Element => {
  const [chartData, setChartData] = useState({});

  function transformDate(date: string): string {
>>>>>>> e81a4cb... feat: implemented a test chart
    const options = {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    };
    const dateTransformed = new Date(date);
    return dateTransformed.toLocaleString('ru', options);
<<<<<<< HEAD
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
=======
  }

  const chart = () => {
    const numberOfCases: [number] = [0];
    const dateWithCases: [string] = [''];
    axios
      .get('https://api.covid19api.com/country/south-africa/status/confirmed')
      .then(res => {
        res.data.forEach((el: Record<string, number>) => numberOfCases.push(el['Cases']));
        res.data.forEach((el: Record<string, string>) => {
          const transformedDate = transformDate(el['Date']);
          dateWithCases.push(transformedDate);
        });
        setChartData({
          labels: dateWithCases,
          datasets: [
            {
              label: 'test',
              data: numberOfCases,
              backgroundColor: ['rgba(75, 192, 192, 0.6)'],
>>>>>>> e81a4cb... feat: implemented a test chart
              borderWidth: 4,
            },
          ],
        });
      })
<<<<<<< HEAD
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
      <div>
        <Pie
          data={chartDataTotal}
          options={{
            responsive: true,
            title: { text: 'Total cases', display: true },
=======
      .catch(err => {
        // eslint-disable-next-line no-console
        console.log(err);
      });
  };

  useEffect(() => {
    chart();
  }, []);
  return (
    <div className="App">
      <h1>Covid-cases</h1>
      <div>
        <Line
          data={chartData}
          options={{
            responsive: true,
            title: { text: 'TEST', display: true },
            scales: {
              yAxes: [
                {
                  ticks: {
                    autoSkip: true,
                    maxTicksLimit: 10,
                    beginAtZero: true,
                  },
                  gridLines: {
                    display: false,
                  },
                },
              ],
              xAxes: [
                {
                  gridLines: {
                    display: false,
                  },
                },
              ],
            },
>>>>>>> e81a4cb... feat: implemented a test chart
          }}
        />
      </div>
    </div>
  );
};

export default Chart;
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable react/destructuring-assignment */
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';

const Chart = (): JSX.Element => {
  const [chartData, setChartData] = useState({});

  function transformDate(date: string): string {
    const options = {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    };
    const dateTransformed = new Date(date);
    return dateTransformed.toLocaleString('ru', options);
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
              borderWidth: 4,
            },
          ],
        });
      })
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
          }}
        />
      </div>
    </div>
  );
};

export default Chart;
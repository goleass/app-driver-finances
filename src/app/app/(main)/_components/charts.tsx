'use client'

import dynamic from 'next/dynamic'
const ApexChart = dynamic(() => import('react-apexcharts'), { ssr: false })

export function ExampleChart({ series }: { series: number[] }) {
  return (
    <>
      <ApexChart
        type="donut"
        options={{
          colors: ['#16BDCA', '#E74694'],
          chart: {
            height: 320,
            width: '100%',
            type: 'donut',
          },
          stroke: {
            colors: ['transparent'],
            lineCap: 'butt',
          },
          plotOptions: {
            pie: {
              donut: {
                labels: {
                  show: false,
                  name: {
                    show: false,
                    fontFamily: 'Inter, sans-serif',
                    offsetY: 20,
                  },
                  total: {
                    showAlways: true,
                    show: true,
                    label: 'Total',
                    fontFamily: 'Inter, sans-serif',
                    formatter: function (w) {
                      const sum = w.globals.seriesTotals.reduce((a, b) => {
                        return a + b
                      }, 0)
                      return 'R$ ' + sum
                    },
                  },
                  value: {
                    show: true,
                    fontFamily: 'Inter, sans-serif',
                    offsetY: -20,
                    formatter: function (value) {
                      return value + 'k'
                    },
                  },
                },
                size: '80%',
              },
            },
          },
          grid: {
            padding: {
              top: -2,
            },
          },
          labels: ['Entrada', 'Saída'],
          dataLabels: {
            enabled: true,
          },
          legend: {
            position: 'bottom',
            fontFamily: 'Inter, sans-serif',
          },
          yaxis: {
            labels: {
              formatter: function (value) {
                return 'R$ ' + value
              },
            },
          },
          xaxis: {
            labels: {
              formatter: function (value) {
                return 'R$ ' + value
              },
            },
            axisTicks: {
              show: false,
            },
            axisBorder: {
              show: false,
            },
          },
        }}
        series={series}
        height={250}
        width={300}
      />
    </>
  )
}

export function ExampleChart2({ series }: { series: number[] }) {
  return (
    <>
      <ApexChart
        type="donut"
        options={{
          colors: ['#1C64F2', '#16BDCA', '#FDBA8C'],
          chart: {
            height: 320,
            width: '100%',
            type: 'donut',
          },
          stroke: {
            colors: ['transparent'],
            lineCap: 'butt',
          },
          plotOptions: {
            pie: {
              donut: {
                labels: {
                  show: false,
                  name: {
                    show: false,
                    fontFamily: 'Inter, sans-serif',
                    offsetY: 20,
                  },
                  total: {
                    showAlways: true,
                    show: true,
                    label: 'Total',
                    fontFamily: 'Inter, sans-serif',
                    formatter: function (w) {
                      const sum = w.globals.seriesTotals.reduce((a, b) => {
                        return a + b
                      }, 0)
                      return 'R$ ' + sum
                    },
                  },
                  value: {
                    show: true,
                    fontFamily: 'Inter, sans-serif',
                    offsetY: -20,
                    formatter: function (value) {
                      return value + 'k'
                    },
                  },
                },
                size: '80%',
              },
            },
          },
          grid: {
            padding: {
              top: -2,
            },
          },
          labels: ['Aplicativo', 'Manutenção', 'Combustivel'],
          dataLabels: {
            enabled: true,
          },
          legend: {
            position: 'bottom',
            fontFamily: 'Inter, sans-serif',
          },
          yaxis: {
            labels: {
              formatter: function (value) {
                return 'R$ ' + value
              },
            },
          },
          xaxis: {
            labels: {
              formatter: function (value) {
                return 'R$ ' + value
              },
            },
            axisTicks: {
              show: false,
            },
            axisBorder: {
              show: false,
            },
          },
        }}
        series={series}
        height={250}
        width={300}
      />
    </>
  )
}

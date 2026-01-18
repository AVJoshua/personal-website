import { PrimaryColor } from './stockAnalysisDashboard';
import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js';
import { Line } from 'react-chartjs-2';
Chart.register(CategoryScale)



function LineChartContent({priceHistory}:{priceHistory: any}) {

  const lineChartData = {
    labels: priceHistory.date,
    datasets: [
      {
        data: priceHistory.price,
        borderColor: PrimaryColor,
        borderWidth: 2,
        pointRadius: 0,
      }
    ]
  }
 
  return (
    <Line
      data={lineChartData}
      options={{
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Historical Stock Price'
          },
          legend: {
            display: false
          }
        }
      }}
    />
  )
}

export default LineChartContent

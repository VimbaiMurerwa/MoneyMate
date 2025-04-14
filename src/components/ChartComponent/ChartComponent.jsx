import React from "react";
import ReactApexChart from "react-apexcharts";

const ChartComponent = ({ transactions }) => {
  // Check if there are transactions, otherwise render nothing or a placeholder
  if (!transactions || transactions.length === 0) {
    return <div>No transactions available</div>;
  }

  const chartData = {
    options: {
      chart: {
        id: "basic-line", 
        toolbar: {
          show: false, // Hide the toolbar
        },
      },
      xaxis: {
        categories: transactions.map((transaction) => transaction.date), 
        title: {
          text: "Date", 
        },
      },
      yaxis: {
        title: {
          text: "Amount", 
        },
      },
      stroke: {
        curve: "smooth", 
        width: 2, 
      },
      colors: ["var(--primary-purple)"], 
      tooltip: {
        enabled: true, 
        shared: false, 
        x: {
          formatter: (value) => `Date: ${value}`, 
        },
        y: {
          formatter: (value) => `Amount: $${value.toFixed(2)}`
        },
      },
    },
    series: [
      {
        name: "Amount",
        data: transactions.map((transaction) => transaction.amount),
      },
    ],
  };

  return (
    <ReactApexChart
      options={chartData.options}
      series={chartData.series}
      type="line"
      height={350}
    />
  );
};

export default ChartComponent;


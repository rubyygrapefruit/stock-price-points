import React from 'react';
import PropTypes from 'prop-types';
import Bar from '../Bar/Bar.jsx';
import Chart from '../Chart/Chart.jsx';
import BallLine from '../BallLine/BallLine.jsx';
import CurrentPrice from '../CurrentPrice/CurrentPrice.jsx';


const BarChart = ({ weeklyData, yearlyData, currentPrice }) => {
  // Width of each bar
  const itemWidth = 11.46;
  const itemMargin = 11.45;
  const dataLength = weeklyData.length;

  // find week with most stocks purchased
  let mostStocks = weeklyData.reduce((acc, cur) => {
    const { weekStocksPurchased } = cur;
    return weekStocksPurchased > acc ? weekStocksPurchased : acc;
  }, 0);

  // Reshape the data to the 96px-max-height proportions
  const resizedData = weeklyData.map(
    week => Object.assign(
      {},
      week,
      { weekStocksPurchased: week.weekStocksPurchased / (mostStocks / 96) },
    ),
  );

  // re-identify week with most stocks purchased after data-resize
  mostStocks = resizedData.reduce((acc, cur) => {
    const { weekStocksPurchased } = cur;
    return weekStocksPurchased > acc ? weekStocksPurchased : acc;
  }, 0);

  const chartHeight = mostStocks;

  return (
    <div>
      <Chart
        width={dataLength * (itemWidth + itemMargin)}
        height={chartHeight + 40}
      >
        {resizedData.map((week, index) => {
          const itemHeight = week.weekStocksPurchased;
          return (
            <Bar
              x={index * (itemWidth + itemMargin)}
              y={chartHeight - itemHeight}
              width={itemWidth}
              height={itemHeight}
            />
          );
        })}
        <BallLine
          yearlyData={yearlyData}
        />
        <CurrentPrice
          yearlyData={yearlyData}
          currentPrice={currentPrice}
        />
      </Chart>
    </div>
  );
};

BarChart.propTypes = {
  weeklyData: PropTypes.arrayOf(PropTypes.object).isRequired,
  yearlyData: PropTypes.objectOf(PropTypes.number).isRequired,
  currentPrice: PropTypes.number.isRequired,
};

export default BarChart;
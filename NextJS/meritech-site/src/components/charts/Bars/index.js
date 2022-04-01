/* eslint-disable no-param-reassign */
import PropTypes from 'prop-types';
import cx from 'classnames';
import { useState } from 'react';
import { Arrow } from 'components/icons';
import * as d3 from 'd3';
import numeral from 'numeral';
import { max } from 'lodash';
import useAppendD3Chart from '~hooks/useAppendD3Chart';
import * as styles from './Bars.module.scss';
import {
  formatDataValue,
  formatPercentage,
  formatNumber,
  formatFloatNumber,
  formatFloatSingleDecimal,
  formatCurrency,
  formatCurrencySingleDecimal,
  getTextWidth,
} from '~charts/utils';

function BarChart(
  data,
  {
    x = (d) => d.x,
    y = (d) => d.yLabel,
    width = 240,
    height,
    color = '#12846B',
    marginTop = 0,
    marginBottom = 0,
    marginLeft = 90,
    marginRight = 60,
    medianType,
    tooltipDataType,
    valueType,
    singleDecimal,
  } = {},
  el,
) {
  const textWidthsOfCompanyNames = data.map((d) => {
    return getTextWidth(d.yLabel, 12);
  });
  // dynamically calculating left margin
  marginLeft = max(textWidthsOfCompanyNames) + 10;
  const distanceBetweenBars = 0;

  const X = d3.map(data, x);
  const Y = d3.map(data, y);

  const barsPadding = 8;

  const yDomain = new d3.InternSet(Y);

  // Omit any data not present in the y-domain.
  const I = d3.range(X.length).filter((i) => yDomain.has(Y[i]));

  // Compute the default height.
  if (height === undefined)
    height =
      Math.ceil((yDomain.size + distanceBetweenBars) * 25) +
      marginTop +
      marginBottom;

  // Construct scales and axes.
  const xScale = d3
    .scaleLinear()
    .domain([d3.min(X) < 0 ? d3.min(X) : 0, d3.max(X)])
    .range([marginLeft, width - (marginRight + 15)]);

  const yScale = d3
    .scaleBand()
    .domain(yDomain)
    .range([marginTop, height - marginBottom])
    .padding(0);

  const yAxis = d3
    .axisRight(yScale)
    .tickSizeOuter(0)
    .tickSizeInner(0)
    .tickPadding(8);

  // Tooltip
  const tooltip = d3.select(el).append('div').attr('class', 'tooltip');

  // Viewbox
  const svg = d3
    .create('svg')
    .attr('width', width)
    .attr('height', height)
    .attr('viewBox', [0, 0, width, height])
    .attr('style', 'max-width: 100%; height: auto; overflow: initial');

  // bars
  svg
    .append('g')
    .attr('fill', color)
    .attr('class', 'bars')
    .selectAll('rect')
    .data(I)
    .join('rect')
    .attr('x', xScale(0) + barsPadding)
    .attr('y', (i) => yScale(Y[i]))
    .attr('width', (i) => {
      const rectWidth = xScale(X[i]) - xScale(0);
      if (rectWidth < 0) {
        return rectWidth * -1;
      }
      return rectWidth;
    })
    .attr('transform', (i) => {
      const rectWidth = xScale(X[i]) - xScale(0);
      if (rectWidth < 0) {
        return `translate(${rectWidth}, 6)`;
      }
      return 'translate(0, 6)';
    })
    .attr('height', yScale.bandwidth() - 12);

  // Median mark

  const median = svg.append('g').attr('class', 'median');

  median
    .append('rect')
    .attr('x', xScale(d3.median(data, x)) + barsPadding)
    .attr('y', -26)
    .style('fill', '#D37D1D')
    .attr('width', 2)
    .attr('height', height + 26);
  let medianValue = d3.median(data, (d) => d.x);
  if (medianType && medianType === 'percentage') {
    medianValue = numeral(formatPercentage(medianValue)).format('(0,0.0%)');
  } else if (medianType && medianType === 'percentageInteger') {
    medianValue = numeral(formatPercentage(medianValue)).format('(0,0%)');
  } else if (medianType && medianType === 'float') {
    medianValue = singleDecimal
      ? formatFloatSingleDecimal(medianValue)
      : formatFloatNumber(medianValue);
  } else if (medianType && medianType === 'currency') {
    medianValue = formatCurrency(medianValue);
  } else if (medianType && medianType === 'currencyWithDecimalOnLessThanOne') {
    if (medianValue < 1) {
      medianValue = formatCurrencySingleDecimal(medianValue);
    } else {
      medianValue = formatCurrency(medianValue);
    }
  } else if (medianType && medianType === 'times') {
    medianValue = formatNumber(medianValue);
  } else if (medianType && medianType === 'currencySingleDecimal') {
    medianValue = formatCurrencySingleDecimal(medianValue);
  }
  const widerTypes = [
    'percentage',
    'percentageInteger',
    'currency',
    'currencySingleDecimal',
    'currencyWithDecimalOnLessThanOne',
  ];
  const widthConstant = medianType && widerTypes.includes(medianType) ? 8 : 6;

  medianValue = medianValue.toString().slice(0, 6);

  median
    .append('rect')
    .attr('x', xScale(d3.median(data, x)) + 8)
    .attr('y', -12)
    .style('fill', '#D37D1D')
    .attr('width', 50 + medianValue?.length * widthConstant)
    .attr('height', 2);

  median
    .append('rect')
    .attr('x', xScale(d3.median(data, x)) + 8)
    .attr('y', -26)
    .style('fill', '#D37D1D')
    .attr('rx', 3)
    .attr('width', 50 + medianValue?.length * widthConstant)
    .attr('height', 16);

  median
    .append('text')
    .text('MEDIAN')
    .attr('x', xScale(d3.median(data, x)) + 12)
    .attr('y', -14)
    .style('fill', '#000');

  median
    .append('text')
    .text(medianValue)
    .attr('x', xScale(d3.median(data, x)) + 58)
    .attr('y', -14)
    .style('fill', '#000')
    .style('font-weight', '600');

  // Right column content
  svg
    .append('g')
    .attr('class', 'right-bar')
    .attr('transform', `translate(${width - marginRight},0)`)
    .attr('fill', '#231F20')
    .attr('text-anchor', 'end')
    .attr('font-size', 10)
    .selectAll('text')
    .data(I)
    .join('text')
    .style('font-size', '12px')
    .style('color', '#231F20')
    .attr('class', (i) => `row-${i}-value`)
    .attr('x', marginRight - 10)
    .attr('y', (i) => yScale(Y[i]) + yScale.bandwidth() / 2)
    .attr('dy', '0.35em')
    .attr('dx', -4)
    .text((d, i) => {
      let value = data[i].xLabel;
      if (valueType && valueType === 'percentage') {
        value = numeral(formatPercentage(value)).format('(0,0.0%)');
      } else if (valueType && valueType === 'percentageInteger') {
        value = numeral(formatPercentage(value)).format('(0,0%)');
      } else if (valueType && valueType === 'times') {
        value = formatNumber(value);
      } else if (valueType && valueType === 'float') {
        value = singleDecimal
          ? formatFloatSingleDecimal(value)
          : formatFloatNumber(value);
      } else if (
        valueType &&
        valueType === 'currencyWithDecimalOnLessThanOne'
      ) {
        if (data[i].x < 1) {
          value = formatCurrencySingleDecimal(data[i].x);
        } else {
          value = formatCurrency(data[i].x);
        }
      } else if (valueType && valueType === 'currencySingleDecimal') {
        value = formatCurrencySingleDecimal(value);
      } else {
        value = formatDataValue(data[i].xLabel);
      }
      return value;
    });

  // Left column content
  svg
    .append('g')
    .attr('transform', `translate(${marginLeft},0)`)
    .call(yAxis)
    .selectAll('text')
    .text((d, i) => data[i].yLabel)
    .style('color', '#494643')
    .style('font-weight', '600')
    .style('font-size', '12px')
    .attr('transform', `translate(${-marginLeft},0)`)
    .attr('class', (i, d) => `row-${d}-name`);

  // Right column
  const node = svg.select('.domain').node();

  svg
    .select('.right-bar')
    .append('path')
    .attr('stroke', '#DCDCD4')
    .attr('d', node?.getAttribute('d'));

  svg.select('.domain').attr('stroke', '#DCDCD4');

  // Hover state

  function handleMouseOver(d) {
    d.target.style.opacity = '.1';
    const index = parseInt(d.target.getAttribute('data-index'), 10);
    const { y: yValue, yLabel, xLabel } = data[index];
    let tooltipValue = xLabel;
    if (tooltipDataType && tooltipDataType === 'float') {
      tooltipValue = singleDecimal
        ? formatFloatSingleDecimal(tooltipValue)
        : formatFloatNumber(tooltipValue);
    } else if (tooltipDataType && tooltipDataType === 'percentage') {
      tooltipValue = numeral(formatPercentage(tooltipValue)).format('(0,0.0%)');
    } else if (tooltipDataType && tooltipDataType === 'percentageInteger') {
      tooltipValue = numeral(formatPercentage(tooltipValue)).format('(0,0%)');
    } else if (
      tooltipDataType &&
      tooltipDataType === 'currencyWithDecimalOnLessThanOne'
    ) {
      if (data[index].x < 1) {
        tooltipValue = formatCurrencySingleDecimal(data[index].x);
      } else {
        tooltipValue = formatCurrency(data[index].x);
      }
    } else if (tooltipDataType && tooltipDataType === 'currencySingleDecimal') {
      tooltipValue = formatCurrencySingleDecimal(tooltipValue);
    } else {
      tooltipValue = formatDataValue(tooltipValue);
    }
    d3.select('.value-name').text(tooltipValue);
    d3.select('.value-value').text(yLabel);
    d3.select('.value-abbreviation').text(yValue);
    tooltip.style('opacity', '1');
    d3.select(`.row-${index}-value`).style('font-weight', '600');
    d3.select(`.row-${index}-name`).style('color', '#12846B');
  }

  function handleMouseOut(d) {
    d.target.style.opacity = '0';
    tooltip.style('opacity', '0');
    data.forEach((_d, i) => {
      d3.select(`.row-${i}-value`).style('font-weight', 'normal');
      d3.select(`.row-${i}-name`).style('color', '#494643');
    });
  }

  function handleMouseMove(d) {
    const padding = 10;
    const [xPosition, yPosition] = d3.pointer(d);
    const tooltipWidth = tooltip.node().clientWidth;
    const tooltipHeight = tooltip.node().clientHeight;

    const chartWidth = width - marginRight;

    const left =
      xPosition + tooltipWidth - padding < chartWidth
        ? xPosition + padding
        : xPosition - tooltipWidth - padding;

    tooltip
      .style('left', `${left}px`)
      .style('top', `${yPosition - tooltipHeight - padding}px`);
  }

  svg.append('g').attr('class', 'hover-state');
  data.forEach((e, i) => {
    svg
      .select('.hover-state')
      .append('rect')
      .attr('class', 'hover-child')
      .attr('data-index', i)
      .attr('opacity', 0)
      .attr('width', width)
      .attr('y', 25 * i)
      .attr('height', 25)
      .attr('fill', '#12846B')
      .on('mouseover', handleMouseOver)
      .on('mousemove', handleMouseMove)
      .on('mouseout', handleMouseOut);
  });

  // tooltip
  tooltip
    .style('background', '#DBE6E1')
    .style('width', '150px')
    .style('opacity', 0)
    .style('padding', '12px')
    .style('pointer-events', 'none')
    .style('position', 'absolute')
    .style('border', '1px solid #12846B')
    .selectAll('div')
    .data(['name', 'abbreviation', 'value'])
    .enter()
    .append('p')
    .attr('class', (d) => `value-${d}`);

  return svg.node();
}

export default function Bars({ data, ...props }) {
  const [sortBy, setSortBy] = useState({ key: 'value', asc: true });

  const sortByField = () => {
    if (sortBy.key === 'value') {
      return data.sort((a, b) => {
        const firstItem = sortBy.asc ? b : a;
        const secondItem = sortBy.asc ? a : b;
        return firstItem.x - secondItem.x;
      });
    }

    if (sortBy.key === 'name') {
      return data.sort((a, b) => {
        const nameA = a.y.replace(/\*/, '').toUpperCase();
        const nameB = b.y.replace(/\*/, '').toUpperCase();

        if (nameA > nameB) {
          return sortBy.asc ? -1 : 1;
        }
        if (nameA < nameB) {
          return sortBy.asc ? 1 : -1;
        }

        return 0;
      });
    }

    return data.sort((a, b) => b.x - a.x);
  };

  const [ref, width] = useAppendD3Chart((el) => {
    return BarChart(
      sortByField(),
      {
        width,
        ...props,
      },
      el,
    );
  }, data);

  const sortByValueHandler = () => {
    setSortBy((prev) => ({
      key: 'value',
      asc: !prev.asc,
    }));
  };

  const sortByNameHandler = () => {
    setSortBy((prev) => ({
      key: 'name',
      asc: !prev.asc,
    }));
  };

  return (
    <div className={styles.component}>
      <div className={styles.header}>
        <button
          className={cx(styles.button, {
            [styles.buttonActived]: sortBy.key === 'name',
          })}
          type="button"
          onClick={sortByNameHandler}
        >
          Name
          <Arrow
            className={cx(styles.arrow, {
              [styles.arrowDown]: sortBy.key === 'name' && sortBy.asc,
            })}
          />
        </button>
        <button
          className={cx(styles.button, {
            [styles.buttonActived]: sortBy.key === 'value',
          })}
          type="button"
          onClick={sortByValueHandler}
        >
          Value
          <Arrow
            className={cx(styles.arrow, {
              [styles.arrowDown]: sortBy.key === 'value' && sortBy.asc,
            })}
          />
        </button>
      </div>
      <div id="chart" ref={ref} />
    </div>
  );
}

Bars.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      abbreviation: PropTypes.string,
      frequency: PropTypes.string,
    }),
  ).isRequired,
};

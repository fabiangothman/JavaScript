/* eslint-disable no-param-reassign */
import PropTypes from 'prop-types';
import cx from 'classnames';
import { useState } from 'react';
import { Arrow } from 'components/icons';
import * as d3 from 'd3';
import useAppendD3Chart from '~hooks/useAppendD3Chart';
import * as styles from './TwoBars.module.scss';
import { formatIntegerNumber } from '~charts/utils';

function TwoBarsChart(
  data,
  {
    x = (d) => d.twoValuesCombined,
    y = (d) => d.yLabel,
    width = 240,
    height,
    color = '#12846B',
    marginTop = 0,
    marginBottom = 0,
    marginLeft = 55,
    marginRight = 60,
  } = {},
  el,
) {
  const distanceBetweenBars = 0;

  const X = d3.map(data, x);
  const Y = d3.map(data, y);

  const barsPadding = 8;

  const yDomain = new d3.InternSet(Y);

  // Omit any data not present in the y-domain.
  const I = d3.range(X.length).filter((i) => yDomain.has(Y[i]));

  // Compute the default height.
  if (height === undefined) {
    height =
      Math.ceil((yDomain.size + distanceBetweenBars) * 25) +
      marginTop +
      marginBottom;
  }

  // Construct scales and axes.
  const xScale = d3
    .scaleLinear()
    .domain([d3.min(X) < 0 ? d3.min(X) : 0, d3.max(X)])
    .range([marginLeft, width - (marginRight + 60)]);

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

  function goBack() {
    return this.parentNode;
  }

  // bars
  svg
    .append('g')
    .attr('fill', color)
    .attr('class', 'bars')
    .selectAll('.rect')
    .data(data)
    .enter()
    .append('g')
    .append('rect')
    .attr('x', xScale(0) + barsPadding)
    .attr('y', (_d, i) => yScale(Y[i]))
    .attr('width', (d) => {
      return xScale(d.x) - xScale(0);
    })
    .attr('transform', () => {
      return 'translate(0, 6)';
    })
    .attr('height', yScale.bandwidth() - 12)
    .select(goBack)
    // Second bar
    .append('rect')
    .attr('height', yScale.bandwidth() - 12)
    .attr('width', (i) => {
      return xScale(formatIntegerNumber(i.secondX)) - xScale(0);
    })
    .attr('x', (d) => {
      return xScale(0) + barsPadding + xScale(d.x) - xScale(0) + 3;
    })
    .attr('y', (_d, i) => yScale(Y[i]) + 6)
    .attr('fill', '#2364AA');

  // Median mark

  const median = svg.append('g').attr('class', 'median');

  median
    .append('rect')
    .attr('x', xScale(d3.median(data, x)) + barsPadding)
    .attr('y', -26)
    .style('fill', '#D37D1D')
    .attr('width', 2)
    .attr('height', height + 26);

  const medianValue = formatIntegerNumber(d3.median(data, x));

  median
    .append('rect')
    .attr('x', xScale(d3.median(data, x)) + 8)
    .attr('y', -12)
    .style('fill', '#D37D1D')
    .attr('width', 50 + medianValue?.length * 6)
    .attr('height', 2);

  median
    .append('rect')
    .attr('x', xScale(d3.median(data, x)) + 8)
    .attr('y', -26)
    .style('fill', '#D37D1D')
    .attr('rx', 3)
    .attr('width', 50 + medianValue?.length * 6)
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
  //   svg
  //     .append('g')
  //     .attr('class', 'right-bar')
  //     .attr('transform', `translate(${width - marginRight},0)`)
  //     .attr('fill', '#231F20')
  //     .attr('text-anchor', 'end')
  //     .attr('font-size', 10)
  //     .selectAll('text')
  //     .data(I)
  //     .join('text')
  //     .style('font-size', '12px')
  //     .style('color', '#231F20')
  //     .attr('class', (i) => `row-${i}-value`)
  //     .attr('x', marginRight - 70)
  //     .attr('y', (i) => yScale(Y[i]) + yScale.bandwidth() / 2)
  //     .attr('dy', '0.35em')
  //     .attr('dx', -4)
  //     .text((d, i) => {
  //       return formatIntegerNumber(data[i].xLabel);
  //     });
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
      return formatIntegerNumber(data[i].secondX + data[i].x);
    });

  // Left column content
  svg
    .append('g')
    .attr('transform', `translate(${marginLeft},0)`)
    .call(yAxis)
    .selectAll('text')
    .text((d, i) => data[i].y)
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
    const { secondX, x: xValue, yLabel } = data[index];
    // console.log(data[index]);
    // founding-to-ipo', 'ipo-to-today
    d3.select('.tooltip-row-title').text(yLabel);
    d3.select('.company-age-number').text(
      formatIntegerNumber(xValue + secondX),
    );
    d3.select('.founding-to-ipo-number').text(formatIntegerNumber(xValue));
    d3.select('.ipo-to-today-number').text(formatIntegerNumber(secondX));
    tooltip.style('opacity', '1');
    d3.selectAll(`.row-${index}-value`).style('font-weight', '600');
    d3.selectAll(`.row-${index}-name`).style('color', '#12846B');
  }

  function handleMouseOut(d) {
    d.target.style.opacity = '0';
    // tooltip.style('opacity', '0');
    data.forEach((_d, i) => {
      d3.selectAll(`.row-${i}-value`).style('font-weight', 'normal');
      d3.selectAll(`.row-${i}-name`).style('color', '#494643');
    });
  }

  function handleMouseMove(d) {
    const padding = 10;
    const [xPosition, yPosition] = d3.pointer(d);
    const tooltipWidth = tooltip.node().clientWidth;
    const tooltipHeight = tooltip.node().clientHeight;

    const chartWidth = width - marginRight - marginLeft;

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
    .style('width', '180px')
    // .style('opacity', 0)
    .style('padding', '12px')
    // .style('pointer-events', 'none')
    .style('position', 'absolute')
    .style('border', '1px solid #12846B')
    .append('p')
    .text('Title')
    .attr('class', 'tooltip-row-title')
    .select(goBack)
    .selectAll('div')
    .data(['founding-to-ipo', 'ipo-to-today', 'company-age'])
    .enter()
    .append('div')
    .attr('class', 'tooltip-row')
    .append('p')
    .attr('class', (d) => `${d}-label`)
    .text((d) => {
      if (d === 'founding-to-ipo') {
        return 'Founding to IPO';
      }
      if (d === 'ipo-to-today') {
        return 'IPO to Today';
      }
      return 'Company Age';
    })
    .select(goBack)
    .append('p')
    .attr('class', (d) => `${d}-number`)
    .text('100');

  return svg.node();
}

export default function TwoBars({ data, ...props }) {
  // It is an example, it's necessary to overwrite
  // this data passing the same fields. At least x and secondX.
  //   data = [
  //     {
  //       yoyLtmRevenueGrowth: '<30%',
  //       sector: 'Application',
  //       y: 'DBX',
  //       yLabel: 'Dropbox',
  //       x: 732.6087,
  //       xLabel: '$732.6087',
  //       secondX: 732.6087 / 2,
  //       secondXLabel: '$732.6087',
  //     },
  //     {
  //       yoyLtmRevenueGrowth: '>50%',
  //       sector: 'Application',
  //       y: 'ZM',
  //       yLabel: 'Zoom',
  //       x: 713.7083,
  //       xLabel: '$713.7083',
  //       secondX: 713.7083 / 2,
  //       secondXLabel: '$713.7083',
  //     },
  //     {
  //       yoyLtmRevenueGrowth: '30%-50%',
  //       sector: 'Application',
  //       y: 'PLTR',
  //       yLabel: 'Palantir',
  //       x: 579.4709,
  //       xLabel: '$579.4709',
  //       secondX: 579.4709 / 2,
  //       secondXLabel: '$579.4709',
  //     },
  //     {
  //       yoyLtmRevenueGrowth: '>50%',
  //       sector: 'Application',
  //       y: 'SHOP',
  //       yLabel: 'Shopify',
  //       x: 558.7109,
  //       xLabel: '$558.7109',
  //       secondX: 558.7109 / 2,
  //       secondXLabel: '$558.7109',
  //     },
  //     {
  //       yoyLtmRevenueGrowth: '>50%',
  //       sector: 'Application',
  //       y: 'SQSP',
  //       yLabel: 'Squarespace',
  //       x: 536.8311,
  //       xLabel: '$536.8311',
  //       secondX: 536.8311 / 2,
  //       secondXLabel: '$536.8311',
  //     },
  //     {
  //       yoyLtmRevenueGrowth: '>50%',
  //       sector: 'Infrastructure',
  //       y: 'TWLO',
  //       yLabel: 'Twilio',
  //       x: 422.4383,
  //       xLabel: '$422.4383',
  //       secondX: 422.4383 / 2,
  //       secondXLabel: '$422.4383',
  //     },
  //   ];

  data = data.map((d) => {
    return {
      ...d,
      twoValuesCombined: d.secondX + d.x,
    };
  });

  const [sortBy, setSortBy] = useState({ key: 'value', asc: true });

  const sortByField = () => {
    if (sortBy.key === 'value') {
      return data.sort((a, b) => {
        const firstItem = sortBy.asc ? b : a;
        const secondItem = sortBy.asc ? a : b;
        return firstItem.twoValuesCombined - secondItem.twoValuesCombined;
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
    return TwoBarsChart(
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

TwoBars.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      abbreviation: PropTypes.string,
      frequency: PropTypes.string,
    }),
  ).isRequired,
};

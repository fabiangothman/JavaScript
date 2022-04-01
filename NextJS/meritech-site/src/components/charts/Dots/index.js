/* eslint-disable no-param-reassign, radix, no-plusplus */
// import uniq from 'lodash/uniq';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import numeral from 'numeral';
import useAppendD3Chart from '~hooks/useAppendD3Chart';
import {
  formatClassName,
  formatFloatSingleDecimal,
  formatCurrencySingleDecimal,
  formatTimes,
  formatNumber,
  formatDataValue,
  formatPercentage,
  formatCurrency,
  formatIntegerNumber,
  formatFloatNumber,
  getTextWidth,
} from '~charts/utils';

function DotsChart(data, { width, xLabel, yLabel, xFormat, yFormat }, el) {
  const height = 500;
  const marginTop = 20;
  const marginBottom = 63;
  const marginLeft = 49;
  const marginRight = 30;

  const X = d3.map(data, (d) => d.xValue);
  const Y = d3.map(data, (d) => d.yValue);

  function goBack() {
    return this.parentNode;
  }

  function linearRegression(y, x) {
    const lr = {};
    const n = y.length;
    let sumX = 0;
    let sumY = 0;
    let sumXY = 0;
    let sumXX = 0;
    let sumYY = 0;

    for (let i = 0; i < y.length; i++) {
      sumX += x[i];
      sumY += y[i];
      sumXY += x[i] * y[i];
      sumXX += x[i] * x[i];
      sumYY += y[i] * y[i];
    }

    lr.slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    lr.intercept = (sumY - lr.slope * sumX) / n;
    lr.r2 =
      ((n * sumXY - sumX * sumY) /
        Math.sqrt((n * sumXX - sumX * sumX) * (n * sumYY - sumY * sumY))) **
      2;

    return lr;

    // now you have:
    // lr.slope
    // lr.intercept
    // lr.r2
  }

  const xScale = d3
    .scaleLinear()
    .domain(d3.extent(X))
    .range([marginLeft, width - marginRight]);

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(Y)])
    .range([height - marginBottom, marginTop])
    .nice();

  const getFormattedValue = (value, format) => {
    // let value = d;

    if (format && format === 'percentage') {
      value = numeral(formatPercentage(value)).format('(0,0.0%)');
    } else if (format && format === 'percentageInteger') {
      value = numeral(formatPercentage(value)).format('(0,0%)');
    } else if (format && format === 'times') {
      value = formatTimes(value);
    } else if (format && format === 'timesWithConditionalDecimal') {
      if (value - parseInt(value) === 0) {
        value = formatTimes(value);
      } else {
        value = formatNumber(value);
      }
    } else if (format && format === 'price') {
      value = formatCurrency(value);
    } else if (format && format === 'float') {
      value = formatFloatSingleDecimal(value);
    } else if (format && format === 'float2Decimal') {
      value = formatFloatNumber(value);
    } else if (format && format === 'number') {
      value = formatIntegerNumber(value);
    } else if (format && format === 'currencySingleDecimal') {
      value = formatCurrencySingleDecimal(value);
    } else {
      value = formatDataValue(value);
    }
    return value;
  };

  const xAxis = (g, x) => {
    return g.attr('transform', `translate(0,${height - marginBottom})`).call(
      d3
        .axisBottom(x)
        // .ticks(uniq(X).length)
        .tickSizeInner(0)
        .tickSizeOuter(0)
        .tickPadding(19)
        .tickFormat((d) => {
          return getFormattedValue(d, xFormat);
        }),
    );
  };
  //   const yAxis = (g, y) =>
  //     g.call(d3.axisLeft(y).tickSizeInner(0).tickSizeOuter(0).tickPadding(12));

  const yAxis = (g, y) =>
    g.call(
      d3
        .axisLeft(y)
        .ticks(7)
        .tickSizeInner(0)
        .tickSizeOuter(0)
        .tickPadding(8)
        .tickFormat((d) => {
          return getFormattedValue(d, yFormat);
        }),
    );

  // tooltip
  const tooltip = d3
    .select(el)
    .style('position', 'relative')
    .append('div')
    .attr('class', 'dots-tooltip');

  // Viewbox
  const svg = d3
    .create('svg')
    .attr('width', width)
    .attr('height', height + 20)
    .attr('viewBox', [0, 0, width, height + 0])
    .attr('style', 'max-width: 100%; height: auto; height: intrinsic;');

  svg
    .append('defs')
    .append('svg:clipPath')
    .attr('id', 'clip')
    .append('svg:rect')
    .attr('id', 'clip-rect')
    .attr('x', marginLeft) // - 5
    .attr('y', 0)
    .attr('height', height - marginBottom) // + 5
    .attr('width', width);

  const addLabel = (g, { text, x, y, rotate = 0 }) => {
    return g
      .append('text')
      .attr('x', x)
      .attr('y', y)
      .attr('transform', `rotate(-${rotate})`)
      .attr('fill', 'currentColor')
      .style('font-size', '12px')
      .attr('text-anchor', 'start')
      .style('font-weight', '600')
      .style('text-transform', 'uppercase')
      .text(text); // make it dynamic
  };

  // Bottom Axis
  const gx = svg.append('g');

  gx.style('color', '#494643')
    .style('opacity', 0.7)
    .style('font-family', 'Montserrat')
    .style('line-height', '14.63px')
    .style('font-size', '12px')
    .attr('transform', `translate(0,${height - marginBottom})`);

  addLabel(gx, {
    text: xLabel,
    x: width / 2 - 30,
    y: marginBottom,
  });

  // Left Axis

  const gy = svg.append('g');

  gy.style('color', '#494643')
    .style('opacity', 0.7)
    .style('font-family', 'Montserrat')
    .style('line-height', '14.63px')
    .style('font-size', '12px')
    .attr('transform', `translate(${marginLeft},0)`);

  addLabel(gy, {
    text: yLabel,
    x: -height / 2 - 30,
    y: -40,
    rotate: 90,
  });

  // Top Label

  const gx2 = svg.append('g');

  gx2
    .style('color', '#d37d1d')
    .style('font-family', 'Montserrat')
    .style('line-height', '14.63px')
    .style('font-size', '12px')
    .attr('transform', `translate(${marginLeft},0)`);
  const lr = linearRegression(Y, X);

  addLabel(gx2, {
    text: `R² = ${formatFloatNumber(lr?.r2)}`,
    x: width / 2 - 50,
    y: 0,
    rotate: 0,
  });

  // Add circles

  const groupWithClipPaht = svg.append('g').attr('clip-path', 'url(#clip)');

  const groupCircles = groupWithClipPaht
    .append('g')
    .attr('height', height)
    .attr('width', width)
    .attr('class', 'graph-group');

  groupCircles
    .selectAll('.circles')
    .data(data)
    .enter()
    .append('g')
    .append('circle')
    .attr('r', 20)
    .style('opacity', '0')
    .style('fill', '#DBE6E1')
    .style('pointer-events', 'none')
    .attr(
      'class',
      (d) =>
        `all-big-circles big-circle-${formatClassName(
          d.xValue,
        )}-${formatClassName(d.name)}`,
    )
    .attr('cx', (d) => xScale(d.xValue))
    .attr('cy', (d) => yScale(d.yValue))
    .select(goBack)
    .append('circle')
    .attr('r', 5)
    .attr('class', 'small-circle')
    .style('fill', '#12846B')
    .attr('cx', (d) => xScale(d.xValue))
    .attr('cy', (d) => yScale(d.yValue))
    .select(goBack)
    .append('text')
    .style('pointer-events', 'none')
    .style('font-weight', '600')
    .style('font-size', '11px')
    // .attr('stroke-width', '0.7')
    // .style('stroke', '#ffffff')
    .text((d) => d.ticker)
    .attr(
      'class',
      (d) => `circle-text circle-text-${formatClassName(d.ticker)}`,
    )
    .style('fill', '#494643b3')
    .attr('y', (d) => yScale(d.yValue) - 10)
    .attr('x', (d) => {
      return xScale(d.xValue) - getTextWidth(d.ticker) / 2;
    });

  // .attr('transform', (d) => {
  //   return `translate(-${d.name.length * 3}, 0)`;
  // });

  function handleMouseOut(_d, i) {
    tooltip.style('opacity', 0);
    d3.select(
      `.big-circle-${formatClassName(i.xValue)}-${formatClassName(i.name)}`,
    ).style('opacity', '0');
  }

  function handleMouseEnter(_d, i) {
    const { xValue, xFormatedValue, yFormatedValue, name, ticker } = i;

    d3.select('.x-value').text(xFormatedValue);
    tooltip.style('opacity', 1);
    d3.select('.y-value').text(yFormatedValue);
    d3.select('.tooltip-label').text(name);
    d3.select('.company-symbol').text(ticker);
    d3.select(
      `.big-circle-${formatClassName(xValue)}-${formatClassName(name)}`,
    ).style('opacity', '1');
  }

  const min = Math.min(d3.min(X), d3.min(Y));
  const max = Math.max(d3.max(X), d3.max(Y));

  const medianLine = groupWithClipPaht
    .append('line')
    .attr('stroke', '#D37D1D')
    .attr('stroke-dasharray', '4 7')
    .attr('stroke-width', '1')
    .attr('class', 'median-line')
    .attr('x1', xScale(min))
    .attr('y1', yScale(lr.intercept))
    .attr('x2', xScale(max))
    .attr('y2', yScale(max * lr.slope + lr.intercept));

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

  // Event listeners

  svg
    .selectAll('.small-circle')
    .on('mouseenter', handleMouseEnter)
    .on('mousemove', handleMouseMove)
    .on('mouseout', handleMouseOut);

  // Tooltip
  tooltip
    .style('background', '#DBE6E1')
    .style('width', '238px')
    .style('opacity', 0)
    .style('padding', '12px 12px 7px 12px')
    .style('pointer-events', 'none')
    .style('position', 'absolute')
    .style('border', '1px solid #12846B')
    .append('h2')
    .text('')
    .style('font-weight', '600')
    .style('color', '#231F20')
    .style('line-height', '14.63px')
    .style('margin-bottom', '6px')
    .style('font-size', '12px')
    // .style('margin-right', '6px')
    .style('display', 'inline-block')
    .select(goBack)
    .append('p')
    .text('')
    .attr('class', 'tooltip-label')
    .style('font-weight', '600')
    .style('color', '#131112')
    .style('line-height', '14.63px')
    .style('margin-bottom', '6px')
    .style('display', 'inline-block')
    .style('font-size', '12px')
    .select(goBack)
    .append('span')
    .text('a')
    .attr('class', 'company-symbol')
    .style('text-transform', 'uppercase')
    .style('font-weight', '600')
    .style('color', '#12846B')
    .style('line-height', '12.19px')
    .style('font-size', '10px')
    .style('margin-left', '6px')
    .select(goBack)
    .selectAll('div')
    .data([xLabel, yLabel])
    .enter()
    .append('div')
    .style('display', 'flex')
    .style('justify-content', 'space-between')
    .append('p')
    .text((d) => d)
    .style('font-weight', '600')
    .style('margin-bottom', '5px')
    .style('line-height', '12.19px')
    .style('color', '#494643')
    .style('font-size', '10px')
    .attr('class', (d) => `value-${d}`)
    .select(goBack)
    .append('p')
    .attr('class', (d) => {
      if (d === xLabel) {
        return 'x-value';
      }

      if (d === yLabel) {
        return 'y-value';
      }

      return '';
    })
    .text('40x')
    .style('font-weight', '600')
    .style('line-height', '12.19px')
    .style('color', '#231F20')
    .style('font-size', '12px');

  const gGrid = svg.append('g').attr('class', 'grid');

  // const dotsGroud = svg.append('g').attr('class', 'dotsss');

  const grid = (g, x, y) => {
    return g
      .attr('stroke', 'currentColor')
      .attr('stroke-opacity', 0.1)
      .call(() =>
        g
          .selectAll('.y')
          .data(y.ticks(12))
          .join(
            (enter) =>
              enter
                .append('line')
                .style('transform', `translate(${marginLeft}px, 0)`)
                .attr('class', 'y')
                .attr('x2', width - marginLeft),
            (update) => update,
            (exit) => exit.remove(),
          )
          .attr('y1', (d) => 0.5 + y(d))
          .attr('y2', (d) => 0.5 + y(d)),
      );
  };

  // Zooming
  function zoomed({ transform }) {
    const zx = transform.rescaleX(xScale).interpolate(d3.interpolateRound);
    const zy = transform.rescaleY(yScale).interpolate(d3.interpolateRound);
    groupCircles.attr('transform', transform);
    medianLine
      .attr('transform', transform)
      .attr('stroke-width', 1 / transform.k);
    d3.selectAll('.small-circle').attr('r', 5 / transform.k);
    d3.selectAll('.all-big-circles').attr('r', 20 / transform.k);
    d3.selectAll('.circle-text')
      .style('font-size', 11 / transform.k)
      //   .attr('stroke-width', 0.7 / transform.k)
      .attr('x', (d) => {
        return xScale(d.xValue) - getTextWidth(d.ticker, 11 / transform.k) / 2;
      })
      .attr('y', (d) => yScale(d.yValue) - 10 + transform.k);

    gx.call(xAxis, zx).call((g) => g.select('.domain').remove());
    gy.call(yAxis, zy).call((g) => g.select('.domain').remove());
    gGrid.call(grid, zx, zy);
  }
  // const graphBox = this.selections.graph.node().getBBox();
  // const margin = 200;
  const worldTopLeft = [0, 0];
  const worldBottomRight = [width, height];
  // this.zoom.translateExtent([worldTopLeft, worldBottomRight]);

  const zoom = d3
    .zoom()
    .translateExtent([worldTopLeft, worldBottomRight])
    .scaleExtent([1, 3])
    .on('zoom', zoomed);
  svg.call(zoom).call(zoom.transform, d3.zoomIdentity);

  return svg.node();
}

export default function Dots({ data, yLabel, xLabel, xFormat, yFormat }) {
  const r = () => Math.floor(Math.random() * 100);
  const dataa = [
    // { name: 'A', xValue: 0, yValue: 0 },
    { name: 'A', xValue: 1, yValue: 0 },
    { name: 'A', xValue: 2, yValue: r(20) },
    { name: 'A', xValue: 3, yValue: r(30) },
    { name: 'A', xValue: 4, yValue: r(40) },
    { name: 'A', xValue: 5, yValue: r(50) },
    { name: 'A', xValue: 6, yValue: r(60) },
    { name: 'A', xValue: 7, yValue: r(70) },
    { name: 'A', xValue: 8, yValue: r(80) },
    { name: 'A', xValue: 9, yValue: r(90) },
    { name: 'A', xValue: 10, yValue: r(100) },
    // { name: 'B', xValue: 0, yValue: 100 },
    { name: 'B', xValue: 1, yValue: r(10) },
    { name: 'B', xValue: 2, yValue: r(20) },
    { name: 'B', xValue: 3, yValue: r(30) },
    { name: 'B', xValue: 4, yValue: r(40) },
    { name: 'B', xValue: 5, yValue: r(50) },
    { name: 'B', xValue: 6, yValue: r(60) },
    { name: 'B', xValue: 7, yValue: r(70) },
    { name: 'B', xValue: 8, yValue: r(80) },
    { name: 'B', xValue: 9, yValue: r(90) },
    { name: 'B', xValue: 10, yValue: r(100) },
    // { name: 'C', xValue: 0, yValue: 100 },
    { name: 'C', xValue: 1, yValue: r(10) },
    { name: 'C', xValue: 2, yValue: r(20) },
    { name: 'C', xValue: 3, yValue: r(30) },
    { name: 'C', xValue: 4, yValue: r(40) },
    { name: 'C', xValue: 5, yValue: r(50) },
    { name: 'C', xValue: 6, yValue: r(60) },
    { name: 'C', xValue: 7, yValue: r(70) },
    { name: 'C', xValue: 8, yValue: r(80) },
    { name: 'C', xValue: 9, yValue: r(90) },
    { name: 'C', xValue: 10, yValue: r(100) },
  ];
  const [ref, width] = useAppendD3Chart((el) => {
    return DotsChart(data, { width, yLabel, xLabel, xFormat, yFormat }, el);
  }, dataa);

  return <div id="dots-chart" ref={ref} />;
}

Dots.defaultProps = {
  xFormat: null,
  yFormat: null,
};

Dots.propTypes = {
  yLabel: PropTypes.string.isRequired,
  xLabel: PropTypes.string.isRequired,
  xFormat: PropTypes.string,
  yFormat: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

/* eslint-disable no-param-reassign */
import cx from 'classnames';
import add from 'date-fns/add';
import isSameDay from 'date-fns/isSameDay';
import * as d3 from 'd3';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import numeral from 'numeral';
import moment from 'moment';
import * as styles from './lines.module.scss';
import { chartColors } from '../colors';
import useAppendD3Chart from '~hooks/useAppendD3Chart';
import {
  formatClassName,
  formatFloatSingleDecimal,
  formatCurrencySingleDecimal,
  formatTimes,
  formatDataValue,
  formatPercentage,
  formatCurrency,
  formatIntegerNumber,
} from '~charts/utils';
import useIsMobile from '~hooks/useIsMobile';

function LineChart(data, { width, isMobile }, el, yFormat, xFormat) {
  const height = 500;
  const marginTop = 20;
  const marginBottom = 63;
  const marginLeft = 49;
  const marginRight = 30;
  const fillDates = (arr) => {
    arr.forEach((d, i) => {
      if (arr[i + 1]?.date) {
        const newDate = moment(arr[i + 1].date);
        const oldDate = moment(arr[i].date);
        if (newDate.diff(oldDate, 'days') > 7) {
          const tempItem = arr[i];
          tempItem.y = null;
          tempItem.value = null;
          tempItem.yLabel = null;
          tempItem.date = moment(arr[i].date).add(7, 'days').format('M/D/YYYY');
          arr.splice(i, 0, tempItem);
        }
      }
    });
    return arr;
  };
  data = fillDates(data);
  // const X = d3.map(data, (d) => new Date(d.date));
  const Y = d3.map(data, (d) => d.value);

  function goBack() {
    return this.parentNode;
  }

  const byName = d3.group(data, (d) => d.name);

  const names = [...byName.keys()].filter(Boolean);

  const bySlug = names.map((n) =>
    n
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/\)/g, '')
      .replace(/\(/g, '')
      .replace(/>/g, '')
      .replace(/</g, '')
      .replace(/&/g, '')
      .replace(/\//g, '')
      .replace(/%/g, ''),
  );

  const colorByName = {};
  for (let i = 0; i < names.length; i += 1) {
    colorByName[names[i]] = chartColors[i % chartColors.length];
  }

  const getFormattedDate = (d, format) => {
    if (format === 'longer') {
      return moment(d).format('MMM-DD-YY');
    }
    return moment(d).format('MMM-YY');
  };

  const getFormattedValue = (value, format) => {
    if (format && format === 'percentage') {
      value = numeral(formatPercentage(value)).format('(0,0.0%)');
    } else if (format && format === 'percentageInteger') {
      value = numeral(formatPercentage(value)).format('(0,0%)');
    } else if (format && format === 'times') {
      value = formatTimes(value);
    } else if (format && format === 'price') {
      value = formatCurrency(value);
    } else if (format && format === 'float') {
      value = formatFloatSingleDecimal(value);
    } else if (format && format === 'number') {
      value = formatIntegerNumber(value);
    } else if (format && format === 'currencySingleDecimal') {
      value = formatCurrencySingleDecimal(value);
    } else if (format && (format === 'longer' || format === 'shorter')) {
      value = getFormattedDate(value, format);
    } else {
      value = formatDataValue(value);
    }
    return value;
  };

  const xScale = d3
    .scaleTime()
    .domain(d3.extent(data, (d) => new Date(d.date)))
    .range([marginLeft, width - marginRight]);

  const yScale = d3
    .scaleLinear()
    .domain(d3.extent(Y))
    .range([height - marginBottom, marginTop])
    .nice();

  const xAxis = (g, x) => {
    return g.attr('transform', `translate(0,${height - marginBottom})`).call(
      d3
        .axisBottom(x)
        // .tickValues(Y)
        // .tickFormat(d3.timeFormat('%d'))
        .ticks(isMobile ? 4 : 8)
        .tickSizeInner(0)
        .tickSizeOuter(0)
        .tickPadding(19)
        .tickFormat((d) => {
          return getFormattedValue(d, xFormat);
        }),
    );
  };

  const yAxis = (g, y) => {
    return g.call(
      d3
        .axisLeft(y)
        .tickSizeInner(0)
        .tickSizeOuter(0)
        .tickPadding(12)
        .tickFormat((d) => {
          return getFormattedValue(d, yFormat);
        }),
    );
  };

  // Viewbox
  const svg = d3
    .create('svg')
    .attr('width', width)
    .attr('height', height)
    .attr('id', 'lines-svg')
    .attr('viewBox', [0, 0, width, height])
    .attr('style', 'max-width: 100%; height: auto; height: intrinsic;');

  svg
    .append('defs')
    .append('svg:clipPath')
    .attr('id', 'clip')
    .append('svg:rect')
    .attr('id', 'clip-rect')
    .attr('x', marginLeft) //  - 10
    .attr('y', marginTop)
    .attr('height', height - marginBottom - marginTop)
    .attr('width', width - marginRight - marginLeft);

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
      .text(text);
  };

  // Bottom Axis

  const gx = svg.append('g');
  gx.style('color', '#494643')
    .style('opacity', 0.7)
    .style('font-family', 'Montserrat')
    .style('line-height', '14.63px')
    .style('font-size', '12px')
    .attr('transform', `translate(0,${height - marginBottom})`);

  //   addLabel(gx, {
  //     text: '% YOY NTM REVENUE GROWTH',
  //     x: width / 2 - 98,
  //     y: marginBottom,
  //   });

  // Left Axis
  const gy = svg.append('g');
  gy.style('color', '#494643')
    .style('opacity', 0.7)
    .style('font-family', 'Montserrat')
    .style('line-height', '14.63px')
    .style('font-size', '12px')
    .attr('transform', `translate(${marginLeft},0)`);

  addLabel(gy, {
    text: 'EV / NTM REVENUE',
    x: -height / 2 - 30,
    y: -40,
    rotate: 90,
  });

  const groupWithClipPaht = svg.append('g').attr('clip-path', 'url(#clip)');

  const body = groupWithClipPaht.append('g').attr('id', 'graph-body');

  // Add lines
  const line = d3
    .line()
    .defined((d) => {
      return d.value !== null;
    })
    .curve(d3.curveLinear)
    .x((d) => {
      return xScale(new Date(d.date));
    })
    .y((d) => yScale(d.value));

  // Create lines
  body
    .selectAll('.temp-path')
    .data(byName)
    .enter()
    .append('path')
    .attr('d', (d) => {
      return line(fillDates(d[1]));
    })
    .style('fill', 'none')
    .attr('class', 'lines')
    .style('stroke-width', '1px')
    .style('stroke', (d) => {
      return colorByName[d[0]];
    });

  // Add circles
  const circles = groupWithClipPaht
    .selectAll('.circles')
    .data([...byName.keys()])
    .enter()
    .append('g');

  circles
    .style('transition', 'opacity .3s ease')
    .attr('class', (d) => {
      return `company-circle company-circle-${formatClassName(d)}`;
    })
    .style('opacity', '0')
    .append('circle')
    .attr('r', 8)
    .attr('class', 'big-circle')
    .attr('cx', 0)
    .attr('cy', 0)
    .style('stroke', (d) => colorByName[d])
    .style('fill', '#fff')
    .select(goBack)
    .append('circle')
    .attr('class', 'small-circle')
    .attr('r', 4)
    .attr('cx', 0)
    .attr('cy', 0)
    .style('fill', (d) => colorByName[d]);

  // Add rects

  // Tooltip
  const tooltipWrapper = d3
    .select(el)
    .append('div')
    .style('position', 'absolute')
    .style('pointer-events', 'none')
    .attr('class', 'lines-tooltip-wrapper tooltip-hide-group');

  const tooltip = tooltipWrapper
    .append('div')
    .attr('class', cx('lines-tooltip', styles.tooltip));

  tooltip
    .style('opacity', 0)
    .append('h2')
    .text('Data points')
    .style('font-weight', '600')
    .style('color', '#231F20')
    .style('line-height', '14.63px')
    .style('margin-bottom', '10px')
    .style('font-size', '12px')
    .select(goBack)
    .selectAll('div')
    .data([...byName.keys()])
    .enter()
    .append('div')
    .attr('class', (_d, i) =>
      cx(
        styles.tooltipRow,
        `company-row company-${formatClassName(bySlug[i])}-row`,
      ),
    )
    .append('p')
    .text((d) => d)
    .attr('class', (_d, i) =>
      cx(styles.tooltipText, `company-${formatClassName(bySlug[i])}`),
    )
    .select(goBack)
    .append('div')
    .attr('class', styles.tooltipValue)
    .append('p')
    .attr('class', (_d, i) =>
      cx(
        styles.tooltipValueNumber,
        `company-${formatClassName(bySlug[i])}-value`,
      ),
    )
    .text('')
    .select(goBack)
    .append('p')
    .style('width', '9px')
    .style('height', '9px')
    .style('background', (d) => colorByName[d])
    .style('border-radius', '50%')
    .style('margin-left', '8px');

  d3.select(el)
    .style('margin-bottom', '24px')
    .append('div')
    .attr('id', 'lines-chart-legend')
    .attr('class', styles.component)
    .style('width', () => {
      // const totalItems = [...byName.keys()].length;
      // const itemWidth = 100;
      // return `${itemWidth * totalItems}px`;
      return '100%';
    })
    .append('p')
    .text('Legend')
    .style('margin-bottom', '12px')
    .style('text-align', 'center')
    .select(goBack)
    .append('div')
    .attr('class', styles.legend)
    .selectAll('div')
    .data([...byName.keys()])
    .enter()
    .append('div')
    .attr('style', (d) => `--color: ${colorByName[d]}`)
    .attr('class', styles.legendItem)
    // .style('width', () => {
    // const totalItems = [...byName.keys()].length;
    // if (totalItems >= 5) {
    //   return '20%';
    // }
    // if (totalItems >= 4) {
    //   return '25%';
    // }
    // if (totalItems >= 3) {
    //   return '33%';
    // }
    // if (totalItems >= 2) {
    //   return '50%';
    // }
    // return '100%';
    // })
    .append('p')
    .text((d) => d);

  const legend = d3.select('#lines-chart-legend').node();
  d3.selectAll('#lines-chart-legend').remove();
  d3.select(el).node().insertAdjacentElement('afterend', legend);

  const tooltipLineGroup = groupWithClipPaht
    .append('g')
    .attr('class', 'tooltip-hide-group');

  tooltipLineGroup
    .append('line')
    .attr('x1', 0)
    .attr('x2', 0)
    .attr('y1', 20)
    .attr('y2', height)
    .attr('stroke', '#aaaaaa');

  tooltipLineGroup
    .append('polygon')
    .attr('transform', 'translate(0, 20)')
    .attr('points', '-5, 0, 5, 0 0, 5')
    .attr('fill', '#aaaaaa');

  tooltipLineGroup
    .append('polygon')
    .attr(
      'points',
      `-5, ${height - marginBottom}, 5, ${height - marginBottom} 0, ${
        height - marginBottom - 5
      }`,
    )
    .attr('fill', '#aaaaaa');

  function onMouseLeave() {
    tooltip.style('opacity', 0);
    d3.selectAll('.company-circle').style('opacity', '0');
  }

  svg.on('mouseleave', onMouseLeave);

  function onMouseMove(event) {
    const [positionToSvg] = d3.pointer(event);
    const mousePosition = d3.pointer(event);
    const transform = d3.zoomTransform(svg.node());
    const [mx] = transform.invert(mousePosition);
    const hoveredDate = new Date(xScale.invert(mx));

    const xAxisValue = xScale.invert(positionToSvg);
    const converValueToPx = xScale(xAxisValue);

    d3.selectAll('.company-circle').style('opacity', '0');
    d3.selectAll('.company-row').style('display', 'none');
    tooltip.style('opacity', 0);
    // Update tooltip's values
    [...byName.keys()].forEach((e) => {
      const dataGroup = byName.get(e);

      const dataPoint = dataGroup.find((s) => {
        return isSameDay(new Date(s.date), hoveredDate);
      });

      const dataPointIndex = dataGroup.findIndex((s) => {
        return isSameDay(new Date(s.date), hoveredDate);
      });

      const nextDataPoint = dataGroup[dataPointIndex + 1];

      if (dataPoint) {
        // It moves the middle of the circle to at noon.
        const xScaleValue = xScale(
          add(new Date(dataPoint.date), { hours: 12 }),
        );

        // It moves the yscale a little bit considering the next value.
        const diff = nextDataPoint ? dataPoint.value - nextDataPoint?.value : 0;
        const yScaleValue = yScale(dataPoint.value - diff / 2);

        d3.select(`.company-circle-${formatClassName(dataPoint.name)}`)
          .style('opacity', '1')
          .attr('data-x', xScaleValue)
          .attr('data-y', yScaleValue)
          .attr(
            'transform',
            `translate(${transform.x + transform.k * xScaleValue}, ${
              transform.y + transform.k * yScaleValue
            })`,
          );

        d3.select(`.company-${formatClassName(dataPoint.name)}-row`).style(
          'display',
          'flex',
        );
        d3.select(`.company-${formatClassName(dataPoint.name)}-value`).text(
          formatDataValue(dataPoint.value),
        );
        tooltip.style('opacity', 1);
      }
    });

    const tooltipWrapperBbox = tooltipWrapper.node().getBoundingClientRect();

    const ttwWidth = tooltipWrapperBbox.width;
    const padding = 30;

    let tooltipPosition = converValueToPx + padding;
    if (converValueToPx + padding + ttwWidth > width) {
      tooltipPosition = converValueToPx - padding - ttwWidth;
    }
    // tooltip.style('opacity', 1);

    tooltipLineGroup
      .attr('transform', `translate(${converValueToPx}, 0)`)
      .style('stroke-width', '1px');
    tooltipWrapper.style('transform', `translate(${tooltipPosition}px, 50px)`);
  }

  svg.on('mousemove', onMouseMove, false);

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
                .attr('x2', width - marginLeft - marginRight),
            (update) => update,
            (exit) => exit.remove(),
          )
          .attr('y1', (d) => 0.5 + y(d))
          .attr('y2', (d) => 0.5 + y(d)),
      );
  };

  function updateCirclesPositions(transform) {
    [...byName.keys()].forEach((e) => {
      const companyCircle = d3.select(`.company-circle-${formatClassName(e)}`);

      const xValue = companyCircle?.node()?.attributes['data-x']?.value;
      const yValue = companyCircle?.node()?.attributes['data-y']?.value;

      if (xValue && yValue) {
        companyCircle.attr(
          'transform',
          `translate(${transform.x + transform.k * parseFloat(xValue, 10)}, ${
            transform.y + transform.k * parseFloat(yValue, 10)
          })`,
        );
      }
    });
  }

  // Zooming
  function zoomed({ transform }) {
    const zx = transform.rescaleX(xScale).interpolate(d3.interpolateRound);
    const zy = transform.rescaleY(yScale).interpolate(d3.interpolateRound);
    body.attr('transform', transform).attr('stroke-width', 5 / transform.k);
    updateCirclesPositions(transform);
    d3.selectAll('.lines').style('stroke-width', 1 / transform.k);
    // d3.selectAll('.big-circle').attr('r', 8 / transform.k);
    // d3.selectAll('.small-circle').attr('r', 4 / transform.k);
    gx.call(xAxis, zx).call((g) => g.select('.domain').remove());
    gy.call(yAxis, zy).call((g) => g.select('.domain').remove());
    gGrid.call(grid, zx, zy);
  }

  const zoom = d3
    .zoom()
    .translateExtent([
      [0, 0],
      [width, height],
    ])
    .scaleExtent([1, 3])
    .on('zoom', zoomed);

  svg
    .call(zoom)
    .call(zoom.transform, d3.zoomIdentity.translate(0, -100).scale(1.2));

  return svg.node();
}

export default function Lines({ data, yFormat, xFormat }) {
  const isDebuging = false;
  const isMobile = useIsMobile(992);
  const r = (n) => n ?? Math.floor(Math.random() * 100);
  const fakeData = [
    { name: 'B', date: new Date('2015-06-28T00:00:00'), value: r(1) },
    { name: 'B', date: new Date('2015-06-29T00:00:00'), value: r(10) },
    { name: 'B', date: new Date('2015-06-30T00:00:00'), value: r(20) },
    { name: 'B', date: new Date('2015-07-01T00:00:00'), value: r() },
    { name: 'A', date: new Date('2015-06-28T00:00:00'), value: r() },
    { name: 'A', date: new Date('2015-06-29T00:00:00'), value: r() },
    { name: 'A', date: new Date('2015-06-30T00:00:00'), value: r() },
    // { name: 'A', date: new Date('2015-07-01T00:00:00'), value: r() },
  ];

  useEffect(() => {
    return () => {
      document.querySelector('#lines-chart-legend')?.remove();
    };
  }, []);
  const [ref, width] = useAppendD3Chart((el) => {
    return LineChart(
      isDebuging ? fakeData : data,
      { width, isMobile },
      el,
      yFormat,
      xFormat,
    );
  }, data);

  return <div id="chart" ref={ref} />;
}
Lines.defaultProps = {
  yFormat: 'number',
  xFormat: 'number',
};
Lines.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  yFormat: PropTypes.string,
  xFormat: PropTypes.string,
};

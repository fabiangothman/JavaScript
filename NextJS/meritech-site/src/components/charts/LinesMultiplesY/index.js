import isSameDay from 'date-fns/isSameDay';
import cx from 'classnames';
import * as d3 from 'd3';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import * as styles from './LinesMultiplesY.module.scss';
import { chartColors } from '../colors';
import useAppendD3Chart from '~hooks/useAppendD3Chart';
import { formatDataValue, formatClassName } from '~charts/utils';
import useIsMobile from '~hooks/useIsMobile';

function LinesMultiplesYChart(data, { width, isMobile }, el, xFormat) {
  const height = 500;
  const marginTop = 20;
  const marginBottom = 63;
  const marginLeft = 49;
  const marginRight = 30;

  // const X = d3.map(data, (d) => new Date(d.date));
  const byValue = d3.map(data, (d) => d.value).filter(Boolean);
  const byCurrency = d3.map(data, (d) => d.currencyValue).filter(Boolean);
  const byPercentage = d3.map(data, (d) => d.percentageValue).filter(Boolean);

  const hasAxysByPercentage = !!byPercentage.length;
  const hasAxysByCurrency = !!byCurrency.length;
  const hasThreeAxis = hasAxysByCurrency && hasAxysByPercentage;
  const hasTwoAxis = hasAxysByCurrency || hasAxysByPercentage;

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

  let xAxisMargin = 0;
  if (hasTwoAxis) xAxisMargin = 40;
  if (hasThreeAxis) xAxisMargin = 70;

  const getFormattedValue = (d, format) => {
    if (format === 'longer') {
      return moment(d).format('MMM-DD-YY');
    }
    return moment(d).format('MMM-YY');
  };

  const xScale = d3
    .scaleUtc()
    .domain(d3.extent(data, (d) => new Date(d.date)))
    .range([marginLeft, width - marginRight - xAxisMargin]);

  const yScale = d3
    .scaleLinear()
    .domain([d3.min(byValue) < 0 ? d3.min(byValue) : 0, d3.max(byValue)])
    .range([height - marginBottom, marginTop])
    .nice();

  const currencyYScale = d3
    .scaleLinear()
    .domain([
      d3.min(byCurrency) < 0 ? d3.min(byCurrency) : 0,
      d3.max(byCurrency),
    ])
    .range([height - marginBottom, marginTop])
    .nice();

  const percentageYScale = d3
    .scaleLinear()
    .domain([
      d3.min(byPercentage) < 0 ? d3.min(byPercentage) : 0,
      d3.max(byPercentage),
    ])
    .range([height - marginBottom, marginTop])
    .nice();

  const xAxis = (g, x) => {
    return g.attr('transform', `translate(0,${height - marginBottom})`).call(
      d3
        .axisBottom(x)
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
    g.call(
      d3
        .axisRight(y)
        .tickSizeInner(0)
        .tickFormat((x) => `${x}x`)
        .tickSizeOuter(0)
        .tickPadding(12),
    );
  };

  const currencyYAxis = (g, y) => {
    g.call(
      d3
        .axisLeft(y)
        .tickSizeInner(0)
        .tickSizeOuter(0)
        .tickFormat((x) => `$${x}`)
        .tickPadding(12),
    );
  };

  const percentageYAxis = (g, y) => {
    g.call(
      d3
        .axisRight(y)
        .tickSizeInner(0)
        .tickSizeOuter(0)
        .tickFormat((x) => `${x}%`)
        .tickPadding(0),
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
    .attr('width', width - marginRight - marginLeft - xAxisMargin); // Update here

  // Bottom Axis

  const gx = svg.append('g');
  gx.style('color', '#494643')
    .style('opacity', 0.7)
    .style('font-family', 'Montserrat')
    .style('line-height', '14.63px')
    .style('font-size', '12px')
    .attr('transform', `translate(0,${height - marginBottom})`);

  // Left Axis

  const extraMargin = hasThreeAxis ? 50 : 0;

  function createYGroup({ color, translate }) {
    return svg
      .append('g')
      .style('color', color)
      .style('opacity', 0.7)
      .style('font-family', 'Montserrat')
      .style('line-height', '14.63px')
      .style('font-size', '12px')
      .attr('transform', `translate(${translate},0)`);
  }

  const gy = createYGroup({
    color: chartColors[1],
    translate: width - marginLeft - extraMargin,
  });

  const currencyYGroup = createYGroup({
    color: chartColors[2],
    translate: marginLeft,
  });

  const percentageYGroup = createYGroup({
    color: chartColors[0],
    translate: width - marginLeft,
  });

  // gy.call(yAxis, gy).call((g) => g.select('.domain').remove());

  // currencyYGroup.call(currencyYAxis, currencyYGroup);
  // .call((g) => g.select('.domain').remove())
  // .call((g) =>
  //   g
  //     .selectAll('.tick line')
  //     .clone()
  //     .attr('x2', width - marginLeft - marginRight - xAxisMargin)
  //     .attr('stroke-opacity', 1)
  //     .attr('stroke', '#DCDCD4'),
  // );
  // Percentage Y axis
  // percentageYGroup
  //   .call(percentageYAxis, percentageYGroup)
  //   .call((g) => g.select('.domain').remove());

  // gx.call(xAxis, gx);

  const groupWithClipPaht = svg.append('g').attr('clip-path', 'url(#clip)');

  const body = groupWithClipPaht.append('g').attr('id', 'graph-body');

  function createLine(customYScale) {
    return d3
      .line()
      .curve(d3.curveLinear)
      .x((d) => xScale(new Date(d.date)))
      .y(customYScale);
  }

  // Add lines
  const line = createLine((d) => yScale(d.value));
  const lineByCurrency = createLine((d) => currencyYScale(d.currencyValue));
  const lineByPercentage = createLine((d) =>
    percentageYScale(d.percentageValue),
  );

  // Create lines
  body
    .selectAll('.temp-path')
    .data(byName)
    .enter()
    .append('path')
    .attr('d', (d) => {
      if (d[1].some(({ currencyValue }) => currencyValue != null)) {
        return lineByCurrency(d[1]);
      }

      if (d[1].some(({ percentageValue }) => percentageValue != null)) {
        return lineByPercentage(d[1]);
      }
      return line(d[1]);
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
    .style('padding', '12px')
    .style('pointer-events', 'none')
    .style('border', '1px solid #12846B')
    .append('h2')
    .text('Data points')
    .style('font-weight', '600')
    .style('color', '#231F20')
    .style('line-height', '14.63px')
    .style('margin-bottom', '6px')
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
    .style('font-weight', '600')
    .style('color', '#231F20')
    .style('font-size', '12px')
    .select(goBack)
    .append('p')
    .style('width', '9px')
    .style('height', '9px')
    .style('background', (d) => colorByName[d])
    .style('border-radius', '50%')
    .style('margin-left', '8px');

  d3.select(el)
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
      const dataPoint = dataGroup.find((s) =>
        isSameDay(new Date(s.date), hoveredDate),
      );

      let yValue;
      if (dataPoint?.percentageValue) {
        yValue = percentageYScale(dataPoint.percentageValue);
      }
      if (dataPoint?.currencyValue) {
        yValue = currencyYScale(dataPoint.currencyValue);
      }
      if (dataPoint?.value) {
        yValue = yScale(dataPoint.value);
      }

      if (dataPoint) {
        d3.select(`.company-circle-${formatClassName(dataPoint.name)}`)
          .style('opacity', '1')
          .attr('data-x', xScale(new Date(dataPoint.date)))
          .attr('data-y', yValue)
          .attr('transform', () => {
            return `translate(${
              transform.x + transform.k * xScale(new Date(dataPoint.date))
            }, ${transform.y + transform.k * yValue})`;
          });

        d3.select(`.company-${formatClassName(dataPoint.name)}-row`).style(
          'display',
          'flex',
        );
        d3.select(`.company-${formatClassName(dataPoint.name)}-value`).text(
          formatDataValue(dataPoint?.original),
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
                .attr('x2', width - marginLeft - marginRight - xAxisMargin),
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
    const currencyYScaley = transform
      .rescaleY(currencyYScale)
      .interpolate(d3.interpolateRound);
    const percentageYScaley = transform
      .rescaleY(percentageYScale)
      .interpolate(d3.interpolateRound);

    body.attr('transform', transform).attr('stroke-width', 5 / transform.k);
    updateCirclesPositions(transform);
    d3.selectAll('.lines').style('stroke-width', 1 / transform.k);
    gx.call(xAxis, zx).call((g) => g.select('.domain').remove());
    gy.call(yAxis, zy).call((g) => g.select('.domain').remove());

    currencyYGroup
      .call(currencyYAxis, currencyYScaley)
      .call((g) => g.select('.domain').remove());
    percentageYGroup
      .call(percentageYAxis, percentageYScaley)
      .call((g) => g.select('.domain').remove());

    gGrid.call(grid, zx, currencyYScaley);
  }

  const worldTopLeft = [0, 0];
  const worldBottomRight = [width, height];

  const zoom = d3
    .zoom()
    .translateExtent([worldTopLeft, worldBottomRight])
    .scaleExtent([1, 3])
    .on('zoom', zoomed);

  svg
    .call(zoom)
    .call(zoom.transform, d3.zoomIdentity.translate(0, 0).scale(1.2));

  return svg.node();
}

export default function LinesMultiplesY({ data, xFormat }) {
  const isDebuging = false;
  const isMobile = useIsMobile(992);
  const r = (n) => {
    return n ?? Math.floor(Math.random() * 100);
  };
  const fakeData = [
    {
      name: 'A',
      currencyValue: r(1),
      original: r(1).toString(),
      date: new Date('2015-06-28T00:00:00'),
    },
    {
      name: 'A',
      currencyValue: r(5),
      original: r(5).toString(),
      date: new Date('2015-06-29T00:00:00'),
    },
    {
      name: 'A',
      currencyValue: r(10),
      original: r(10).toString(),
      date: new Date('2015-06-30T00:00:00'),
    },
    {
      name: 'A',
      currencyValue: r(100),
      original: r(100).toString(),
      date: new Date('2015-07-01T00:00:00'),
    },

    {
      name: 'VV',
      percentageValue: r(20),
      original: r(20).toString(),
      date: new Date('2015-06-28T00:00:00'),
    },
    {
      name: 'VV',
      percentageValue: r(10),
      original: r(10).toString(),
      date: new Date('2015-06-29T00:00:00'),
    },
    {
      name: 'VV',
      percentageValue: r(20),
      original: r(20).toString(),
      date: new Date('2015-06-30T00:00:00'),
    },
    {
      name: 'VV',
      percentageValue: r(10),
      original: r(10).toString(),
      date: new Date('2015-07-01T00:00:00'),
    },
  ];

  useEffect(() => {
    return () => {
      document.querySelector('#lines-chart-legend')?.remove();
    };
  }, []);

  const [ref, width] = useAppendD3Chart((el) => {
    return LinesMultiplesYChart(
      isDebuging ? fakeData : data,
      { width, isMobile },
      el,
      xFormat,
    );
  }, data);

  return <div id="chart" ref={ref} />;
}

LinesMultiplesY.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  xFormat: PropTypes.string.isRequired,
};

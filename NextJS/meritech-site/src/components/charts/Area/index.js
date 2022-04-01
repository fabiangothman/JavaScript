// import cx from 'classnames';
import * as d3 from 'd3';
// import * as styles from './lines.module.scss';
import cx from 'classnames';
import PropTypes from 'prop-types';
import format from 'date-fns/format';
import isSameDay from 'date-fns/isSameDay';
// import { chartColors } from '../colors';
import moment from 'moment';
import useAppendD3Chart from '~hooks/useAppendD3Chart';
import { formatClassName, formatCurrency } from '~charts/utils';
import useIsMobile from '~hooks/useIsMobile';
import * as styles from './Area.module.scss';
import { chartColors } from '~charts/colors';

// const areaChartColors = [
//   '#12846BCC',
//   '#992AF3',
//   '#BB4430',
//   '#2364AA',
//   '#992AF3',
//   '#CAA40B',
// ];

function AreaChart(
  data,
  byName,
  names,
  {
    width,
    marginTop = 20,
    marginBottom = 63,
    marginLeft = 49,
    marginRight = 0,
  },
  el,
  xFormat,
  cumulativeLabels,
) {
  const height = 500;

  const X = d3.map(data, (d) => d.date);
  const Y = d3.map(data, (d) => d.value);
  const colorByName = {};
  for (let i = 0; i < names.length; i += 1) {
    colorByName[names[i]] = chartColors[i % chartColors.length];
  }

  const getFormattedValue = (d, valueFormat) => {
    if (valueFormat === 'longer') {
      return moment(d).format('MMM-DD-YY');
    }
    return moment(d).format('MMM-YY');
  };

  const xScale = d3.scaleUtc(d3.extent(X), [marginLeft, width - marginRight]);

  const yScale = d3
    .scaleLinear([0, d3.max(Y)], [height - marginBottom, marginTop])
    .nice();

  const xAxis = (g, x) => {
    return g.attr('transform', `translate(0,${height - marginBottom})`).call(
      d3
        .axisBottom(x)
        .ticks(10)
        .tickSizeInner(0)
        .tickSizeOuter(0)
        .tickPadding(19)
        .tickFormat((d) => {
          return getFormattedValue(d, xFormat);
        }),
    );
  };

  const yAxis = (g, y) => {
    g.attr('transform', `translate(${marginLeft},0)`).call(
      d3
        .axisLeft(y)
        .tickFormat(formatCurrency)
        .tickSizeInner(0)
        .tickSizeOuter(0)
        .tickPadding(12),
    );
  };

  const svg = d3
    .create('svg')
    .attr('width', width)
    .attr('height', height)
    .attr('viewBox', [0, 0, width, height])
    .attr('style', 'max-width: 100%; height: auto; height: intrinsic;');

  const gy = svg.append('g');
  const gx = svg.append('g');

  function applyAxisStyle(g) {
    g.style('color', '#494643')
      .style('opacity', 0.7)
      .style('font-family', 'Montserrat')
      .style('line-height', '14.63px')
      .style('font-size', '12px');
  }

  applyAxisStyle(gx);
  applyAxisStyle(gy);

  names.forEach((name, index) => {
    const secondGradient = svg
      .append('defs')
      .append('linearGradient')
      .attr('gradientUnits', 'userSpaceOnUse')
      .attr('id', `company-${index}-gradient`)
      .attr('x1', '0')
      .attr('x2', '0')
      .attr('y1', 0)
      .attr('y2', height);

    secondGradient
      .append('stop')
      .attr('class', 'start')
      .attr('offset', '0%')
      .attr('stop-color', chartColors[index])
      .attr('stop-opacity', 1);

    secondGradient
      .append('stop')
      .attr('class', 'start')
      .attr('offset', '40%')
      .attr('stop-color', chartColors[index])
      .attr('stop-opacity', 1);

    secondGradient
      .append('stop')
      .attr('class', 'end')
      .attr('offset', '100%')
      .attr('stop-color', '#fff')
      .attr('stop-opacity', 1);
  });

  const stackY = {};

  const area = (cumulate) =>
    d3
      .area()
      .x((d) => xScale(d.date))
      .y0((d) => {
        if (!cumulate) {
          return yScale(0);
        }
        let add = 0;
        if (stackY[d.date]) {
          add = stackY[d.date];
        }
        return yScale(0 + add);
      })
      .y1((d) => {
        if (!cumulate) {
          return yScale(d.value);
        }
        let add = 0;
        if (stackY[d.date]) {
          add = stackY[d.date];
        }
        const val = yScale(d.value + add);
        stackY[d.date] = d.value + add;

        return val;
      });

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

  const groupWithClipPaht = svg.append('g').attr('clip-path', 'url(#clip)');

  const body = groupWithClipPaht.append('g').attr('id', 'graph-body');

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

  body
    .selectAll('path')
    .data(names)
    .join('path')
    .attr('fill', (d, i) => {
      return `url(#company-${i}-gradient)`;
    })
    .attr('stroke', (_d, index) => chartColors[index])
    .attr('stroke-width', 1.5)
    .attr('d', (d) => {
      const values = byName.get(d);

      return area(cumulativeLabels.indexOf(d) >= 0)(values);
    });

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
                .attr('x2', width - marginLeft - marginRight),
            (update) => update,
            (exit) => exit.remove(),
          )
          .attr('y1', (d) => 0.5 + y(d))
          .attr('y2', (d) => 0.5 + y(d)),
      );
  };

  const tooltip = d3.select('#tooltip');

  svg.on('mouseleave', () => {
    tooltip.style('opacity', 0);
    tooltipLineGroup.style('opacity', 0);
  });

  function onMouseMove(event) {
    tooltip.style('opacity', 1);
    const [positionToSvg] = d3.pointer(event);
    const mousePosition = d3.pointer(event);
    const transform = d3.zoomTransform(svg.node());
    const [mx] = transform.invert(mousePosition);
    const hoveredDate = new Date(xScale.invert(mx));

    const xAxisValue = xScale.invert(positionToSvg);
    const converValueToPx = xScale(xAxisValue);

    const tooltipWidth = tooltip.node().getBoundingClientRect().width;
    const padding = 30;

    let tooltipPosition = converValueToPx + padding;
    if (converValueToPx + padding + tooltipWidth > width) {
      tooltipPosition = converValueToPx - padding - tooltipWidth;
    }

    tooltipLineGroup
      .style('opacity', 1)
      .attr('transform', `translate(${converValueToPx}, 0)`)
      .style('stroke-width', '1px');
    tooltip.style('transform', `translate(${tooltipPosition}px, 40px)`);

    names.forEach((name) => {
      const dataGroup = byName.get(name);

      const dataPoint = dataGroup.find((s) => {
        return isSameDay(new Date(s.date), hoveredDate);
      });

      if (dataPoint?.yLabel) {
        const formattedDay = format(new Date(hoveredDate), 'MMM dd, yyyy');
        d3.select('.tooltip-date').text(formattedDay);
        d3.select(`.${formatClassName(name)}-value`).text(
          formatCurrency(dataPoint?.yLabel),
        );
      }
    });
  }

  svg.on('mousemove', onMouseMove, false);

  // Zooming
  function zoomed({ transform }) {
    const zx = transform.rescaleX(xScale).interpolate(d3.interpolateRound);
    const zy = transform.rescaleY(yScale).interpolate(d3.interpolateRound);
    body.attr('transform', transform).attr('stroke-width', 5 / transform.k);
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

  svg.call(zoom).call(zoom.transform, d3.zoomIdentity.translate(0, 0).scale(1));

  return svg.node();
}

export default function Lines({ data, xFormat, cumulativeLabels, ...props }) {
  const isDebugging = false;
  const isMobile = useIsMobile(992);
  const r = (n) => n ?? Math.floor(Math.random() * 100);
  const fakeData = [
    {
      name: 'Cumulative NTM Revenue',
      date: new Date('2004-11-01T02:00:00.000Z'),
      value: r(219.8),
    },
    {
      name: 'Cumulative NTM Revenue',
      date: new Date('2004-11-02T02:00:00.000Z'),
      value: r(219.8),
    },
    {
      name: 'Cumulative NTM Revenue',
      date: new Date('2004-11-03T02:00:00.000Z'),
      value: r(219.8),
    },
  ];

  const byName = d3.group(data, (d) => d.name);
  const filteredNames = [...byName.keys()].filter(Boolean);
  const names = filteredNames.sort((a, b) => {
    return cumulativeLabels.indexOf(a) - cumulativeLabels.indexOf(b);
  });

  const [ref, width] = useAppendD3Chart((el) => {
    return AreaChart(
      !isDebugging ? data : fakeData,
      byName,
      names,
      { width, isMobile, ...props },
      el,
      xFormat,
      cumulativeLabels,
    );
  }, fakeData);

  return (
    <div className={styles.component}>
      <div id="tooltip" className={styles.tooltip}>
        <p className={cx(styles.title, 'tooltip-date')}>April 16, 2019</p>
        <div>
          {names.map((entry, index) => {
            return (
              <div
                key={index}
                className={cx(styles.item, formatClassName(entry))}
              >
                <p className={cx(styles.itemName, formatClassName(entry))}>
                  {entry}
                </p>
                <div className={styles.itemRightSide}>
                  <p
                    className={cx(
                      styles.itemValue,
                      `${formatClassName(entry)}-value`,
                    )}
                  />
                  <div
                    style={{
                      background: chartColors[index],
                    }}
                    className={cx(
                      styles.itemColor,
                      `${formatClassName(entry)}-color`,
                    )}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div id="chart" ref={ref} />
      {(names?.length > 1 ||
        (names?.length === 1 &&
          names[0] !== 'Cumulative Market Cap' &&
          names[0] !== 'Cumulative NTM Revenue')) && (
        <div className={cx(styles.legend)}>
          <div className={cx(styles.legendWrapper)}>
            <p className={cx(styles.legendTitle)}>Legend</p>
            <div className={cx(styles.legendItems)}>
              {names.map((entry, index) => {
                return (
                  <div key={index} className={cx(styles.legendItem)}>
                    <div
                      style={{
                        background: chartColors[index],
                      }}
                      className={cx(styles.legendColor)}
                    />
                    <p className={cx(styles.legendName)}>{entry}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
Lines.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  xFormat: PropTypes.string.isRequired,
  cumulativeLabels: PropTypes.arrayOf(PropTypes.string).isRequired,
};

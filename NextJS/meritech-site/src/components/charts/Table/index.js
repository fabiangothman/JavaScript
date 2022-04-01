/* eslint-disable no-param-reassign, react/forbid-prop-types, no-nested-ternary, no-empty */
import React, { useMemo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSortBy, useTable } from 'react-table';
import { useSticky } from 'react-table-sticky';
import cx from 'classnames';
import numeral from 'numeral';
import * as d3 from 'd3';
import SortAscIcon from 'components/icons/SortAscIcon';
import SortDescIcon from 'components/icons/SortDescIcon';
import SortInactiveIcon from 'components/icons/SortInactiveIcon';
import * as styles from './Table.module.scss';

function useInstance(instance) {
  const { allColumns } = instance;

  let rowSpanHeaders = [];

  allColumns.forEach((column) => {
    const { id, enableRowSpan } = column;

    if (enableRowSpan !== undefined) {
      rowSpanHeaders = [
        ...rowSpanHeaders,
        { id, topCellValue: null, topCellIndex: 0 },
      ];
    }
  });

  Object.assign(instance, { rowSpanHeaders });
}
export default function Table({ ...props }) {
  const [numeralUpdated, setNumeralUpdated] = useState(false);
  const configureNumeral = () => {
    try {
      numeral.register('format', 'times', {
        regexps: {
          format: /(x)/,
          unformat: /(x)/,
        },
        format: (value, format, roundingFunction) => {
          const space = numeral._.includes(format, ' x') ? ' ' : '';
          let output;

          // check for space before x
          format = format.replace(/\s?\x/, '');

          output = numeral._.numberToFormat(value, format, roundingFunction);

          if (numeral._.includes(output, ')')) {
            output = output.split('');

            output.splice(-1, 0, `${space}x`);

            output = output.join('');
          } else {
            output += `${space}x`;
          }

          return output;
        },
        unformat: (string) => {
          return numeral._.stringToNumber(string);
        },
      });
      setNumeralUpdated(true);
    } catch (error) {}
  };
  useEffect(() => {
    configureNumeral();
    return () => {
      numeral.reset();
    };
  }, [numeralUpdated]);

  const nullValues = ['--%', '$--', 'NA'];
  const data = useMemo(() => props.data, [props.data]);
  const getFormat = (format) => {
    switch (format) {
      case 'price':
        return '($0,0)';
      case 'percent':
        return '(0,0%)';
      case 'times':
        return '0.0x';
      default:
        return '(0,0.0)';
    }
  };
  const columns = useMemo(
    () => [
      {
        Header: 'Name',
        rowSpan: 2,
        sticky: 'left',
        columns: [
          {
            Header: '',
            accessor: 'Company',
            columnKey: 'Company',
            displayNone: true,
            sortType: 'string',
          },
        ],
      },
      {
        Header: 'Price',
        rowSpan: 2,
        columns: [
          {
            Header: '',
            dataType: 'price',
            accessor: 'Stock Price',
            columnKey: 'Stock Price',
            displayNone: true,
            sortType: 'number',
          },
        ],
      },
      {
        Header: '% Price Px.',
        columns: [
          {
            dataType: 'percent',
            Header: '3-Mo',
            accessor: '3-Month Stock Price Performance',
            columnKey: '3-Month Stock Price Performance',
            highlightNegative: true,
            highlightPositive: true,
            sortType: 'number',
          },
          {
            dataType: 'percent',
            Header: '12-Mo',
            accessor: '12-Month Stock Price Performance',
            columnKey: '12-Month Stock Price Performance',
            highlightNegative: true,
            highlightPositive: true,
            sortType: 'number',
          },
        ],
      },
      {
        Header: 'Equity Value',
        rowSpan: 2,
        columns: [
          {
            dataType: 'price',
            Header: '',
            accessor: 'Equity Value',
            columnKey: 'Equity Value',
            displayNone: true,
            sortType: 'number',
          },
        ],
      },
      {
        Header: 'Enterprise Value',
        rowSpan: 2,
        columns: [
          {
            dataType: 'price',
            Header: '',
            accessor: 'Enterprise Value',
            columnKey: 'Enterprise Value',
            displayNone: true,
            sortType: 'number',
          },
        ],
      },
      {
        Header: 'EV / Implied ARR',
        rowSpan: 2,
        borderLeft: true,
        columns: [
          {
            dataType: 'times',
            Header: '',
            accessor: 'EV / Last Quarter Implied ARR',
            columnKey: 'EV / Last Quarter Implied ARR',
            displayNone: true,
            sortType: 'number',
          },
        ],
      },
      {
        Header: 'EV / NTM Revenue',
        rowSpan: 2,
        columns: [
          {
            dataType: 'times',
            Header: '',
            accessor: 'EV / NTM Revenue',
            columnKey: 'EV / NTM Revenue',
            displayNone: true,
            sortType: 'number',
          },
        ],
      },
      {
        Header: 'Growth Adj. EV / NTM Revenue',
        rowSpan: 2,
        borderRight: true,
        columns: [
          {
            dataType: 'times',
            Header: '',
            accessor: 'Growth Adjusted EV / NTM Revenue',
            columnKey: 'Growth Adjusted EV / NTM Revenue',
            displayNone: true,
            sortType: 'number',
          },
        ],
      },
      {
        Header: 'Implied ARR',
        rowSpan: 2,
        columns: [
          {
            Header: '',
            dataType: 'price',
            accessor: 'Last Quarter Implied ARR',
            columnKey: 'Last Quarter Implied ARR',
            displayNone: true,
            sortType: 'number',
          },
        ],
      },
      {
        Header: 'Net New ARR',
        rowSpan: 2,
        columns: [
          {
            Header: '',
            dataType: 'price',
            accessor: 'Net New Implied ARR',
            columnKey: 'Net New Implied ARR',
            displayNone: true,
            sortType: 'number',
          },
        ],
      },
      {
        Header: 'LTM Revenue',
        rowSpan: 2,
        columns: [
          {
            Header: '',
            dataType: 'price',
            accessor: 'LTM Revenue',
            columnKey: 'LTM Revenue',
            displayNone: true,
            sortType: 'number',
          },
        ],
      },
      {
        Header: '% YoY Growth',
        columns: [
          {
            Header: 'Implied ARR',
            dataType: 'percent',
            accessor: '% YoY Implied ARR Growth',
            columnKey: '% YoY Implied ARR Growth',
            sortType: 'number',
          },
          {
            Header: 'LTM Revenue',
            dataType: 'percent',
            accessor: '% YoY LTM Revenue Growth',
            columnKey: '% YoY LTM Revenue Growth',
            sortType: 'number',
          },
          {
            Header: 'NTM Revenue',
            dataType: 'percent',
            accessor: '% YoY NTM Revenue Growth',
            columnKey: '% YoY NTM Revenue Growth',
            sortType: 'number',
          },
        ],
      },
      {
        Header: '% LTM Margins',
        columns: [
          {
            Header: 'GM',
            dataType: 'percent',
            accessor: '% LTM Gross Margin',
            columnKey: '% LTM Gross Margin',
            sortType: 'number',
          },
          {
            Header: 'S&M',
            dataType: 'percent',
            accessor: 'LTM S&M % of Revenue',
            columnKey: 'LTM S&M % of Revenue',
            sortType: 'number',
          },
          {
            Header: 'R&D',
            dataType: 'percent',
            accessor: 'LTM R&D % of Revenue',
            columnKey: 'LTM R&D % of Revenue',
            sortType: 'number',
          },
          {
            Header: 'G&A',
            dataType: 'percent',
            accessor: 'LTM G&A % of Revenue',
            columnKey: 'LTM G&A % of Revenue',
            sortType: 'number',
          },
          {
            Header: 'OpEx',
            dataType: 'percent',
            accessor: 'LTM OpEx % of Revenue',
            columnKey: 'LTM OpEx % of Revenue',
            sortType: 'number',
          },
          {
            Header: 'FCF',
            dataType: 'percent',
            accessor: '% LTM FCF Margin',
            columnKey: '% LTM FCF Margin',
            sortType: 'number',
          },
        ],
      },
      {
        Header: 'Rule of 40',
        rowSpan: 2,
        columns: [
          {
            Header: '',
            dataType: 'percent',
            accessor: 'Rule of 40',
            columnKey: 'Rule of 40',
            displayNone: true,
            sortType: 'number',
          },
        ],
      },
      {
        Header: 'Magic Number',
        rowSpan: 2,
        columns: [
          {
            Header: '',
            accessor: 'Magic Number',
            columnKey: 'Magic Number',
            displayNone: true,
            sortType: 'number',
          },
        ],
      },
      {
        Header: 'Payback Period',
        rowSpan: 2,
        columns: [
          {
            Header: '',
            accessor: 'Payback Period',
            columnKey: 'Payback Period',
            displayNone: true,
            sortType: 'number',
          },
        ],
      },
      {
        Header: 'OpEx Payback Period',
        rowSpan: 2,
        columns: [
          {
            Header: '',
            accessor: 'OpEx Payback Period',
            columnKey: 'OpEx Payback Period',
            displayNone: true,
            sortType: 'number',
          },
        ],
      },
      {
        Header: 'Implied Average ACV',
        rowSpan: 2,
        columns: [
          {
            Header: '',
            dataType: 'price',
            accessor: 'Implied Average ACV',
            columnKey: 'Implied Average ACV',
            displayNone: true,
            sortType: 'number',
          },
        ],
      },
      {
        Header: 'Implied ARR / FTE',
        rowSpan: 2,
        columns: [
          {
            Header: '',
            dataType: 'price',
            accessor: 'Implied ARR / FTE',
            columnKey: 'Implied ARR / FTE',
            displayNone: true,
            sortType: 'number',
          },
        ],
      },
      {
        Header: 'Annualized OpEx / FTE',
        rowSpan: 2,
        columns: [
          {
            Header: '',
            dataType: 'price',
            accessor: 'Annualized OpEx / FTE',
            columnKey: 'Annualized OpEx / FTE',
            displayNone: true,
            sortType: 'number',
          },
        ],
      },
      {
        Header: 'Net Dollar Retention',
        rowSpan: 2,
        columns: [
          {
            Header: '',
            dataType: 'percent',
            accessor: 'Net Dollar Retention / Dollar-Based Net Expansion Rate',
            columnKey: 'Net Dollar Retention / Dollar-Based Net Expansion Rate',
            displayNone: true,
            sortType: 'number',
          },
        ],
      },
      {
        Header: 'Multiple Return Since IPO',
        rowSpan: 2,
        columns: [
          {
            Header: '',
            dataType: 'times',
            accessor: 'Multiple Return Since IPO',
            columnKey: 'Multiple Return Since IPO',
            displayNone: true,
            sortType: 'number',
          },
        ],
      },
      {
        Header: 'Share Price CAGR Since IPO',
        rowSpan: 2,
        columns: [
          {
            Header: '',
            dataType: 'percent',
            accessor: 'Share Price CAGR',
            columnKey: 'Share Price CAGR',
            displayNone: true,
            sortType: 'number',
          },
        ],
      },
    ],
    [],
  );

  const getColumn = (column) => {
    return column.parent ? column : column.columns[0];
  };
  const sortTypes = {
    number: (rowA, rowB, id) => {
      try {
        if (
          numeral(rowA.original[id]).value() <
          numeral(rowB.original[id]).value()
        )
          return -1;
        if (
          numeral(rowB.original[id]).value() >
          numeral(rowA.original[id]).value()
        )
          return 1;
      } catch (error) {
        return 0;
      }
      return 0;
    },
    string: (rowA, rowB, id) => {
      try {
        const nameA = rowA.original[id].replace(/\*/, '').toUpperCase();
        const nameB = rowB.original[id].replace(/\*/, '').toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
      } catch (error) {
        return 0;
      }

      return 0;
    },
  };

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
        sortTypes,
      },
      useSortBy,
      useSticky,
      (hooks) => {
        hooks.useInstance.push(useInstance);
      },
    );

  return (
    <div className={styles.component}>
      <table className={cx(styles.table, styles.sticky)} {...getTableProps()}>
        <thead className={styles.header}>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(
                    column.parent || column.rowSpan === 2
                      ? getColumn(column).getSortByToggleProps()
                      : {},
                  )}
                  rowSpan={`${column.rowSpan ?? 1}`}
                  className={cx({
                    [styles.borderLeft]: column.borderLeft,
                    [styles.borderRight]: column.borderRight,
                    [styles.displayNone]: column.displayNone,
                  })}
                >
                  {column.render('Header')}
                  {(column.parent || column.rowSpan === 2) && (
                    <span>
                      {getColumn(column).isSorted ? (
                        getColumn(column).isSortedDesc ? (
                          <SortDescIcon />
                        ) : (
                          <SortAscIcon />
                        )
                      ) : (
                        <SortInactiveIcon />
                      )}
                    </span>
                  )}
                </th>
              ))}
            </tr>
          ))}
          {headerGroups.map((headerGroup, rowIndex) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroups[1].headers.map((column, colIndex) =>
                rowIndex === 0 ? (
                  colIndex === 0 ? (
                    <th {...column.getHeaderProps()}>Mean</th>
                  ) : (
                    <th
                      {...column.getHeaderProps()}
                      className={cx({
                        [styles.borderLeft]:
                          headerGroups[1].headers[colIndex]?.parent?.borderLeft,
                        [styles.borderRight]:
                          headerGroups[1].headers[colIndex]?.parent
                            ?.borderRight,
                      })}
                    >
                      {numeral(
                        d3.mean(data, (d) => {
                          const key =
                            headerGroups[1].headers[colIndex].columnKey;
                          return numeral(d[key]).value();
                        }),
                      ).format(
                        getFormat(headerGroups[1].headers[colIndex].dataType),
                      )}
                    </th>
                  )
                ) : colIndex === 0 ? (
                  <th {...column.getHeaderProps()}>Median</th>
                ) : (
                  <th
                    {...column.getHeaderProps()}
                    className={cx({
                      [styles.borderLeft]:
                        headerGroups[1].headers[colIndex]?.parent?.borderLeft,
                      [styles.borderRight]:
                        headerGroups[1].headers[colIndex]?.parent?.borderRight,
                    })}
                  >
                    {numeral(
                      d3.median(data, (d) => {
                        const key = headerGroups[1].headers[colIndex].columnKey;
                        return numeral(d[key]).value();
                      }),
                    ).format(
                      getFormat(headerGroups[1].headers[colIndex].dataType),
                    )}
                  </th>
                ),
              )}
            </tr>
          ))}
        </thead>
        <tbody className={styles.body} {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      className={cx({
                        [styles.positive]:
                          cell.column.highlightPositive &&
                          (numeral(cell.value).value() > 0 ||
                            nullValues.includes(cell.value)),
                        [styles.negative]:
                          cell.column.highlightNegative &&
                          numeral(cell.value).value() < 0 &&
                          numeral(cell.value).value() !== '-' &&
                          cell.value !== '-',
                        [styles.borderLeft]: cell.column?.parent?.borderLeft,
                        [styles.borderRight]: cell.column?.parent?.borderRight,
                      })}
                    >
                      {nullValues.includes(cell.value)
                        ? '-'
                        : numeral(cell.value).format(
                            getFormat(cell.column.dataType),
                          )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

Table.propTypes = {
  data: PropTypes.any.isRequired,
};

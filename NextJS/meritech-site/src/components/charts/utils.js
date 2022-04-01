import numeral from 'numeral';

export function formatCurrencyFloat(n) {
  return numeral(n).format('$0,0.00');
}

export function formatCurrencySingleDecimal(n) {
  return numeral(n).format('$0,0.0');
}

export function formatCurrency(n) {
  return numeral(n).format('$0,0');
}

export function formatPercentage(n) {
  return `${numeral(numeral(n).value() * 100).format('0')}%`;
}

export function formatNumber(n) {
  return `${numeral(n).format('0,0.0')}x`;
}

export function formatTimes(n) {
  return `${numeral(n).format('0')}x`;
}

export function formatIntegerNumber(n) {
  return `${numeral(n).format('0')}`;
}

export function formatFloatNumber(n) {
  return `${numeral(n).format('0.00')}`;
}

export function formatFloatSingleDecimal(n) {
  return `${numeral(n).format('0.0')}`;
}

export function formatDataValue(n) {
  if (typeof n === 'number') {
    return formatNumber(n);
  }
  if (n?.includes('$')) {
    return formatCurrency(n);
  }

  if (n?.includes('%')) {
    return formatPercentage(n);
  }

  return formatNumber(n);
}

export function convertStringIntoNumber(n) {
  return numeral(n).value() ?? 0;
}

export function formatClassName(s) {
  return (s ?? '')
    .toString()
    .replace(/!|@|#|\$|%|-|\.|\*|,|&|\)|\(|<|>|\/|\s/g, '')
    .replace(/[\u200B-\u200D\uFEFF]/g, '')
    .toLowerCase();
}

export function getTextWidth(text = '', fontsize = 12) {
  const span = document.createElement('span');
  span.style.fontFamily = 'Montserrat';
  document.body.appendChild(span);
  span.style.fontSize = `${fontsize}px`;
  span.style.visibility = 'hidden';
  span.style.height = 'auto';
  span.style.width = 'auto';
  span.style.position = 'absolute';
  span.style.left = '-40px';
  span.style.bottom = '-40px';
  span.style.whiteSpace = 'no-wrap';
  span.innerHTML = text;
  const width = span.clientWidth;
  span.remove();
  return width;
}

export function replaceTagWithCompanies(companies, text) {
  if (!companies) {
    return text;
  }
  if (text?.content) {
    text.content.forEach((par) => {
      if (par.content) {
        par.content.forEach((parText) => {
          if (parText && parText.value) {
            // eslint-disable-next-line no-param-reassign
            parText.value = parText.value.replace(
              /{COMPANIES}/g,
              companies.join(', '),
            );
          }
        });
      }
    });
  }
  return text;
}

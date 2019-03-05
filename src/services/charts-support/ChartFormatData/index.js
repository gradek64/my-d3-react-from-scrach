import _ from '../../../utils/misc';


const ChartDataFormat = () => {
  // const spaceStr = '\xa0\xa0';

  const space = '\xa0\xa0';

  const addParentheses = str => `(${str})`;

  const formatNumber = (n, decimals, comma, dot) =>
    _.formatNumber(_.abs(n), decimals, comma, dot);

  const formatPercentage = (n, isNegative) => {
    if (n === null) {
      return '-';
    }

    let str = `${formatNumber(n, 1)}%`;

    if (isNegative) {
      str = `-${str}`;
    }
    return str;
  };

  const formatCurrency = (d, isNegative, currency) => {
    if (d === null) {
      return '-';
    }

    let str = formatNumber(d);

    if (currency) {
      str = currency + str;
    }

    if (isNegative) {
      str = addParentheses(str);
    }

    return str;
  };

  const kFormatter = (n, isNegative, currency) => {
    let str = Math.abs(Math.round(n));
    if (str > 1000000) {
      str = `${Math.round(str / 1000000)}M`;
    } else if (str >= 1000) {
      str = `${Math.round(str / 1000)}K`;
    }

    if (currency) {
      str = currency + str;
    }

    if (isNegative) {
      str = addParentheses(str);
    }

    return str;
  };

  const formatToolTipText = (
    n,
    isNegative,
    currency,
    percentage,
    label,
  ) => {
    let str = formatCurrency(n, isNegative, currency);

    if (label) {
      str = label + space + str;
    }

    if (_.def(percentage)) {
      str += space + formatPercentage(percentage, percentage < 0);
    }
    return str;
  };

  return {
    kFormatter,
    formatPercentage,
    formatToolTipText,
    formatCurrency,
  };
};

export default ChartDataFormat();

import costModels from './mocks/costModels';
import _ from '../utils/misc';
'use strict';

const costModelsMockService = ()=> {
     

  const sort = (costModels, params) => {
    if (_.def(params.predicate)) {
      costModels.sort(_.compareFactory(params.predicate, params.reverse));
    }
  };

  const getOne = (configId, costpotId, params) =>
    getAll(configId, params).then((res) => {
      return res.data.find((e) => e.id === parseInt(configId));
    });

  const prop = (prop, obj) => obj && obj[prop];

  const sortParams = (params) => prop('sort', params) || {};

  const pagParams = (params) =>
    prop('pagination', params) || {start: 0, number: 200};

  const prepare = (costModels, params) => {
    const res = _.copy(costModels);
    sort(res, sortParams(params));

    const pag = pagParams(params);
    return res.slice(pag.start, pag.start + pag.number);
  };

  const getAll = (params) =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: prepare(costModels, params),
          totalItemCount: _.length(costModels),
        });
      }, 0);
    });

  return {
    getAll,
    getOne,
  };
};
export default costModelsMockService();

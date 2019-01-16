import costModels from './mocks/costModels';
import database from '../firebase/firebase';
import _ from '../utils/misc';
'use strict';

const costModelsMockService = ()=> {
     

  const sort = (costModels, params) => {
    if (_.def(params.predicate)) {
      costModels.sort(_.compareFactory(params.predicate, params.reverse));
    }
  };
  const populate= () => {
    //just drop entiere array in set method for firebase db
    database
      .ref('costModels')
      .set(costModels);
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

  const getAll = () =>
    database.ref('costModels')
      .once('value')
      .then((snapshot) => {
        const dbData = snapshot.val();
        console.log(dbData);
        return {
          data: dbData,
          totalItemCount: _.length(dbData),
        };
      })
      .catch((e) => {
        console.warn('Error fetching data', e);
      });

  return {
    getAll,
    getOne,
    populate
  };
};
export default costModelsMockService();

'use strict';

const fileMapping = () => {
  const mappingFiles = [
    {
      name: 'ITFBLevel1',
      api: '/itfb',
      id: 'itfb1Id',
      label: 'ITFB Level 1',
      hidden: false,
    },
    {
      name: 'ITFBLevel2',
      api: '/itfb',
      id: 'itfb2Id',
      label: 'ITFB Level 2',
      hidden: false,
    },
    {
      name: 'ITFBLevel3',
      api: '/itfb',
      id: 'itfb2Id',
      label: 'ITFB Level 3',
      hidden: false,
    },
    {
      name: 'TARGET_COST_CENTRE',
      api: '/target-cost-centres',
      id: 'targetCostCentreId',
      label: 'Target Cost Centre',
      hidden: false,
    },
  ];


  const getCommon = (params) =>
    new Promise((resolve) => {
      resolve({data: mappingFiles});
    });

  const getAll = (fileTypeId, params) => {
    if (fileTypeId === 'common') {
      return getCommon(params);
    }
  };

  return {
    getAll,
  };
};

export default fileMapping();
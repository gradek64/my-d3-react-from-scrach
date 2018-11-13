const levelsService =
    (api) => {
      const responseMiddleware = (res) => {
        return {
          data: res.data || [],
        };
      };

      const levels = [
        {
          id: 16,
          order: 0,
          name: 'Source',
          type: 'SYSTEM',
          hidden: false,
          domainId: 1,
          createdBy: 'rc1@amalytics.co',
          creationDate: '2018-06-22T14:59:23.194Z',
        },
        {
          id: 17,
          order: 1,
          name: 'Entitlement',
          type: 'SYSTEM',
          hidden: false,
          domainId: 1,
          createdBy: 'rc1@amalytics.co',
          creationDate: '2018-06-22T14:59:23.194Z',
        },
        {
          id: 18,
          order: 2,
          name: 'Functional',
          type: 'SYSTEM',
          hidden: true,
          domainId: 2,
          createdBy: 'rc1@amalytics.co',
          creationDate: '2018-06-22T14:59:23.194Z',
        },
        {
          id: 19,
          order: 3,
          name: 'Infrastructure 1',
          type: 'SYSTEM',
          hidden: false,
          domainId: 3,
          createdBy: 'rc1@amalytics.co',
          creationDate: '2018-06-22T14:59:23.194Z',
        },
        {
          id: 20,
          order: 4,
          name: 'Infrastructure 2',
          type: 'SYSTEM',
          hidden: false,
          domainId: 3,
          createdBy: 'rc1@amalytics.co',
          creationDate: '2018-06-22T14:59:23.194Z',
        },
        {
          id: 21,
          order: 5,
          name: 'Infrastructure 3',
          type: 'SYSTEM',
          hidden: false,
          domainId: 3,
          createdBy: 'rc1@amalytics.co',
          creationDate: '2018-06-22T14:59:23.194Z',
        },
        {
          id: 22,
          order: 6,
          name: 'Services',
          type: 'SYSTEM',
          hidden: false,
          domainId: 4,
          createdBy: 'rc1@amalytics.co',
          creationDate: '2018-06-22T14:59:23.194Z',
        },
        {
          id: 23,
          order: 7,
          name: 'Target',
          type: 'SYSTEM',
          hidden: false,
          domainId: 5,
          createdBy: 'rc1@amalytics.co',
          creationDate: '2018-06-22T14:59:23.194Z',
        },
      ];
      const mock = true;
      const getAll = (id, params, server = 'configuration-srv') => {
        if (mock) {
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve({
                data: levels,
              });
            }, 20);
          }).then(responseMiddleware);
        } else {
          return api
            .get('/' + server + '/v2/configurations/' + id + '/levels', params)
            .then(responseMiddleware);
        }
      };

      return {
        getAll,
      };
    };

export default levelsService();

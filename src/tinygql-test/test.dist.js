(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define([], factory);
  } else if (typeof exports !== "undefined") {
    factory();
  } else {
    var mod = {
      exports: {}
    };
    factory();
    global.test = mod.exports;
  }
})(this, function () {
  'use strict';

  (function () {
    var gql = new TinyGQL({ url: 'phonyUrl' });

    gql.storeFragment('\n    fragment companyFragment on CompanyType {\n      companyId\n      name\n    }\n  ');

    var query = '\n    {\n      listCompany {\n        ...companyFragment\n      }\n    }\n  ';

    gql.send(query, function (err, data) {
      if (err) {
        console.error(err);
      } else {
        console.log('company list', data);
      }
    });

    gql.send({
      query: 'mutation CreateCompany($name: String!) {\n      createCompany(name: $name) {\n        ...companyFragment\n      }\n    }',

      variables: { name: 'Tech Underground' },

      // callback: (err, data) => {
      //   if (err) {
      //     console.error(err);
      //   } else {
      //     console.log('new company', data);

      //     gql.send(query, (err, data) => {
      //       console.log('updated company list', data);
      //     });
      //   }
      // }

      callback: errorWrapper(processData)
    });

    function processData(data, next) {
      console.log('new company', data);
      getUpdatedCompanyList();
    }

    function getUpdatedCompanyList() {
      gql.removeFragment('companyFragment');
      gql.send(query, errorWrapper(processCompanyList));
    }

    function processCompanyList(data) {
      console.log('updated company list', data);
    }

    function errorWrapper(dataHandler) {
      return function (err, data) {
        if (err) {
          console.log('err.name', err.name);
          throw err;
        } else {
          dataHandler(data);
        }
      };
    }
  })();
});
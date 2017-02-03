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
    var gql = new TinyGQL();

    gql.storeFragment('\n    fragment companyFragment on CompanyType {\n      companyId\n      name\n    }\n  ');

    var query = '\n    {\n      listCompany {\n        ...companyFragment\n      }\n    }\n  ';

    gql.send({ query: query }, function (err, data) {
      if (err) {
        console.error(err);
      } else {
        console.log('company list', data);
      }
    });

    var errorWrapper = function errorWrapper(dataHandler) {
      return function (err, data) {
        if (err) {
          console.log('err.name', err.name);
          throw err;
        } else {
          dataHandler(data);
        }
      };
    };

    var processCompanyList = errorWrapper(function (data) {
      console.log('updated company list', data);
    });

    var getUpdatedCompanyList = function getUpdatedCompanyList() {
      gql.send({ query: query }, processCompanyList);
    };

    var processData = errorWrapper(function (data) {
      console.log('new company', data);
      getUpdatedCompanyList();
    });

    gql.send({
      mutation: 'mutation CreateCompany($name: String!) {\n      createCompany(name: $name) {\n        ...companyFragment\n      }\n    }',

      variables: { name: 'Tech Underground' }
    }, processData);
  })();
});
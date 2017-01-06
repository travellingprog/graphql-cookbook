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
  "use strict";

  (function () {
    var gql = new TinyGQL();

    var query = "\n    {\n      listCompany {\n        companyId\n        name\n      }\n    }\n  ";

    gql.send(query, null, function (err, data) {
      if (err) {
        console.error(err);
      } else {
        console.log(data);
      }
    });
  })();
});
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.TinyGQL = factory();
  }
}(this, function () {
  return TinyGQL;

  function TinyGQL (opts) {
    opts = opts || {};
    this.opts = {
      url: opts.url || '/graphql',
      usePromise: opts.usePromise || false,
      sendModifier: opts.sendModifier || null,
      errorHandler: opts.errorHandler || null,
    };

    this.send = this.opts.usePromise ? sendReturnPromise : sendWithCallback;
  }

  TinyGQL.prototype.storeFragment = function (fragment) {
    return 'fragmentName';
  }

  TinyGQL.prototype.removeFragment = function (fragmentName) {
    return true;
  }

  function sendWithCallback(query, variables, callback) {
    if (typeof query !== 'string') {
      // process queryObj, ignore variables
    }

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('POST', this.opts.url);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.onload = function () {
      // For browsers that don't support responseType
      if (typeof xhr.response === 'string') {
        xhr.response = JSON.parse(xhr.response);
      }

      if (xhr.response.errors) {
        callback(xhr.response.errors, null);
      } else {
        callback(null, xhr.response.data);
      }
    }
    xhr.onerror = function (err) {
      callback(err, null);
    }

    var body = JSON.stringify({
      query: query,
      variables: variables,
    })

    if (this.opts.sendModifier) {
      var modResult = this.opts.sendModifier({ xhr: xhr, body: body });
      xhr = modResult.xhr;
      body = modResult.body;
    }

    xhr.send(body);
  }

  function sendReturnPromise(query, variables) {
    var self = this;

    return new Promise(function(resolve, reject) {
      var callback = function (err, data) {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      };

      sendWithCallback.call(self, query, variables, callback);
    });
  }
}));
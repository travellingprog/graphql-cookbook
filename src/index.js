const babel = require('babel-core');
import express from 'express';
import fs from 'fs';
import config from './config';
import graphqlHTTP from 'express-graphql';
import path from 'path';
import {
  schema
} from './graphql/schema';

import {
  setCrossDomainHeader
} from './serverUtil';

const compileJsFile = (srcName, distName) => {
  const dir = path.resolve(__dirname, 'tinygql-test');
  const src = path.resolve(dir, srcName);
  const dist = path.resolve(dir, distName);
  const { code } = babel.transformFileSync(src, {
    presets: [
      ['es2015', { modules: 'umd' }]
    ]
  });
  fs.writeFileSync(dist, code);
}

const main = () => {
  compileJsFile('test.js', 'test.dist.js');

  let app = express();

  app.use('/tinygql', express.static(path.resolve(__dirname, 'tinygql-test')));

  app.use('/graphql', setCrossDomainHeader, graphqlHTTP({
    schema,
    rootValue: {
      config
    },
    graphiql: true
  }));

  app.listen(config.server.port);
};

main();

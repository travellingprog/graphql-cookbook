import express from 'express';
import config from './config';
import graphqlHTTP from 'express-graphql';
import path from 'path';
import {
  schema
} from './graphql/schema';

import {
  setCrossDomainHeader
} from './serverUtil';

const main = () => {
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

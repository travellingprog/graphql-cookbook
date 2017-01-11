# TinyGQL Example

This is a playground for developing and testing TinyGQL, a GraphQL frontend client I'm building that is tiny, has a UMD wrapper and has zero external dependencies. It doesn't depend on using Browserify/Webpack/Rollup, or any other module bundler. It uses XMLHttpRequest rather than Fetch. In other words, you can just load it with a `<script>` tag and it will work in all common browsers.

This playground was created by starting of fork of the [GraphQL Cookbook](https://github.com/appier/graphql-cookbook) repository, which provides a GraphQL-powered server with querying and mutations, as well as no database dependency.


## Dependencies

```sh
npm install
```


## Run Application

```sh
npm start
```

Open http://localhost:18885/tinygql on the browser to run the TinyGQL tests.

Open http://localhost:18886/graphql to load a [GraphiQL](https://github.com/graphql/graphiql) page.



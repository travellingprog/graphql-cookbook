(function () {
  const gql = new TinyGQL();

  gql.storeFragment(`
    fragment companyFragment on CompanyType {
      companyId
      name
    }
  `);

  let query = `
    {
      listCompany {
        ...companyFragment
      }
    }
  `;

  gql.send(query, (err, data) => {
    if (err) {
      console.error(err);
    } else {
      console.log('company list', data);
    }
  });


  gql.send({
    query: `mutation CreateCompany($name: String!) {
      createCompany(name: $name) {
        ...companyFragment
      }
    }`,

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
    // gql.removeFragment('companyFragment');   // intentional error
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
    }
  }

})()
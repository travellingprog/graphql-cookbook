(function () {
  const gql = new TinyGQL();

  let query = `
    {
      listCompany {
        companyId
        name
      }
    }
  `;

  gql.send(query, null, (err, data) => {
    if (err) {
      console.error(err);
    } else {
      console.log(data);
    }
  });



})()
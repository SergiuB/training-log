
module.exports = {
    development: {
      root: require('path').normalize(__dirname + '/..'),
      app: {
        name: 'Training Log'
      },
      db: 'mongodb://localhost/traininglog_dev'
    },
    test: {},
    production: {}
};

const configs = {
  local: {
    apiUrl: 'http://localhost:4200',
    wsUrl: 'ws://localhost:4200/subscriptions'
  },
  development: {
    apiUrl: 'http://localhost:4200',
    wsUrl: 'ws://localhost:4200/subscriptions'
  },
  production: {
    apiUrl: 'https://p3hr3zqnwc.execute-api.us-east-1.amazonaws.com/prod',
    wsUrl: 'https://p3hr3zqnwc.execute-api.us-east-1.amazonaws.com/prod/subscriptions'
  },
}

const NODE_ENV = process.env.NODE_ENV || 'local'

module.exports = function () { return (configs[NODE_ENV]); }

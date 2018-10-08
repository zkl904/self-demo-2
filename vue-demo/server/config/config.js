const porduction = {
  REDIS: {
    // host: 'localhost',
    host: '192.168.20.49',
    port: 6379,
    password: "",
    maxAge: 3600000,
    db: 0
  },
}

const development = {
  REDIS: {
    // host: 'localhost',
    host: '192.168.20.49',
    port: 6379,
    password: "",
    maxAge: 3600000,
    db: 1
  },
}

const config = development

module.exports = config

const config = {
  synchronize: false,
  migrations: ['migration/*.js'],
};

switch (process.env.NODE_ENV) {
  case 'development':
    Object.assign(config, {
      type: 'sqlite',
      database: 'db.sqlite',
      entities: ["**/*.entity.js'"],
    });
    break;
  case 'test':
    Object.assign(config, {
      type: 'sqlite',
      database: 'test.sqlite',
      entities: ['**/*.entity.ts'],
    });
    break;
  default:
    break;
}

module.exports = config;

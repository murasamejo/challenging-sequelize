require('dotenv').config();
const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  'gs_net_print',
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: 'localhost',
    dialect: 'postgres',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

const Model = Sequelize.Model;
class TargetTweet extends Model {}

const { Op } = require('sequelize');
const yahooDePuppeteer = async () => {
  await TargetTweet.init(
    {
      // ...
    },
    {
      modelName: 'targetTweet',
      tableName: 'target_tweets',
      sequelize
    }
  );
  const sqlResult = await TargetTweet.count({
    where: {
      id: {
        [Op.gt]: 100
      }
    }
  });
  console.log(sqlResult);
};

yahooDePuppeteer();

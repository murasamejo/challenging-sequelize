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

const Model = Sequelize.Model;
class TargetTweet extends Model {}
const { Op } = require('sequelize');

(async () => {
  await TargetTweet.init(
    {
      tweetObject: {
        type: Sequelize.STRING,
        field: 'tweet_object'
      },
      createdAt: {
        type: Sequelize.DATE,
        field: 'created_at'
      },
      updatedAt: {
        type: Sequelize.DATE,
        field: 'updated_at'
      }
    },
    {
      modelName: 'targetTweet',
      tableName: 'target_tweets',
      sequelize
    }
  );

  const sqlCountResult = await TargetTweet.count({
    where: {
      id: {
        [Op.gt]: 100
      }
    }
  });
  console.log(sqlCountResult);

  const sqlWhereResult = await TargetTweet.findAll({
    where: {
      id: 100
    }
  });
  console.log(sqlWhereResult[0].createdAt);
})();

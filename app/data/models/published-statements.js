module.exports = (sequelize, DataTypes) => {
  const publishedStatement = sequelize.define('publishedStatement', {
    publishedStatementId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    statement: DataTypes.JSONB,
    filename: DataTypes.STRING,
    type: DataTypes.JSONB,
    startProcessing: DataTypes.DATE,
    published: DataTypes.DATE,
    sentToNotify: DataTypes.BOOLEAN
  },
  {
    tableName: 'publishedStatements',
    freezeTableName: true,
    timestamps: false
  })
  return publishedStatement
}

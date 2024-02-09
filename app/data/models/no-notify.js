module.exports = (sequelize, DataTypes) => {
  const noNotify = sequelize.define('noNotify', {
    noNotifyId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    frn: DataTypes.BIGINT,
    claimId: DataTypes.STRING,
    agreementNumber: DataTypes.STRING
  },
  {
    tableName: 'noNotifys',
    freezeTableName: true,
    timestamps: false
  })
  return noNotify
}

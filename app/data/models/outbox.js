module.exports = (sequelize, DataTypes) => {
  const outbox = sequelize.define('outbox', {
    outboxId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    generationId: DataTypes.INTEGER,
    type: DataTypes.JSONB,
    startProcessing: DataTypes.DATE,
    published: DataTypes.DATE,
    sentToPublisher: DataTypes.BOOLEAN
  },
  {
    tableName: 'outbox',
    freezeTableName: true,
    timestamps: false
  })

  outbox.associate = (models) => {
    outbox.belongsTo(models.generation, {
      foreignKey: 'generationId',
      as: 'generation'
    })
  }

  return outbox
}

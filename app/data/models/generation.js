module.exports = (sequelize, DataTypes) => {
  const generation = sequelize.define('generation', {
    generationId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    statementData: DataTypes.JSON,
    dateGenerated: DataTypes.DATE,
    filename: DataTypes.STRING,
    documentReference: DataTypes.INTEGER
  },
  {
    tableName: 'generations',
    freezeTableName: true,
    timestamps: false
  })

  generation.associate = (models) => {
    generation.hasMany(models.outbox, {
      foreignKey: 'generationId',
      as: 'outbox'
    })
  }

  return generation
}

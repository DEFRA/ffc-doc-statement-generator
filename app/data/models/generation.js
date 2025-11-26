module.exports = (sequelize, DataTypes) => {
  const generation = sequelize.define('generation', {
    generationId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, comment: 'History log for statement creation etc' },
    statementData: DataTypes.JSON,
    dateGenerated: DataTypes.DATE,
    filename: DataTypes.STRING,
    documentReference: DataTypes.INTEGER,
    businessName: DataTypes.STRING,
    frn: DataTypes.BIGINT,
    sbi: DataTypes.INTEGER,
    addressLine1: DataTypes.STRING,
    addressLine2: DataTypes.STRING,
    addressLine3: DataTypes.STRING,
    addressLine4: DataTypes.STRING,
    addressLine5: DataTypes.STRING,
    postcode: DataTypes.STRING,
    email: DataTypes.STRING,
    schemeName: DataTypes.STRING,
    schemeShortName: DataTypes.STRING,
    schemeYear: DataTypes.STRING,
    schemeFrequency: DataTypes.STRING
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

const {DataTypes, Sequelize} = require('sequelize');

module.exports = sequelize => {
    sequelize.define( 'Inscription',
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        user: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        inscriptionActive: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    { timestamps: false,
        paranoid: true, }
    )
}
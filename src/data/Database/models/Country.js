module.exports = (sequelize, DataTypes) => {
    const Country = sequelize.define("Countrys", {
        id:{
            type: DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement: true,
            unique: true,
            allowNull: false,
        },
        country: {
            type: DataTypes.STRING(75),
            unique: true,
            allowNull: false
        }
    },
    {
        tableName: "country",
        timestamps: false
    })

    Country.associate = function(models){
        Country.hasMany(models.Users, {
            as: "user",
            foreignKey: "country_id"
        })
    }
    return Country
}

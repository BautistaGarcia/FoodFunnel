module.exports = (sequelize, dataTypes) => {
    const Country = sequelize.define("Countrys", {
        id:{
            type: dataTypes.INTEGER,
            primaryKey : true,
            autoIncrement: true,
            unique: true,
            allowNull: false,
        },
        country: {
            type: dataTypes.STRING(75),
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

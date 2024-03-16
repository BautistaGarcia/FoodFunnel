module.exports = (sequelize, dataTypes) => {
    const Address = sequelize.define("Address", {
        id:{
            type: dataTypes.INTEGER,
            primaryKey : true,
            autoIncrement: true,
            unique: true,
            allowNull: false,
        },
        address_id: {
            type: dataTypes.VARCHAR(150),
            allowNull: false
        }
    },
    {
        tableName: "Address",
        timestamps: false
    })

    Address.associate = function(models){
        Address.hasMany(models.Products, {
            as: "products",
            foreignKey: "Address_id"
        })
    }
    return Address
}

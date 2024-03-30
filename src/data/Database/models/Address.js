module.exports = (sequelize, DataTypes) => {
    const Address = sequelize.define("Address", {
        id:{
            type: DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement: true,
            unique: true,
            allowNull: false,
        },
        address_id: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        tableName: "address",
        timestamps: false
    })

    Address.associate = function(models){
        Address.hasMany(models.Products, {
            as: "products",
            foreignKey: "address_id"
        })
    }
    return Address
}

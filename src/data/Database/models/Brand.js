module.exports = (sequelize, DataTypes) => {
    const Brand = sequelize.define("Brands", {
        id:{
            type: DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement: true,
            unique: true,
            allowNull: false,
        },
        brand_name: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        }
    },
    {
        tableName: "brand",
        timestamps: false
    })

    Brand.associate = function(models) {
        Brand.hasMany(models.Products, {
            as: 'products',
            foreignKey: 'brand_id'
        })
      }
    return Brand
}
module.exports = (sequelize, dataTypes) => {
    const Brand = sequelize.define("Brands", {
        id:{
            type: dataTypes.INTEGER,
            primaryKey : true,
            autoIncrement: true,
            unique: true,
            allowNull: false,
        },
        brand_name: {
            type: dataTypes.VARCHAR(100),
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
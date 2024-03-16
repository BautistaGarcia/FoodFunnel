module.exports = (sequelize, dataTypes) => {
    const Product = sequelize.define("Products", {
        id:{
            type: dataTypes.INTEGER,
            primaryKey : true,
            autoIncrement: true,
            unique: true,
            allowNull: false,
        },
        name: {
            type: dataTypes.STRING(50),
            allowNull: false,
            unique: true
        },
        description: {
            type: dataTypes.TEXT,
            allowNull: false
        },
        quantity: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        price: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        discount: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        },
        image: {
            type: dataTypes.STRING(255)
        }
    },
    {
        tableName: "product",
        timestamps: false
    });
    
    Product.associate = function(models){
        Product.belongsTo(models.Brands, {
            as: "brand",
            foreignKey: "brand_id"
        })
        Product.belongsTo(models.Categorys, {
            as: "category",
            foreignKey: "category_id"
        })
        Product.belongsTo(models.States, {
            as: "state",
            foreignKey: "location_id"
        })
    }
    return Product
} 
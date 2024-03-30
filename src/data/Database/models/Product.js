module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define("Products", {
        id:{
            type: DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement: true,
            unique: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        discount: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        image: {
            type: DataTypes.STRING(255)
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
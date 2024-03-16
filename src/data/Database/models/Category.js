module.exports = (sequelize, dataTypes) => {
    const Category = sequelize.define("Categorys", {
        id:{
            type: dataTypes.INTEGER,
            primaryKey : true,
            autoIncrement: true,
            unique: true,
            allowNull: false,
        },
        category: {
            type: dataTypes.STRING(100),
            unique: true,
            allowNull: false
        }
    },
    {
        tableName: "category",
        timestamps: false
    })

    Category.associate = function(models){
        Category.hasMany(models.Products, {
            as: "products",
            foreignKey: "category_id"
        })
    }

    return Category
}
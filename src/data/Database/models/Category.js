module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define("Categorys", {
        id:{
            type: DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement: true,
            unique: true,
            allowNull: false,
        },
        category_name: {
            type: DataTypes.STRING(100),
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
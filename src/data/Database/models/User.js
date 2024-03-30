module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("Users", {
        id:{
            type: DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement: true,
            unique: true,
            allowNull: false,
        },
        first_name: {
            type: DataTypes.STRING(150),
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING(150),
            allowNull: false
        },
        password: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(150),
            allowNull: false
        },
        image: {
            type: DataTypes.STRING(255),
        },
        registered_date: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        user_type_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            foreignKey: true
        },
        country_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            foreignKey: true
        }
    }, 
    {
        tableName: "user",
        timestamps: false
    })

    User.associate = function(models){
        User.belongsTo(models.Type_of_user, {
            as: "user_type",
            foreignKey: "user_type_id"
        })
        User.belongsTo(models.Countrys, {
            as: "country",
            foreignKey: "country_id"
        })
    }

    return User
}
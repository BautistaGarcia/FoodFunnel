module.exports = (sequelize, dataTypes) => {
    const User = sequelize.define("Users", {
        id:{
            type: dataTypes.INTEGER,
            primaryKey : true,
            autoIncrement: true,
            unique: true,
            allowNull: false,
        },
        first_name: {
            type: dataTypes.STRING(150),
            allowNull: false
        },
        last_name: {
            type: dataTypes.STRING(150),
            allowNull: false
        },
        password: {
            type: dataTypes.TEXT,
            allowNull: false
        },
        email: {
            type: dataTypes.STRING(150),
            allowNull: false
        },
        image: {
            type: dataTypes.STRING(255),
        },
        registered_date: {
            type: dataTypes.DATEONLY,
            allowNull: false
        },
        user_type_id: {
            type: dataTypes.INTEGER,
            allowNull: false,
            foreignKey: true
        },
        country_id: {
            type: dataTypes.INTEGER,
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
module.exports = (sequelize, DataTypes) => {
    const UserType = sequelize.define("Type_of_user", {
        id:{
            type: DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement: true,
            unique: true,
            allowNull: false,
        },
        user_type: {
            type: DataTypes.STRING(50),
            unique: true,
            allowNull: false
        }
    },
    {
        tableName: "user_type",
        timestamps: false
    })

    UserType.associate = function(models){
        UserType.hasMany(models.Users, {
            as: "user",
            foreignKey: "user_type_id"
        })
    }

    return UserType
}
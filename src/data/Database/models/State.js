module.exports = (sequelize, DataTypes) => {
    const State = sequelize.define("States", {
        id:{
            type: DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement: true,
            unique: true,
            allowNull: false,
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        tableName: "state",
        timestamps: false
    })

    State.associate = function(models){
        State.hasMany(models.Products, {
            as: "products",
            foreignKey: "state"
        })
    }
    return State
}

module.exports = (sequelize, dataTypes) => {
    const State = sequelize.define("States", {
        id:{
            type: dataTypes.INTEGER,
            primaryKey : true,
            autoIncrement: true,
            unique: true,
            allowNull: false,
        },
        location: {
            type: dataTypes.VARCHAR(150),
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

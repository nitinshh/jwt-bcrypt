module.exports = (Sequelize, sequelize, DataTypes) => {
    return sequelize.define("user", {
        ...require("./cors")(Sequelize, DataTypes),
  
        name: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING(255),
          allowNull: false, 
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false
        }
      },
      {
        tableName: "user"
      }
    );
  };
  
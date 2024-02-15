const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Favorites = sequelize.define(
    "favorites",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(255), // Example max length
        allowNull: false, // Assuming name is required
      },
      category: {
        type: DataTypes.STRING(255),
        allowNull: true, // Assuming category can be optional
      },
      summary: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      imageURL: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      price: {
        type: DataTypes.DECIMAL(10, 2), // Assuming price is a decimal value
        allowNull: true,
      },
      links: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      sort: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      // Other model options here
    }
  );

  return Favorites;
};

module.exports = Favorites;

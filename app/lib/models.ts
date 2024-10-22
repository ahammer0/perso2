import { Sequelize, DataTypes } from 'sequelize'

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    dialectModule: require("mysql2"),
    dialect: "mysql",
    host: process.env.DB_HOST,
  }
);

const User = sequelize.define('User', {
  firstName:{
    type: DataTypes.STRING,
    allowNull:false,
  },
  lastName:{
    type:DataTypes.STRING,
  }
})

const Project = sequelize.define('Project', {
  name:{
    type: DataTypes.STRING,
  },
}) 

console.log(Project)

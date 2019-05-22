'use strict';
const bcrypt= require('bcrypt')
const salt= bcrypt.genSaltSync(10)

module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define('Customer', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    birthday: DataTypes.DATE,
    email: {
      type: DataTypes.STRING,
      validate:{
        isEmail:{
          args: true,
          msg: 'Please input email in correct format'
        },
        isUniq(value){
          return Customer.findOne({where: { email: value }})
          .then(email=>{
            if(email) throw new Error ('Email has been used')
          })
          .catch(err=>{
            throw new Error (err.message)
          })
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [8, 12],
          msg: `Password length must between 8-12 characters`
        }
      }
    },
    point: DataTypes.INTEGER,
    balance: DataTypes.INTEGER
  }, {
    hooks:{
      beforeSave: (customer, options) => {
        customer.password = bcrypt.hashSync(customer.password, salt)

      }
    }
  });
  Customer.associate = function(models) {
    // associations can be defined here
  };
  return Customer;
};
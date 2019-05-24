'use strict';
const bcrypt = require('bcrypt')
module.exports = (sequelize, DataTypes) => {
  const Employee = sequelize.define('Employee', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    birthday: DataTypes.DATE,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: `Wrong email format`
        }
      }
    },
    password: DataTypes.STRING,
    isLogin: DataTypes.STRING
  }, {
    validate: {
      emailUnique() {
        return Employee.findAll()
        .then( (employees) => {
            for (var i=0; i<employees.length; i++) {
              if (employees[i].id !== this.id) {
                if (employees[i].email === this.email) {
                  throw new Error(`Email sudah dgunakan`)
                }
              }
            }
        })
      }
    },
    hooks: {
      beforeCreate: (employee, options) => {
        var salt = bcrypt.genSaltSync(10)
        var hashedPassword = bcrypt.hashSync(employee.password, salt)
        employee.password = hashedPassword
      }
    }
  });
  Employee.associate = function(models) {
    // associations can be defined here
    Employee.hasMany(models.bookRent,{foreignKey: "employeeId"})
  };
  return Employee;
};
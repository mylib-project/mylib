'use strict';
module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define('Customer', {
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
    balance: {
      type: DataTypes.INTEGER,
      validate: {
        min: {
          args: 0,
          msg: `Balance minimium is zero (0)`
        }
      }
    }
  }, {
    validate: {
      emailUnique() {
        return Customer.findAll()
        .then( (customers) => {
            for (var i=0; i<customers.length; i++) {
              if (customers[i].id !== this.id) {
                if (customers[i].email === this.email) {
                  throw new Error(`Email sudah dgunakan`)
                }
              }
            }
        })
      }
    },
    hooks: {
      beforeCreate: (customer, options) => {
        var salt = bcrypt.genSaltSync(10)
        var hashedPassword = bcrypt.hashSync(customer.password, salt)
        customer.password = hashedPassword
      }
    }
  });
  Customer.associate = function(models) {
    // associations can be defined here
  };
  return Customer;
};
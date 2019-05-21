'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('Tags', 
    [{
      name: 'Komik',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Pendidikan',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Sejarah',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Hukum',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Sastra',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Buku Medis',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Agama',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Sains',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Komputer & Teknologi',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Teknik',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Finansial',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Matematika',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Psikologi',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Ilmu Sosial',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Fiksi',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Romance',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Pengembangan Diri',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Anak-Anak',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Bisnis & Ekonomi',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Pertanian',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
   return queryInterface.bulkDelete('Tags', null, {});
  }
};

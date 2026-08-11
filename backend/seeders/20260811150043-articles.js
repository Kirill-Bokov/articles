'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('articles', [
      {
        title: 'Что такое Node.js',
        content: 'Node.js — среда выполнения JavaScript вне браузера.',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        title: 'Основы PostgreSQL',
        content: 'PostgreSQL — объектно-реляционная система управления базами данных.',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        title: 'Зачем нужны ORM',
        content: 'ORM позволяет работать с данными базы через объекты и модели приложения.',
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('articles', null, {});
  }
};

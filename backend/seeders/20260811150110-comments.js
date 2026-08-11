'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('comments', [
      {
        content: 'Спасибо за хорошее объясение!',
        article_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        content: 'Стоило подробнее рассказать про event loop.',
        article_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        content: 'PostgreSQL действительно удобен для таких задач.',
        article_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        content: 'Интересно узнать больше про Sequelize.',
        article_id: 3,
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('comments', null, {});
  }
};

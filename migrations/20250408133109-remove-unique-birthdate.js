module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('users', 'users_birthdate_key'); // nome da constraint
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('users', {
      fields: ['birthdate'],
      type: 'unique',
      name: 'users_birthdate_key'
    });
  }
};

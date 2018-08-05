/**
 * Price_history.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    price: {type: 'string', required: false},
    start_date: {type: 'string', required: false},
    end_date: {type: 'string', required: false},
    establishments_has_products: {type: 'string', required: false},
  },

};


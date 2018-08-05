/**
 * Price_history.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    price: {type: 'string', required: false},
    date: {type: 'string', required: false},
    establishments_has_products_id: {type: 'number', required: true},
  },
};


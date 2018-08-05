/**
 * Price.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    active: { type: 'boolean', defaultsTo: false },
    establishmentProductId: { type: 'number', required: true },
    price: { type: 'number', required: true, columnType: 'float' },
  },
};


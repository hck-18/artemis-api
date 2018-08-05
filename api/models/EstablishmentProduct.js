/**
 * EstablishmentProduct.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    id: { type: 'number', required: true },
    establishments_id: { type: 'number', required: true },
    products_id: { type: 'number', required: true },
  },
};


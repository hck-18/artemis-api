/**
 * Establishment.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    name: { type: 'string', required: true },
    lat: { type: 'number', required: true, columnType: 'float' },
    lng: { type: 'number', required: true, columnType: 'float' },
    address: { type: 'string', required: true },
    cities_id: { type: 'number', required: true },
    verified: { type: 'boolean', defaultsTo: true },
    products: {
      collection: 'product',
      via: 'establishments'
    }
  },

};


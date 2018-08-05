/**
 * EstablishmentProduct.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    establishmentId: { type: 'number', required: true },
    productId: { type: 'number', required: true },
    product: {
      model: 'product',
      via: 'productId',
      unique: true
    },
    establishment: {
      model: 'establishment',
      via: 'establishmentId',
      unique: true
    }
  },
};


/**
 * Product.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    name: { type: 'string', required: true },
    barcode: { type: 'string', required: true },
    brands_id: { type: 'number' },
    barcode_type: { type: 'string' },
  },
};


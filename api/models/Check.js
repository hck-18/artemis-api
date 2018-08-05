/**
 * Check.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    prices_id: { type: 'number', required: true },
    positive: { type: 'boolean', defaultsTo: true},
  },
};


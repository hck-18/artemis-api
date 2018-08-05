/**
 * Check.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    id: { type: 'number', required: true },
    prices_id: { type: 'number', required: true },
    positive: { type: 'bool', required: true, defaultsTo: true},
  },
};


/**
 * ProductController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const calculateDistance = require('./classes/distance');

module.exports = {
  _config: { actions: false, rest: false, shortcuts: false },
  view: async (req, res) => {
    if (!req.query.establishmentId || !req.query.lat || !req.query.lng) {
      return res.status(400).send('Invalid parameters');
    }

    console.log('ID: ', req.params.id);

    const establishmentProduct = await Establishmentproduct.findOne({
      where: {
        establishment: req.query.establishmentId,
        product: req.params.id,
      }
    }).populate('product').populate('establishment');

    console.log('establishmentProduct: ', establishmentProduct);
    console.log('params', req.params);
    console.log('query', req.query);
    if (!establishmentProduct) {
      return res.status(404).send()
    }

    // Search for product, establishment and price

    const product = establishmentProduct.product;
    const establishment = establishmentProduct.establishment;

    if (!product || !establishment) {
      return res.status(400).send('Something is very bad');
    }

    const price = await Price.findOne({ where: { establishmentProductId: establishmentProduct.id, active: true } });

    if (!price) {
      console.log('No price');
      return res.status(400).send();
    }

    return res.json({
      "id": product.id,
      "name": product.name,
      "description": "Description",
      "price": price.value,
      "image": product.image,
      "establishment": {
        "id": establishment.id,
        "name": establishment.name,
        // "distance": sails.helpers.distance(req.query.lat, req.query.lng, establishment.lat, establishment.lng, 'K'),
        "distance": calculateDistance(req.query.lat, req.query.lng, establishment.lat, establishment.lng, 'K'),
        "verified": true
      }
    });
  },
  index: async (req, res) => {
    if ((!req.query.q && !req.query.barcode) || !req.query.lat || !req.query.lng) {
      return res.status(400).send('Invalid parameters');
    }

    var radius = 2000;
    if (req.query.radius) {
      radius = req.query.radius;
    }

    var conditions = [];
    var conditions_prods = '';
    var values = [];
    var values_prods = '';
    if (req.query.q) {
      conditions_prods = ' AND PR.name LIKE "%' + req.query.q + '%"';
      values_prods = req.query.q;
    }

    if (req.query.barcode) {
      conditions_prods = ' AND PR.barcode =  "' + req.query.barcode + '"';
      values_prods = req.query.barcode;
    }
    values.push(req.query.lat)
    values.push(req.query.lng)
    values.push(radius)

    var theQuery = `SELECT *, 1000 * (6371 * acos(cos(radians($1)) *
                              cos(radians( E.lat ))
                              * cos(radians( E.lng ) - radians($2)) + sin( radians($1) ) *
                              sin( radians( E.lat ) ) )
                            ) AS distance  FROM establishment AS E HAVING distance <= $3`;

    const result = await sails.sendNativeQuery(theQuery, values);
    console.log(result.rows);
    if (result.rows.length == 0) {
      return res.status(400).send();
    }
    var establishmentsFound = [];
    var establismentsAttributes = {};
    result.rows.forEach(function(rowData, index) {
      establishmentsFound.push(rowData.id);
      establismentsAttributes[rowData.id] = rowData;
    });

    var theQueryProd = `SELECT * FROM establishmentProduct AS EP
      LEFT JOIN price AS p ON (EP.id = p.establishmentProductId)
      LEFT JOIN product AS PR ON (EP.product = PR.id)
      WHERE EP.establishment IN (` + establishmentsFound.join(',') + `)
      AND p.active = 1`;

      // console.log(theQueryProd + conditions_prods);
    const prices = await sails.sendNativeQuery(theQueryProd + conditions_prods);
    console.log(prices);
    var returnJson = [];
    prices.rows.forEach(function(price) {
      var priceData = {
          "id": price.id,
          "name": price.name,
          "description": "Description",
          "price": price.price,
          "image": "https://url",
          "establishment": {
              "id": price.establishment,
              "name": establismentsAttributes[price.establishment].name,
              "distance": establismentsAttributes[price.establishment].distance,
              "verified": establismentsAttributes[price.establishment].verified
          }
      };
      returnJson.push(priceData);
    });

    return res.json(returnJson);
  }
};


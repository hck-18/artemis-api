/**
 * ProductController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  _config: { actions: false, rest: false, shortcuts: false },
  view: async (req, res) => {
    if (!req.query.establishmentId || !req.query.lat || !req.query.lng) {
      return res.status(400).send('Invalid parameters');
    }

    console.log('ID: ', req.params.id);

    const establishmentProduct = await EstablishmentProduct.findOne({
      where: {
        establishmentId: req.query.establishmentId,
        productId: req.params.id,
      }
    });

    console.log('establishmentProduct: ', establishmentProduct);

    if (!establishmentProduct) {
      return res.status(404).send()
    }

    // Search for product, establishment and price

    const product = establishmentProduct.product;
    const establishment = establishmentProduct.establishment;

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
        "distance": sails.helpers.distance(req.query.lat, req.query.lng, establishment.lat, establishment.lng, 'K'),
        "verified": true
      }
    });
  },
};


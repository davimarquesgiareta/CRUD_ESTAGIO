module.exports = app => {
    app.route('/products')
        .post(app.api.product.save)   
        .get(app.api.product.get)

    app.route('/products/:id')
        .put(app.api.product.save)
        .delete(app.api.product.remove)    
}


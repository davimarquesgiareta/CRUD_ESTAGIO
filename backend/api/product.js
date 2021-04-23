module.exports = app => {
const { existsOrError, notExistsOrError, equalsOrError} = app.api.validation

        const get = (req, res) => {
             app.db('products')
                .select('id','name','description','price','quantity')
                .then(products => res.json(products))
                .catch(err => res.status(500).send(err))
        }

        const save = (req,res) =>{
            const product = {...req.body}
            if (req.params.id) product.id = req.params.id
            
            try{
                existsOrError(product.name, 'Nome não informado')
                existsOrError(product.description, 'Nome não informado')
                existsOrError(product.price, 'Nome não informado')
                existsOrError(product.quantity, 'Nome não informado')

            } catch(msg){
                return res.status(400).send(msg)
            }

            if(product.id){
                app.db('products')
                    .update(product)
                    .where({id: product.id})
                    .then(_ => res.status(204).send())
                    .catch(err => res.status(500).send(err))
            } else{
                app.db('products')
                    .insert(product)
                    .then(_ => res.status(204).send())
                    .catch(err => res.status(500).send(err))
            }
        }

        const remove = (req,res)=>{
            const product = {...req.body}
            if (req.params.id) product.id = req.params.id
            app.db('products')
                    .where({id: product.id})
                    .del('id')
                    .then(_ => res.status(204).send())
                    .catch(err => res.status(500).send(err))
        }

        return {get, save , remove}
    }
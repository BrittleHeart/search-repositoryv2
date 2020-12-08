import {collection} from '../../server'
import * as yup from 'yup'

class RepositoryController {
    async index(req, res) {
        try {
            const repositories = await collection.find()
            if(!repositories)
                return res.status(404).json({status: 404, message: []})
        
            return res.status(200).json({status: 200, repositories})
        } catch(err) {return res.status(500).json({status: 500, message: err.message})}
    }

    async store(req, res) {
        const {full_name, owner, description, url} = req.body
        const schema = yup.object().shape({
            full_name: yup.string().trim().min(2).max(255).required(),
            owner: yup.object().shape({
                avatar_url: yup.string().trim().min(2).max(255).required(),
                url: yup.string().url().required()
            }),
            description: yup.string(),
            url: yup.string().url().required()
        })

        try {
            await schema.validate({full_name, owner, description, url})
            const repository = await collection.insert({full_name, owner, description, url})

            if(!repository)
                return res.status(400).json({status: 400, message: 'Could not create repository'})

            return res.status(201).json({status: 201, repository})
        } catch (err) {return res.status(500).json({status: 500, message: err.message})}
    }

    async destroy(req, res) {
        const {id} = req.params

        try {
            const repository = await collection.findOne({_id: id})
            if(!repository)
                return res.status(404).json({status: 404, message: `Could not find respository with id = ${id}`})
            
            await collection.remove({_id: id})
            return res.status(200).json({status: 200, message: 'Repository successfully deleted'})
        } catch (err) {return res.status(500).json({status: 500, message: err.message})}
    }
}

export default RepositoryController
import {app} from '../server'
import RepositoryController from '../app/controllers/RepositoryController'

const repository = new RepositoryController()

app.get('/api/v1/repositories', async (req, res) => await repository.index(req, res))
app.post('/api/v1/repositories', async (req, res) => await repository.store(req, res))
app.delete('/api/v1/repositories/:id', async (req, res) => await repository.destroy(req, res))
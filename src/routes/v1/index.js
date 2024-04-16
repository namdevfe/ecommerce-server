// const userRouter = require('./user')
import userRouter from './user'

const initRoutes = (app) => {
  app.use('/api/v1/user', userRouter)
}

export default initRoutes
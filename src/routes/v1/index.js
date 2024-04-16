import { errorHandler, notFound } from '~/middlewares/errorHandlerMiddleware'
import userRouter from './user'

const initRoutes = (app) => {
  app.use('/api/v1/user', userRouter)

  app.use(notFound)
  app.use(errorHandler)
}

export default initRoutes

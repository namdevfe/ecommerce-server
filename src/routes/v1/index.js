import { errorHandler, notFound } from '~/middlewares/errorHandlerMiddleware'
import userRouter from './user'
import productRouter from './product'

const initRoutes = (app) => {
  app.use('/api/v1/user', userRouter)
  app.use('/api/v1/product', productRouter)

  app.use(notFound)
  app.use(errorHandler)
}

export default initRoutes

import { errorHandler, notFound } from '~/middlewares/errorHandlerMiddleware'
import userRouter from './user'
import productRouter from './product'
import productCategoryRouter from './productCategory'

const initRoutes = (app) => {
  app.use('/api/v1/user', userRouter)
  app.use('/api/v1/product', productRouter)
  app.use('/api/v1/product-category', productCategoryRouter)

  app.use(notFound)
  app.use(errorHandler)
}

export default initRoutes

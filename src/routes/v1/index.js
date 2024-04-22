import { errorHandler, notFound } from '~/middlewares/errorHandlerMiddleware'
import userRouter from './user'
import productRouter from './product'
import productCategoryRouter from './productCategory'
import blogCategoryRouter from './blogCategory'
import blogRouter from './blog'

const initRoutes = (app) => {
  app.use('/api/v1/user', userRouter)
  app.use('/api/v1/product', productRouter)
  app.use('/api/v1/product-category', productCategoryRouter)
  app.use('/api/v1/blog-category', blogCategoryRouter)
  app.use('/api/v1/blog', blogRouter)

  app.use(notFound)
  app.use(errorHandler)
}

export default initRoutes

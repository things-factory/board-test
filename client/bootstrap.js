import { store, UPDATE_BASE_URL, UPDATE_DEFAULT_ROUTE_PAGE } from '@things-factory/shell'

export default function bootstrap() {
  store.dispatch({
    type: UPDATE_BASE_URL
  })

  store.dispatch({
    type: UPDATE_DEFAULT_ROUTE_PAGE,
    defaultRoutePage: 'board-list'
  })
}

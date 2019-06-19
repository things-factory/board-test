import { store, UPDATE_BASE_URL, UPDATE_DEFAULT_ROUTE_PAGE } from '@things-factory/shell'

export default function bootstrap() {
  store.dispatch({
    type: UPDATE_BASE_URL
    // baseUrl: 'http://52.231.75.202/rest'
    // baseUrl: 'http://board-demo.hatiolab.com/rest'
  })

  store.dispatch({
    type: UPDATE_DEFAULT_ROUTE_PAGE,
    defaultRoutePage: 'menu-list'
  })
}

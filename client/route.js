export default function route(page) {
  switch (page) {
    case 'index':
      /* board-ui 모듈의 board-list 페이지를 default page로 한다. */
      return 'board-list'
  }
}

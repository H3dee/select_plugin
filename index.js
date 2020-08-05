import {Select} from './select/js/select'

const select = new Select('#select', {
 placeholder: 'React',
 data: [
      {id: 1, value: 'Flutter'},
      {id: 2, value: 'React native'},
      {id: 3, value: 'Django'},
      {id: 4, value: 'Node.js'},
      {id: 5, value: 'Dart'},
 ]
})

window.select = select
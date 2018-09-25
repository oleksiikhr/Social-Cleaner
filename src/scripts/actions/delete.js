/*
Типы скриптов
- Структура сайта
- Выделение
- Выполнение
 */

/*
Проверка с 20-го до 50-го поста
Только свои посты
 */


// --------------------------------

var timeoutBasic = 1000
var timeoutAjax = 2000
var currentPosition = 1

(async () => {
  await waitElement('.UserActions-editButton')

  clickElement('.UserActions-editButton')
})()

# Личный проект «Киноман» [![Build status][travis-image]][travis-url]

## Техническое задание

### О проекте

«Киноман» — сервис для фанатов большого кино. Подробная информация о горячих новинках кино, возможность выбрать и сформировать собственный список фильмов к просмотру, обсуждение кинофильмов и многое другое. «Киноман» — поможет провести время интересно.

### 1. Описание функциональности

Приложение состоит из двух экранов: «Фильмы» и «Статистика».

#### 1.1 Общий контейнер

В правом верхнем углу шапки отображается звание пользователя. Звание зависит от количества просмотренных фильмов:

* 0 — звание не отображается;
* от 1 до 10 — novice;
* от 11 до 20 — fan;
* от 21 и выше — movie buff;
В правом углу подвала выводится информации о количестве фильмов в сервисе. Информация обновляется один раз — при загрузке приложения.

#### 1.2 Фильмы

После загрузки приложения в списке отображается не более 5 карточек фильмов.

Показ оставшихся фильмов выполняется нажатием на кнопку «Show more». При нажатии показываются очередные 5 фильмов или оставшиеся фильмы, если их количество меньше 5.

После показа всех карточек с фильмами, кнопка «Show more» скрывается.

В случае отсутствия фильмов вместо списка отображается текст: «There are no movies in our database».

На главном экране в блоке «Top rated movies» и «Most commented» отображаются по две карточки фильмов. В блоке «Top rated movies» — фильмы с наивысшим рейтингом. В блоке «Most commented» — фильмы с наибольшим количеством комментариев. Если у всех фильмов одинаковый рейтинг или одинаковое количество комментариев, берутся два случайных фильма соответственно.

Блок «Top rated movies» не отображается, если у всех фильмов рейтинг равен нулю.

Блок «Most commented» не отображается, если отсутствуют фильмы с комментариями.

Блоки «Top rated movies» и «Most commented» обновляются во время работы с приложением. Например, добавление, удаление комментариев приводит к обновлению блока «Most commented». Установка оценки к фильму приводит к обновлению блока «Top rated movies».

#### 1.3 Карточка фильма

Карточки фильмов представлены в двух вариантах: стандартный (на главном экране, в блоках «Top rated movies» и «Most commented») и расширенный (попап с описанием фильма).

В стандартном варианте карточка с фильмом содержит следующую информацию:

* Постер (картинка);
* Название фильма;
* Рейтинг;
* Год производства;
* Продолжительность (в формате «1h 36m»);
* Жанр;
* Краткое описание (не более 140 символов);
* Количество комментариев.
Если описание фильма больше 140 символов, то в карточке отображается 139 символов описания и знак многоточие (…).

При наведении курсора мыши на блок карточки фильма появляются дополнительные кнопки управления:

* «Add to watchlist» — добавляет фильм в список к просмотру;
* «Already watched» — помечает фильм как просмотренный;
* «Add to favorites» — добавляет/удаляет фильм в избранное.
Клик по обложке фильма, заголовку, количеству комментариев открывает попап с подробной информацией о фильме;

Попап содержит расширенную информацию о фильме:

* Полноразмерная обложка;
* Название фильма;
* Оригинальное название фильма;
* Рейтинг;
* Оценка пользователя (видна, если пользователь оценил фильм);
* Режиссёр;
* Сценаристы;
* Актерский состав;
* Дата и год релиза в формате «DD MMMM YYYY» (например: 01 April 1995);
* Продолжительность (в формате «1h 36m»);
* Страна;
* Жанр;
* Полное описание;
* Возрастной рейтинг.
Фильм может относится к нескольким жанрам. Если фильм относится к нескольким жанрам, выводите «Genres», иначе «Genre».

В попапе отображается блок с кнопками управления:

* «Add to watchlist» — добавляет фильм в список к просмотру;
* «Already watched» — помечает фильм как просмотренный;
* «Add to favorites» — добавляет/удаляет фильм в избранное.
Под кнопками управления отображается блок для оценки фильма пользователем (виден, если пользователь пометил фильм как просмотренный).

В заголовке «Comments» отображается количество комментариев к фильму. Например: «Comments 8».

Попап можно закрыть нажатием на кнопку закрытия в правом верхнем углу (крестик) или нажатием на клавиатуре кнопки «Esc». При закрытии попап удаляется из DOM.

Одновременно может быть открыт только один попап. При открытии нового попапа, прежний закрывается. Несохранённые изменения (неотправленный комментарий) пропадают.

#### 1.4 Комментарии

Список комментариев к фильму и форма добавления нового комментария доступны в попапе.

Каждый комментарий состоит из:

* Текст комментария;
* Эмоция;
* Автор комментария;
* Дата комментария;
* Кнопка удаления.
Дата комментария отображается в формате `YYYY/MM/DD HH:MM`. Например: `2019/12/31 23:59`.

Для добавления нового комментария пользователь заполняет текст комментария и выбирает эмоцию (один вариант из: `smile`, `sleeping`, `puke`, `angry`). Имя автора формируется случайным образом на сервере, с клиента оно не передаётся.

Введённые пользователем данные экранируются.

Отправка формы осуществляется нажатием комбинации клавиш `Ctrl/Command + Enter`.

Пользователь может удалить произвольный комментарий. Комментарий удаляется нажатием на кнопку «Delete», расположенную в блоке с комментарием.

#### 1.5 Рейтинг

Пользователь может выставить фильму любую оценку от 1 до 9. Оценка может быть выставлена только для просмотренных фильмов.

Выставить оценку фильму можно в попапе:

* Если пользователь отметил фильм как просмотренный («Already watched»), то между блоком с описанием фильма и блоком с комментариями отображается дополнительный блок «How you feel it», где пользователь может выставить оценку фильму.
Пользователь может отменить оценку несколькими способами:

* Снять с фильма отметку «Already watched» в списке или попапе. В этом случае помимо признака «просмотрено» у фильма отменяется и оценка;
* Открыть попап фильма и в блоке «How you feel it» нажать кнопку «Undo».
Блок «How you feel it» скрывается после успешного выполнения запроса к серверу на снятие пометки «Already watched». Во время отправки запроса элементы управления для изменения оценки блокируются. В случае возникновения ошибки блок остаётся видимым, элементы для выставления оценки разблокируются.
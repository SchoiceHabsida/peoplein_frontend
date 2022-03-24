<!-- 19.03 -->
# 1. для запуска Gulp нужно в терминале редактора (Visual Code) набрать Gulp

# 2. для отображения нужной страницы в файле src/index.html внутри <div class="wrapper"></div> нужно подключить ее с помощю @@include('_header.html') отображаеются все отдельные компоненты страницы подключенные через @@include('') на странице index. Например сейчас отображен только header.html

# 3. в процессе разработки css код с коментариями в обычном формате можно посмотреть в папке Habsida/css/style.css со строки №7800 по окончанию верстки возможно вывести нужный формат css

# 4. node-modules устанавливать локально

Классы основных блоков:
========================
Переключение языка
EN -- .EN_btn
KR -- .KR_btn
========================
Переключение ссылок в Navbar (под header)
home -- .nav-home
search -- .nav-search
search -- .nav-result
========================
Navigation
search -- .search
favorites -- .favorites
interviews -- .interviews
========================
Filter
form -- .filter-form
button -- .btn
action -- .dropdown-item
========================
card
block -- .section-card
img -- .card__img
nationality -- .card__nationality
visa -- .card__visa
age -- .card__age
button1 -- .card__favorites
button2 -- .card__interview

=========================
pagination
links -- .page-link

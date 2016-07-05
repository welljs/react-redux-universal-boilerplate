# react-redux-universal-boilerplate
Шаблон для начала разработки multi-app universal(isomorphic) проектов с использованием React/Redux. 
Основные особенности:
- **Универсальность.** Страницы рендерятся как на сервере, так и на клиенте, и в браузере работает в режиме Single page
- **Multi-app.** Поддержка, в рамках одного проекта, нескольких приложений с общим пулом компонент и функциональных частей. Например: *Основной сайт*, *Админка*, *Личный кабинет* которые шарят между собой общие компоненты, хелперы и прочие архитуктурные решения;
- **Компонентный подход.** Когда основная единица проекта - компонента. Это значит, что все ресурсы необходимые для работы компоненты (scss-стили, reducers, actions), инкапсулированны внутри, и  автоматом подключаются при импорте компоненты, в том числе к store автоматом подключаются данные.

Universal appication for both client side and server side, based on react and redux

WebStorm Babel watcher config:

arguments: $ProjectFileDir$/src --source-maps --out-dir $ProjectFileDir$/out
working directory: $ProjectFileDir$

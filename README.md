# Articles

Веб-приложение для управления статьями и комментариями, разработанное в рамках тестового задания.

## Стек

* Vue 3 + TypeScript
* Vite
* Vue Router
* Vuetify
* Node.js + Express
* PostgreSQL
* Sequelize
* REST API

## Возможности

* Просмотр списка статей.
* Просмотр отдельной статьи.
* Создание, редактирование и удаление статей.
* Добавление и удаление комментариев.
* Валидация данных.
* Обработка ошибок API.

## Запуск

Клонировать репозиторий:

```bash
git clone https://github.com/Kirill-Bokov/articles
cd https://github.com/Kirill-Bokov/articles
```

Установить зависимости в обеих частях приложения:

```bash
npm install
```

Создать `.env` с VITE_API_URL на фронте и DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD на бэке

Запустить backend:

```bash
npm start
```

Запустить frontend:

```bash
npm run dev
```

## Структура проекта

```text
project/
├── backend/      # Express, Sequelize, PostgreSQL
└── frontend/     # Vue 3 application
```

## API

Backend предоставляет REST API для работы со статьями и комментариями. Данные хранятся в PostgreSQL, структура базы данных управляется через Sequelize migrations, начальные данные — через seeds.

## Примечание

Проект выполнен в соответствии с требованиями тестового задания.


## Introduction
Web app which lists units (apartments) from a database.

A unit contains the following metadata:

- id
- name
- size
- price
- rooms
- floor / level

The user can filter the following properties (both multiselect):

- floor
- rooms

The data that must be used can be found under `data/import.json`.



## Requirements

- PHP 7.2
- Apache
- Composer
- NodeJS 12

## Installation

Create a `.env` file from the `.env.example`.
In window Commandline: Navigate to this folder.

Backend:
```
composer install
php artisan key:generate
```

Frontend:
```
cd resources/frontend
npm install
```

## Development
Backend build commands:
```
php artisan serve // host the web app

```

Frontend build commands in `resources/frontend`:
```
npm run hot // runs the app in hot reload mode
npm run dev // compiles the app in dev mode
npm run watch // compiles the app in dev mode every time files change
npm run prod // compiles the app in production mode
```

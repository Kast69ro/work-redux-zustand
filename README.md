from pathlib import Path

# Текст README
readme_text = """
# 🧠 React State Sync Demo

Приложение демонстрирует работу с двумя менеджерами состояния — **Redux** и **Zustand**, реализуя как синхронные, так и асинхронные сценарии. Для визуального оформления используются **Material UI (MUI)** и **Ant Design (AntD)**.

---

## 📁 Структура проекта

- `pages/`: Отдельные страницы (Redux/Zustand)  
- `store/`: Redux и Zustand хранилища  
- `layout.css`: Стили навигации и контейнера  
- `App.jsx`: Основной компонент  
- `Layout.jsx`: Обёртка с навигацией  
- `main.jsx`: Точка входа  

---

## 🚀 Функциональность

- **Redux Sync** — синхронное управление состоянием через Redux  
- **Redux Async** — асинхронные действия (например, через Redux Thunk)  
- **Zustand Sync** — простое управление состоянием с Zustand  
- **Zustand Async** — асинхронные вызовы и загрузка данных через Zustand  

---

## 🧰 Используемые технологии

- React 18+  
- React Router DOM  
- Redux Toolkit  
- Zustand  
- Material UI (MUI)  
- Ant Design (AntD)  
- CSS или Tailwind (по желанию)  
- Axios или Fetch (если есть работа с API)  

---


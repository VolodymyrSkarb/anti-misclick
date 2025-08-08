# 🛡️ Anti-misclick Toggle UI

> Tampermonkey-скрипт для захисту від випадкових кліків під час трейдингу на PocketOption.

## 🔍 Опис

Цей скрипт додає перемикач (кнопку) з SVG-іконкою, який дозволяє вмикати та вимикати режим захисту від випадкових кліків ("Anti-misclick mode") на сторінках:

- `https://pocketoption.com/uk/cabinet/demo-quick-high-low*`
- `https://pocketoption.com/uk/cabinet/quick-high-low*`

### 🔐 Що робить режим захисту?

Коли **Anti-misclick** активовано:

- Кнопки **Купити (Call)** та **Продати (Put)** працюють **лише якщо натиснуто клавішу `Ctrl`**.
- Біля кнопок з’являється позначка `+CTRL` як нагадування.
- Стан режиму зберігається у `localStorage`, тому зберігається після оновлення сторінки.

Коли **вимкнено** — кнопки працюють звичайним чином.

---

## 🧰 Встановлення

### 1. Встановити Tampermonkey

Tampermonkey — це менеджер користувацьких скриптів, який дозволяє запускати власні скрипти на обраних сайтах.

🔗 [Tampermonkey для Google Chrome](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)  
🔗 [Tampermonkey для Firefox](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/)

---

### 2. Імпорт скрипта з файлу (рекомендовано)

#### 2.1 Завантажити скрипт

1. Завантаж файл скрипта `Anti-misclick Toggle UI.js`.
2. Збережи його локально на комп'ютері.

#### 2.2 Імпорт у Tampermonkey

1. Відкрий **панель керування Tampermonkey** (натисни на іконку → "Dashboard").
2. Вгорі натисни **Utilities**.
3. У секції **Import from file** натисни кнопку **Choose File**.
4. Обери файл `Anti-misclick Toggle UI.js`, який ти щойно зберіг.
5. Після імпорту натисни **Install** або **Save**.

---

### ❗ Альтернатива: Ручне додавання скрипта

1. У Tampermonkey натисни **"Create a new script..."**.
2. Видали все, що згенерується за замовчуванням.
3. Встав код скрипта вручну.
4. Натисни **File → Save** або `Ctrl + S`.

---

### 3. Відкрити підтримувану сторінку

Перейдіть на одну з наступних сторінок:

- [Демо рахунок](https://pocketoption.com/uk/cabinet/demo-quick-high-low)
- [Реальний рахунок](https://pocketoption.com/uk/cabinet/quick-high-low)

---

## 💡 Як користуватись

1. У правому нижньому кутку з'явиться кнопка з іконкою щита.
2. Натисни її, щоб активувати або вимкнути **Anti-misclick mode**.
3. При активному режимі кнопки `Продати` і `Купити` потребуватимуть **утримання Ctrl** для підтвердження дії.

---

## 📦 Особливості

- ✅ Повністю локальний — **без використання зовнішніх CDN**.
- ✅ Зберігає стан у `localStorage`.
- ✅ Мінімалістичний інтерфейс з SVG-іконками.
- ✅ Працює тільки на цільових сторінках PocketOption.
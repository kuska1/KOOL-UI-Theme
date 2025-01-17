// Original code by NEVKO-UI

(function() {
  // JSON данные пользователей
  const userIconsData = [
    {
      "steamid": "76561198878285454",
      "customurl": "flowird",
      "badge": "dev",
      "description": "KOOL-UI DEV"
    },
  ];

  // Функция для логирования
  function log(message) {
    console.log(`[Steam User Icon] ${message}`);
  }

  // Добавляем стили в head
  const style = document.createElement('style');
  log('Styles added');

  // Функция для получения Steam ID или username из URL
  function getSteamIdentifierFromUrl() {
    const url = window.location.href;
    const match = url.match(/steamcommunity\.com\/(id|profiles)\/([^\/]+)/);

    if (match) {
      const [, type, identifier] = match;
      const value = decodeURIComponent(identifier.replace(/\/$/, ''));
      log(`Identifier found: ${type} - ${value}`);
      return { type, value };
    }

    log('No identifier found in URL');
    return null;
  }

  // Функция для поиска элемента имени пользователя
  function findUsernameElement() {
    const elements = document.querySelectorAll('.actual_persona_name');
    for (const element of elements) {
      if (element.offsetParent !== null) {
        log('Username element found');
        return element;
      }
    }
    log('Username element not found');
    return null;
  }

  // Функция для добавления иконки пользователю
  function addIconToUser(observer) {
    const identifier = getSteamIdentifierFromUrl();
    if (!identifier) {
      log('Could not get Steam identifier from URL');
      return;
    }

    log('Searching for user icon');
    const userIcon = userIconsData.find(user =>
      user.steamid === identifier.value || user.customurl === identifier.value
    );

    if (userIcon) {
      log('User icon found');
      const userNameElement = findUsernameElement();
      if (userNameElement) {
        if (!userNameElement.querySelector('.user-icon')) {
          const iconSpan = document.createElement('span');
          iconSpan.className = 'user-icon';
          if (userIcon.badge == "dev") {
            iconSpan.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256"><path fill="#fff" d="M245.83 121.63a15.53 15.53 0 0 0-9.52-7.33a73.6 73.6 0 0 0-22.17-2.22c4-19.85 1-35.55-2-44.86a16.17 16.17 0 0 0-18.8-10.88a85.5 85.5 0 0 0-28.55 12.12a94.6 94.6 0 0 0-27.11-33.25a16.05 16.05 0 0 0-19.26 0a94.6 94.6 0 0 0-27.16 33.25a85.5 85.5 0 0 0-28.55-12.12a16.14 16.14 0 0 0-18.79 10.88c-3 9.31-6 25-2.06 44.86a73.6 73.6 0 0 0-22.17 2.22a15.53 15.53 0 0 0-9.52 7.33a16 16 0 0 0-1.6 12.26c3.39 12.58 13.8 36.49 45.33 55.33S113.13 208 128.05 208s42.67 0 74-18.78c31.53-18.84 41.94-42.75 45.33-55.33a16 16 0 0 0-1.55-12.26M62.1 175.49C35.47 159.57 26.82 140.05 24 129.7a59.6 59.6 0 0 1 22.5-1.17a129 129 0 0 0 9.15 19.41a142.3 142.3 0 0 0 34 39.56a115 115 0 0 1-27.55-12.01M128 190.4c-9.33-6.94-32-28.23-32-71.23C96 76.7 118.38 55.24 128 48c9.62 7.26 32 28.72 32 71.19c0 42.98-22.67 64.27-32 71.21m104-60.68c-2.77 10.24-11.4 29.81-38.09 45.77a115 115 0 0 1-27.55 12a142.3 142.3 0 0 0 34-39.56a129 129 0 0 0 9.15-19.41a59.7 59.7 0 0 1 22.49 1.19Z" /></svg>`;
          }

          const tooltip = document.createElement('span');
          tooltip.className = 'icon-tooltip';
          tooltip.textContent = userIcon.description;

          iconSpan.appendChild(tooltip);
          userNameElement.appendChild(iconSpan);
          userNameElement.classList.add('has-icon');
          log('Icon and tooltip added');

          // Отключение MutationObserver после добавления иконки
          if (observer) {
            observer.disconnect();
            log('MutationObserver disconnected');
          }
        } else {
          log('Icon already added');
        }
      } else {
        log('Username element not found for adding icon');
      }
    } else {
      log('No icon found for this user');
      if (observer) {
        observer.disconnect();
        log('MutationObserver disconnected');
      }
    }
  }

  // Функция инициализации
  function init() {
    log('Initializing script');

    // Создаём MutationObserver
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.addedNodes.length > 0) {
          log('DOM mutation detected, trying to add icon');
          addIconToUser(observer);
        }
      }
    });

    // Начинаем наблюдение за изменениями в DOM
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
    log('MutationObserver started');

    // Попытка добавить иконку сразу
    addIconToUser(observer);
  }

  // Запускаем скрипт при загрузке страницы
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
    log('Added DOMContentLoaded event listener');
  } else {
    init();
    log('Initialized immediately');
  }
})();

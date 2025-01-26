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
            iconSpan.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M6.25 3A3.25 3.25 0 0 0 3 6.25v11.5A3.25 3.25 0 0 0 6.25 21h4.794c.092-.482.323-.942.696-1.314l.186-.186H6.25a1.75 1.75 0 0 1-1.75-1.75V8.5h15v2.532q.258.03.512.085c.47.102.814.412.988.791V6.25A3.25 3.25 0 0 0 17.75 3zm9.744 8.933L14.28 10.22a.75.75 0 1 0-1.06 1.06l1.691 1.692a5.1 5.1 0 0 1 1.083-1.04m-5.214-.653a.75.75 0 1 0-1.06-1.06l-3 3a.75.75 0 0 0 0 1.06l3 3a.75.75 0 1 0 1.06-1.06l-2.47-2.47zm9.019.814c.353.077.44.507.185.762l-1.905 1.904a1.527 1.527 0 0 0 2.16 2.16l1.905-1.904c.255-.255.685-.168.762.185a4.075 4.075 0 0 1-5.57 4.622l-2.729 2.73a1.527 1.527 0 0 1-2.16-2.16l2.73-2.73a4.074 4.074 0 0 1 4.622-5.57" /></svg>`;
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

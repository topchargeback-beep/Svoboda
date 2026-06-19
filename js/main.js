/* ============================================================
   #БольшеСвободы — Школа предпринимательства
   Навигация, анимации появления, отправка форм.
   ============================================================ */

(function () {
  "use strict";

  /* ---------- Единая карта ссылок сайта ----------
     Все соцсети и контакты в одном месте. Любой элемент с
     атрибутом data-link="<ключ>" получит правильный href,
     а внешние ссылки — target/rel/aria-label автоматически. */

  var SITE_LINKS = {
    telegram: "https://t.me/insarvv",
    youtube: "https://youtube.com/@insarvv?si=BdbhREGSnbVIb4fU",
    vk: "https://vk.com/bolshe__deneg",
    instagram: "https://www.instagram.com/vvinsar?igsh=NjdnZmdyaWVhaTMz&utm_source=qr",
    podcasts: "https://insarvv.mave.digital",
    max: "https://max.ru/u/f9LHodD0cOLXlqqMMV2QEksQl3IrJzbLzjym4IakASSlugYFsClU-83fF_k",
    email: "mailto:bolshedeneg1@mail.ru",
    phone: "tel:+79673759955"
  };

  var LINK_LABELS = {
    telegram: "Telegram-канал #БольшеСвободы",
    youtube: "YouTube-канал #БольшеСвободы",
    vk: "Сообщество ВКонтакте #БольшеСвободы",
    instagram: "Instagram #БольшеСвободы",
    podcasts: "Подкасты #БольшеСвободы",
    max: "Написать в мессенджере MAX",
    email: "Написать на почту",
    phone: "Позвонить в школу"
  };

  document.querySelectorAll("[data-link]").forEach(function (el) {
    var key = el.getAttribute("data-link");
    var url = SITE_LINKS[key];
    if (!url) return;
    el.setAttribute("href", url);
    if (/^https?:/.test(url)) {
      el.setAttribute("target", "_blank");
      el.setAttribute("rel", "noopener noreferrer");
    }
    if (!el.getAttribute("aria-label") && LINK_LABELS[key]) {
      el.setAttribute("aria-label", LINK_LABELS[key]);
    }
  });

  /* ---------- Шапка: тень при скролле ---------- */

  var header = document.querySelector(".site-header");

  function onScroll() {
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Мобильное меню ---------- */

  var navToggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".site-nav");

  if (navToggle && nav) {
    navToggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("is-open");
      navToggle.classList.toggle("is-open", isOpen);
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        nav.classList.remove("is-open");
        navToggle.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---------- Подсветка активного пункта меню ---------- */

  var current = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".site-nav a").forEach(function (link) {
    var href = link.getAttribute("href");
    if (href === current) {
      link.classList.add("is-active");
    }
  });

  /* ---------- Плавное появление блоков ---------- */

  var revealEls = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  /* ---------- Необязательные изображения ----------
     Картинки с атрибутом data-optional скрываются, пока файл
     не загружен в assets — вместо них виден фолбэк (инициалы). */

  document.querySelectorAll("img[data-optional]").forEach(function (img) {
    img.addEventListener("error", function () {
      img.remove();
    });
    if (img.complete && img.naturalWidth === 0) {
      img.remove();
    }
  });

  /* ---------- Видеоотзывы ----------
     Вставьте ссылки на видеоотзывы с сайта Большеденег / YouTube.
     Подходит любой формат: полная ссылка youtube.com/watch?v=...,
     youtu.be/..., shorts или просто ID видео.

     После заполнения:
     - в блоке «Отзывы предпринимателей» появится встроенный плеер;
     - в карточках кейсов появится кнопка «Смотреть видеоотзыв». */

  var VIDEO_LINKS = {
    "ramil": "https://kinescope.io/xn5nxG7fsFnEXniksaV3mo",        // Рамиль Шияпов / Сервер-сталь
    "kst": "https://kinescope.io/iZ2kjooYEb83XsHJSptXtV",          // СК КСТ
    "sem-pokoleniy": "",                                           // Семь Поколений
    "grata": "https://kinescope.io/56YW1zVTn8mzDKfBM7entk",        // СК Грата
    "drugoe-delo": "",                                             // Патентное бюро «Другое дело»
    "katkov": "https://kinescope.io/gRvmt1jnxTAa1u8sLbMKZ3",       // Катков
    "damir": "https://kinescope.io/hgYCHJd4UUsMYwD7V8zYZQ",        // Дамир
    "gaptrahimov": "https://kinescope.io/9JoVpR73GnzDrKCPkR7dj3",  // Гаптрахимов
    "upakovka": "https://kinescope.io/sxpNcanPKik839BJ2CXGH1",     // Упаковка (инструменты)
    "aleksey": "https://kinescope.io/jWR5anw1e7ERdV7zuJB26a",      // Алексей
    "aynur": "https://kinescope.io/e4g5LvNQQzpXmRXRd5S4Pp"         // Айнур
  };

  function youtubeId(url) {
    if (!url) {
      return null;
    }
    if (/^[\w-]{11}$/.test(url)) {
      return url;
    }
    var match = url.match(/(?:youtu\.be\/|v=|shorts\/|embed\/)([\w-]{11})/);
    return match ? match[1] : null;
  }

  // Превращает ссылку (YouTube или Kinescope) в адрес для встраивания
  function videoEmbedSrc(url) {
    var yt = youtubeId(url);
    if (yt) {
      return "https://www.youtube-nocookie.com/embed/" + yt;
    }
    var kin = url && url.match(/kinescope\.io\/(?:embed\/)?([\w-]{10,})/);
    if (kin) {
      return "https://kinescope.io/embed/" + kin[1];
    }
    return null;
  }

  // Кнопки-ссылки «Смотреть видеоотзыв» в кейсах
  document.querySelectorAll("a[data-video]").forEach(function (el) {
    var url = VIDEO_LINKS[el.getAttribute("data-video")];
    if (url) {
      el.setAttribute("href", url);
      el.setAttribute("target", "_blank");
      el.setAttribute("rel", "noopener");
      el.hidden = false;
    }
  });

  // Встроенные плееры в блоке «Отзывы предпринимателей»
  document.querySelectorAll(".video-slot[data-video]").forEach(function (slot) {
    var url = VIDEO_LINKS[slot.getAttribute("data-video")];
    var src = videoEmbedSrc(url);
    if (src) {
      var iframe = document.createElement("iframe");
      iframe.src = src;
      iframe.loading = "lazy";
      iframe.title = "Видеоотзыв предпринимателя";
      iframe.setAttribute(
        "allow",
        "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
      );
      iframe.setAttribute("allowfullscreen", "");
      slot.appendChild(iframe);
      slot.hidden = false;
    } else if (url) {
      // Сервис без поддержки встраивания — показываем ссылкой
      var link = document.createElement("a");
      link.className = "case-video";
      link.href = url;
      link.target = "_blank";
      link.rel = "noopener";
      link.textContent = "Смотреть видеоотзыв";
      slot.parentNode.insertBefore(link, slot);
    }
  });

  /* ---------- Плавное появление цифр ---------- */

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function animateMetric(el) {
    var match = el.textContent.trim().match(/^(×?)(\d+(?:,\d+)?)(\+?)$/);
    if (!match || reduceMotion) {
      return;
    }
    var prefix = match[1];
    var suffix = match[3];
    var target = parseFloat(match[2].replace(",", "."));
    var decimals = match[2].indexOf(",") !== -1 ? 1 : 0;
    var from = prefix === "×" ? 1 : 0;
    var duration = 1100;
    var startTime = null;

    function frame(now) {
      if (startTime === null) {
        startTime = now;
      }
      var progress = Math.min((now - startTime) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      var value = from + (target - from) * eased;
      el.textContent = prefix + value.toFixed(decimals).replace(".", ",") + suffix;
      if (progress < 1) {
        requestAnimationFrame(frame);
      }
    }

    requestAnimationFrame(frame);
  }

  var metricEls = document.querySelectorAll(".metric-value, .result-value");

  if ("IntersectionObserver" in window && metricEls.length) {
    var metricObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateMetric(entry.target);
            metricObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    metricEls.forEach(function (el) {
      metricObserver.observe(el);
    });
  }

  /* ============================================================
     Формы заявок.

     Интеграция пока не подключена — заявка логируется и
     показывается экран успеха. Чтобы подключить отправку,
     заполните FORM_CONFIG ниже. Поддерживаются два варианта:

     1) Telegram-бот:
        telegramBotToken — токен бота от @BotFather;
        telegramChatId   — id чата или канала для заявок.

     2) Произвольный webhook (CRM, email-сервис, n8n, Make и т.п.):
        webhookUrl — заявка уйдёт POST-запросом в формате JSON.

     Если заполнены оба, отправка идёт в оба канала.
     ============================================================ */

  var FORM_CONFIG = {
    // TODO: вставить данные после выбора сервиса приёма заявок.
    // Вариант 1 — Telegram-бот (токен @BotFather + id чата):
    telegramBotToken: "",
    telegramChatId: "",
    // Вариант 2 — произвольный webhook (CRM, Formspree, Getform, n8n, Make):
    webhookUrl: ""
  };

  function isFormConfigured() {
    return (
      (FORM_CONFIG.telegramBotToken && FORM_CONFIG.telegramChatId) ||
      !!FORM_CONFIG.webhookUrl
    );
  }

  function collectFormData(form) {
    var data = {};
    new FormData(form).forEach(function (value, key) {
      data[key] = value;
    });
    data.page = location.href;
    data.date = new Date().toISOString();
    return data;
  }

  /* Текст для мессенджера, когда обработчик ещё не подключён. */
  function buildMessengerText(data) {
    return (
      "Здравствуйте! Хочу пройти входную диагностику предпринимателя и бизнеса в #БольшеСвободы.\n\n" +
      "Меня зовут: " + (data["Имя"] || "") + "\n" +
      "Бизнес / ниша: " + (data["Сфера бизнеса"] || data["Ниша"] || "") + "\n" +
      "Что хочу разобрать: " + (data["Сообщение"] || data["Комментарий"] || data["Запрос"] || "") + "\n" +
      "Удобный способ связи: " + (data["Телефон"] || data["Telegram"] || "")
    );
  }

  var MSG_LINKS = {
    telegram: "https://t.me/insarvv",
    max: "https://max.ru/u/f9LHodD0cOLXlqqMMV2QEksQl3IrJzbLzjym4IakASSlugYFsClU-83fF_k"
  };

  /* Честный fallback: обработчик не подключён — не имитируем отправку,
     а готовим текст и предлагаем отправить его в мессенджере. */
  function showMessengerFallback(form, data) {
    var panel = document.querySelector('.form-fallback[data-for="' + form.id + '"]');
    if (!panel) {
      panel = document.createElement("div");
      panel.className = "form-fallback";
      panel.setAttribute("data-for", form.id);
      form.parentNode.insertBefore(panel, form.nextSibling);
    }
    var text = buildMessengerText(data);
    panel.innerHTML =
      '<h3 class="h3">Остался один шаг</h3>' +
      '<p class="text-muted">Чтобы отправить заявку, напишите нам в мессенджере — мы уже подготовили текст. Откройте Telegram или MAX и отправьте сообщение.</p>' +
      '<textarea class="form-fallback-text" readonly rows="6"></textarea>' +
      '<div class="btn-row">' +
      '<a class="btn btn--primary" target="_blank" rel="noopener noreferrer" href="' + MSG_LINKS.telegram + '">Открыть Telegram</a>' +
      '<a class="btn btn--ghost" target="_blank" rel="noopener noreferrer" href="' + MSG_LINKS.max + '">Открыть MAX</a>' +
      "</div>";
    panel.querySelector(".form-fallback-text").value = text;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).catch(function () {});
    }
    form.classList.add("is-hidden");
    panel.classList.add("is-visible");
  }

  function sendToTelegram(data) {
    var lines = ["Новая заявка с сайта #БольшеСвободы:", ""];
    Object.keys(data).forEach(function (key) {
      lines.push(key + ": " + data[key]);
    });
    return fetch(
      "https://api.telegram.org/bot" + FORM_CONFIG.telegramBotToken + "/sendMessage",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: FORM_CONFIG.telegramChatId,
          text: lines.join("\n")
        })
      }
    );
  }

  function sendToWebhook(data) {
    return fetch(FORM_CONFIG.webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
  }

  function submitLead(data) {
    var tasks = [];
    if (FORM_CONFIG.telegramBotToken && FORM_CONFIG.telegramChatId) {
      tasks.push(sendToTelegram(data));
    }
    if (FORM_CONFIG.webhookUrl) {
      tasks.push(sendToWebhook(data));
    }
    if (tasks.length === 0) {
      // Заглушка: интеграция не настроена, заявка попадает в консоль.
      console.info("Заявка (интеграция не подключена):", data);
      return Promise.resolve();
    }
    return Promise.all(tasks);
  }

  document.querySelectorAll("form[data-lead-form]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      // Базовая валидация: имя и контакт обязательны.
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      var data = collectFormData(form);

      // Обработчик не подключён — честный fallback через мессенджер,
      // без имитации успешной отправки.
      if (!isFormConfigured()) {
        showMessengerFallback(form, data);
        return;
      }

      var button = form.querySelector('button[type="submit"]');
      var defaultLabel = button.textContent;
      button.disabled = true;
      button.textContent = "Отправляем…";

      submitLead(data)
        .then(function () {
          var success = document.querySelector(
            '.form-success[data-for="' + form.id + '"]'
          );
          if (success) {
            form.classList.add("is-hidden");
            success.classList.add("is-visible");
          }
          form.reset();
        })
        .catch(function () {
          showMessengerFallback(form, data);
        })
        .finally(function () {
          button.disabled = false;
          button.textContent = defaultLabel;
        });
    });
  });
})();

/* Табы «Какие навыки тренирует предприниматель» */
(function () {
  document.querySelectorAll("[data-tabs]").forEach(function (group) {
    var btns = group.querySelectorAll(".tab-btn");
    var panels = group.querySelectorAll(".tab-panel");
    btns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var t = btn.getAttribute("data-tab");
        btns.forEach(function (b) { b.classList.toggle("is-active", b === btn); });
        panels.forEach(function (p) { p.classList.toggle("is-active", p.getAttribute("data-panel") === t); });
      });
    });
  });
})();

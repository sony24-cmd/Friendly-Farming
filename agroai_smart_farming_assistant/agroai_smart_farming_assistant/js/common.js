(function () {
  "use strict";

  var LANGUAGE_KEY = "agroai_language";
  var SUPPORTED_LANGUAGES = ["en", "hi", "te"];
  var LANGUAGE_META = {
    en: { locale: "en-IN", speech: "en-IN" },
    hi: { locale: "hi-IN", speech: "hi-IN" },
    te: { locale: "te-IN", speech: "te-IN" }
  };
  var BRAND_NAME = "Farmers Friendly Agriculture";
  var BRAND_ALIASES_REGEX = /AgroAI|friendlyfarming|Farmers Friendly Agriculture/g;
  var PHRASE_FALLBACK = {
    hi: {},
    te: {}
  };

  function getStoredLanguage() {
    try {
      return localStorage.getItem(LANGUAGE_KEY);
    } catch (error) {
      return null;
    }
  }

  function setStoredLanguage(language) {
    try {
      localStorage.setItem(LANGUAGE_KEY, language);
    } catch (error) {
      /* no-op when storage is unavailable */
    }
  }

  function resolveLanguage(language) {
    var candidate = String(language || "").toLowerCase();
    return SUPPORTED_LANGUAGES.indexOf(candidate) >= 0 ? candidate : "en";
  }

  function setDocumentLanguage(language) {
    var normalized = resolveLanguage(language);
    document.documentElement.setAttribute("lang", normalized);
    return normalized;
  }

  function ensureToastStack() {
    var existing = document.getElementById("toastStack");
    if (existing) {
      return existing;
    }

    var stack = document.createElement("div");
    stack.id = "toastStack";
    stack.className = "toast-stack";
    document.body.appendChild(stack);
    return stack;
  }

  function getLocale(language) {
    var lang = resolveLanguage(language || getStoredLanguage() || "en");
    return LANGUAGE_META[lang].locale;
  }

  function getSpeechLanguage(language) {
    var lang = resolveLanguage(language || getStoredLanguage() || "en");
    return LANGUAGE_META[lang].speech;
  }

  function formatDate(dateLike, language) {
    var date = dateLike ? new Date(dateLike) : new Date();
    if (Number.isNaN(date.getTime())) {
      date = new Date();
    }

    return date.toLocaleString(getLocale(language), {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true
    });
  }

  function setupLanguage(selectorId, onChange) {
    var id = selectorId || "languageSelector";
    var selector = document.getElementById(id);

    if (!selector) {
      var storedOnly = resolveLanguage(getStoredLanguage() || "en");
      setDocumentLanguage(storedOnly);
      applyPhraseFallback(storedOnly);
      if (typeof onChange === "function") {
        onChange(storedOnly);
      }
      applyPhraseFallback(storedOnly);
      return storedOnly;
    }

    var fallback = resolveLanguage(selector.value || "en");
    var saved = resolveLanguage(getStoredLanguage() || fallback);
    selector.value = saved;
    setDocumentLanguage(saved);
    applyPhraseFallback(saved);

    if (typeof onChange === "function") {
      onChange(saved);
    }
    applyPhraseFallback(saved);

    selector.addEventListener("change", function (event) {
      var lang = resolveLanguage(event.target.value);
      setStoredLanguage(lang);
      setDocumentLanguage(lang);
      applyPhraseFallback(lang);

      if (typeof onChange === "function") {
        onChange(lang);
      }
      applyPhraseFallback(lang);
    });

    return saved;
  }

  function toast(message, type, timeout) {
    var stack = ensureToastStack();
    var item = document.createElement("div");
    item.className = "toast " + (type || "info");
    item.textContent = message;
    stack.appendChild(item);

    window.setTimeout(function () {
      item.remove();
    }, timeout || 2200);
  }

  function saveJSON(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      /* no-op when storage is unavailable */
    }
  }

  function loadJSON(key, fallback) {
    try {
      var raw = localStorage.getItem(key);
      if (!raw) {
        return fallback;
      }

      return JSON.parse(raw);
    } catch (error) {
      return fallback;
    }
  }

  function hash(input) {
    var text = String(input || "");
    var value = 0;

    for (var index = 0; index < text.length; index += 1) {
      value = (value << 5) - value + text.charCodeAt(index);
      value |= 0;
    }

    return Math.abs(value);
  }

  function deepRead(object, keyPath) {
    if (!object || !keyPath) {
      return undefined;
    }

    return String(keyPath).split(".").reduce(function (memo, part) {
      if (memo && Object.prototype.hasOwnProperty.call(memo, part)) {
        return memo[part];
      }
      return undefined;
    }, object);
  }

  function interpolate(template, variables) {
    if (typeof template !== "string") {
      return template;
    }

    return template.replace(/\{([a-zA-Z0-9_]+)\}/g, function (match, key) {
      if (!variables || typeof variables[key] === "undefined" || variables[key] === null) {
        return "";
      }
      return String(variables[key]);
    });
  }

  function normalizeBrandText(value) {
    if (typeof value !== "string") {
      return value;
    }
    return value.replace(BRAND_ALIASES_REGEX, BRAND_NAME);
  }

  function translate(translations, key, language, variables) {
    var lang = resolveLanguage(language || getStoredLanguage() || "en");
    var pack = translations || {};
    var value = deepRead(pack[lang], key);

    if (typeof value === "undefined") {
      value = deepRead(pack.en, key);
    }

    return interpolate(normalizeBrandText(value), variables);
  }

  function applyPhraseFallback(language) {
    var lang = resolveLanguage(language || getStoredLanguage() || "en");
    var dictionary = PHRASE_FALLBACK[lang] || {};

    document.querySelectorAll("a,button,label,span,p,li,h1,h2,h3,h4,th,td,option").forEach(function (element) {
      if (element.hasAttribute("data-i18n") || element.hasAttribute("data-i18n-html") || element.hasAttribute("data-i18n-value")) {
        return;
      }
      if (element.children.length > 0) {
        return;
      }

      if (!element.hasAttribute("data-base-text")) {
        element.setAttribute("data-base-text", element.textContent.trim());
      }

      var base = element.getAttribute("data-base-text") || "";
      if (!base) {
        return;
      }

      if (lang === "en") {
        element.textContent = normalizeBrandText(base);
        return;
      }

      if (Object.prototype.hasOwnProperty.call(dictionary, base)) {
        element.textContent = normalizeBrandText(dictionary[base]);
      }
    });

    document.querySelectorAll("input[placeholder],textarea[placeholder]").forEach(function (element) {
      if (element.hasAttribute("data-i18n-placeholder")) {
        return;
      }

      if (!element.hasAttribute("data-base-placeholder")) {
        element.setAttribute("data-base-placeholder", element.getAttribute("placeholder") || "");
      }

      var base = element.getAttribute("data-base-placeholder") || "";
      if (!base) {
        return;
      }

      if (lang === "en") {
        element.setAttribute("placeholder", normalizeBrandText(base));
        return;
      }

      if (Object.prototype.hasOwnProperty.call(dictionary, base)) {
        element.setAttribute("placeholder", normalizeBrandText(dictionary[base]));
      }
    });
  }

  function applyI18n(translations, language) {
    var lang = resolveLanguage(language || getStoredLanguage() || "en");
    setDocumentLanguage(lang);

    document.querySelectorAll("[data-i18n]").forEach(function (element) {
      var key = element.getAttribute("data-i18n");
      var value = translate(translations, key, lang);
      if (typeof value !== "undefined") {
        element.textContent = value;
      }
    });

    document.querySelectorAll("[data-i18n-html]").forEach(function (element) {
      var key = element.getAttribute("data-i18n-html");
      var value = translate(translations, key, lang);
      if (typeof value !== "undefined") {
        element.innerHTML = value;
      }
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach(function (element) {
      var key = element.getAttribute("data-i18n-placeholder");
      var value = translate(translations, key, lang);
      if (typeof value !== "undefined") {
        element.setAttribute("placeholder", value);
      }
    });

    document.querySelectorAll("[data-i18n-title]").forEach(function (element) {
      var key = element.getAttribute("data-i18n-title");
      var value = translate(translations, key, lang);
      if (typeof value !== "undefined") {
        element.setAttribute("title", value);
      }
    });

    document.querySelectorAll("[data-i18n-aria-label]").forEach(function (element) {
      var key = element.getAttribute("data-i18n-aria-label");
      var value = translate(translations, key, lang);
      if (typeof value !== "undefined") {
        element.setAttribute("aria-label", value);
      }
    });

    document.querySelectorAll("[data-i18n-value]").forEach(function (element) {
      var key = element.getAttribute("data-i18n-value");
      var value = translate(translations, key, lang);
      if (typeof value !== "undefined") {
        element.value = value;
      }
    });

    applyPhraseFallback(lang);

    return lang;
  }

  window.AgroAI = {
    setupLanguage: setupLanguage,
    getLanguage: function () {
      return resolveLanguage(getStoredLanguage() || "en");
    },
    setLanguage: function (language) {
      var lang = resolveLanguage(language);
      setStoredLanguage(lang);
      setDocumentLanguage(lang);
      return lang;
    },
    applyI18n: applyI18n,
    translate: translate,
    getLocale: getLocale,
    getSpeechLanguage: getSpeechLanguage,
    formatDate: formatDate,
    toast: toast,
    saveJSON: saveJSON,
    loadJSON: loadJSON,
    hash: hash
  };

  setDocumentLanguage(resolveLanguage(getStoredLanguage() || "en"));

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("[data-year]").forEach(function (element) {
      element.textContent = String(new Date().getFullYear());
    });

    document.querySelectorAll("[data-updated]").forEach(function (element) {
      element.textContent = formatDate();
    });
  });
})();



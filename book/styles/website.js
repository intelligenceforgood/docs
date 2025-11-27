(function initDocsEnhancements() {
  if (typeof document === "undefined") {
    return;
  }

  function ensureMobileWebAppCapable() {
    var metaName = "mobile-web-app-capable";
    var existing = document.querySelector('meta[name="' + metaName + '"]');
    if (!existing && document.head) {
      existing = document.createElement("meta");
      existing.setAttribute("name", metaName);
      existing.setAttribute("content", "yes");
      document.head.appendChild(existing);
    } else if (existing) {
      existing.setAttribute("content", "yes");
    }
  }

  function wrapWideTables() {
    var tables = document.querySelectorAll(".markdown-section table");
    tables.forEach(function (table) {
      if (table.dataset.scrollWrapped === "true") {
        return;
      }
      var wrapper = document.createElement("div");
      wrapper.className = "table-scroll-wrapper";
      var parent = table.parentNode;
      if (!parent) {
        return;
      }
      parent.insertBefore(wrapper, table);
      wrapper.appendChild(table);
      table.dataset.scrollWrapped = "true";
    });
  }

  function handleReady() {
    ensureMobileWebAppCapable();
    wrapWideTables();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", handleReady, { once: true });
  } else {
    handleReady();
  }

  if (typeof gitbook !== "undefined" && gitbook.events && gitbook.events.on) {
    gitbook.events.on("page.change", wrapWideTables);
  }
})();

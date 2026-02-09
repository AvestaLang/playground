import tippy from "tippy.js";

const elm_tippys = document.querySelectorAll("[tooltip]");

// Handle Tooltip show with [tooltip] attr
elm_tippys.forEach((elm) =>
  tippy(elm, {
    content: elm.getAttribute("tooltip"),
  }),
);

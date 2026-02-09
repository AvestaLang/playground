import "./tippy.js";

const elm_input = document.querySelector("#input");
const elm_output = document.querySelector("#output");

elm_input.addEventListener("input", (e) => {
  let text = e.target.innerText;

  runCode(text);
});

const runCode = async (code) => {
  const go = new Go();

  go.argv = ["core.wasm", code];

  const result = await WebAssembly.instantiateStreaming(
    fetch("/core.wasm"),
    go.importObject,
  );

  await go.run(result.instance);
};

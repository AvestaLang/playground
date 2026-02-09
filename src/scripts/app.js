import "./wasm_exec.js";
import "./tippy.js";

const elm_input = document.querySelector("#input");
const elm_output = document.querySelector("#output");

elm_input.addEventListener("input", (e) => {
  let text = e.target.innerText;

  runCode(text).then((r) => {
    elm_output.srcdoc = r;
    console.log(r);
  });
});

const runCode = async (code) => {
  const go = new Go();

  let log = "";

  const originalLog = console.log;
  console.log = (...args) => {
    log = args.join(" ");
  };

  const originalError = console.error;
  console.error = (...args) => {
    log = args.join(" ");
  };

  go.argv = ["core.wasm", code];

  const result = await WebAssembly.instantiateStreaming(
    fetch("/core.wasm"),
    go.importObject,
  );

  await go.run(result.instance);

  console.log = originalLog;
  console.error = originalError;

  return log;
};

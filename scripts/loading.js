const fs = require("fs");
const path = require("path");

function copyRendererHtmlFile() {
  const filepath = path.resolve(".", "src/loading.html");
  const content = fs.readFileSync(filepath);
  fs.writeFileSync(path.resolve(".", "src/application/loading.html"), content, {
    flag: "w+",
  });
}

function copyRendererJsFile() {
  const filepath = path.resolve(".", "src/renderer.js");
  const content = fs.readFileSync(filepath);
  fs.writeFileSync(
    path.resolve(".", "src/application/assets/renderer.js"),
    content,
    {
      flag: "w+",
    }
  );
}

function insertRendererFile() {
  const filepath = path.resolve(".", "src/application/index.html");
  const content = fs.readFileSync(filepath).toString();
  const strs = content.split("\n");
  let _strs = [];
  strs.forEach((str) => {
    _strs.push(str);
    if (str.includes('<div id="app"></div>')) {
      _strs.push('    <script src="./assets/renderer.js"></script>');
    }
  });
  fs.writeFileSync(filepath, _strs.join("\n"));
}

function main() {
  copyRendererHtmlFile();
  copyRendererJsFile();
  insertRendererFile();
}

main();

const assert = require('assert');
const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');

assert(html.includes('<a onclick="showView(\'script\')">Mirror</a>'), 'Top nav labels script view as Mirror');
assert(!html.includes('<a onclick="showView(\'script\')">Script</a>'), 'Top nav no longer labels script view as Script');
assert(html.includes('data-view="script" onclick="showView(\'script\')">Mirror</button>'), 'Mobile nav labels script view as Mirror');
assert(!html.includes('data-view="script" onclick="showView(\'script\')">Script</button>'), 'Mobile nav no longer labels script view as Script');
assert(html.includes('Mirror</a>\n    <span>/</span>\n    <a onclick="showView(\'progress\')">Progress</a>\n    <span>/</span>\n    <a onclick="showView(\'settings\')">Config</a>'), 'Top nav reads Mirror / Progress / Config');

console.log('Nav label static checks passed');

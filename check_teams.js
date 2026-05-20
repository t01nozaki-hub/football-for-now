const fs = require('fs');
const cacheDir = './.build_cache';
const files = fs.readdirSync(cacheDir);

const ids = [525, 522, 576, 1045, 543, 2, 11, 511, 15, 10];

ids.forEach(id => {
  const file = `team_${id}.json`;
  if (files.includes(file)) {
    const data = JSON.parse(fs.readFileSync(`${cacheDir}/${file}`));
    console.log(`ID ${id}: ${data.name}`);
  } else {
    console.log(`ID ${id}: Not in cache`);
  }
});

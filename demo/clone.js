let fs = require('fs');

let result = [];
let count = 300;

while (count > 0) {
    fs.writeFileSync(
        'src/modules/module-' + count + '.js',
        `export default {name: "module${count}"};`
    );
    result.push(`import obj${count} from "modules/module-${count}";`);
    count--;
}

// result.push('import steal from "@steal";');
// result.push('steal.done().then(() => console.timeEnd("steal"));');

fs.writeFile(
    'src/app.js',
    result.join('\n'),
    (err) => console.log('done')
);

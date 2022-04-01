var fs = require('fs');

const embed = fs.readFileSync('./build/embed.js');
const template = fs.readFileSync('./embedTemplate.txt');

const output = `${template}
<script>
  ${embed}
</script>`;

fs.writeFileSync('./build/embed.txt', output);
fs.unlinkSync('./build/embed.js');

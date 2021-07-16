const https = require('https');

//let username = 'mitocode21';
let username = 'fabiangothman';

//http://www.useragentstring.com/pages/useragentstring.php
let CHROME_EXAMPLE_USER_AGENT = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2866.71 Safari/537.36';
let FIREFOX_EXAMPLE_USER_AGENT = 'Mozilla/5.0 (Windows; U; Windows NT 9.1; en-US; rv:12.9.1.11) Gecko/20100821 Firefox/70';
let IE_EXAMPLE_USER_AGENT = 'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; WOW64; Trident/5.0; SLCC2; Media Center PC 6.0; InfoPath.3; MS-RTC LM 8; Zune 4.7';

let options = {
    host: 'api.github.com',
    path: '/users/'+username,
    method: 'GET',
    headers: {'user-agent': CHROME_EXAMPLE_USER_AGENT}  //Tiene que pasarse, porque no estamos haciendo el request en el navegador
}

let request = https.request(options, (response) => {
    //Mientras recolecta la data
    let body = '';
    response.on('data', (out) => {
        body += out;
        console.log(`Recolectando: ${out}`);
    });

    //Cuando termina de evaluar la data
    response.on('end', (out) => {
        let json = JSON.parse(body);
        console.log(json);
        console.log(json.blog);
    });
});

request.on('error', (e) => {
    console.log(e);
});

request.end();
const http = require('http');
const fs = require('fs');
//const public = require('./public')

const PORT = process.env.PORT || 3000;

const server = http.createServer((request, response) => {
  const uri = request.url;
  const reqMeth = request.method;
console.log(uri)
  function reqResp(uri, type) {
    fs.readFile(`./public${uri}.html`, (err, data) => {
      if (err) throw 'error';
      response.setHeader('Content-Type', `text/${type}`)
      response.writeHead('200', 'OK')
      response.write(data)
      response.end();
    })
  }

  switch (uri) {
    case '/hydrogen':
    case '/hydrogen.html':
      reqResp(uri,'html')
      break;
    case '/helium':
    case '/helium.html':
      reqResp(uri,'html')
      break;
    case '/':
    case '/index.html':
    case '/index':
      reqResp(uri,'html')
      break;
    case '/css/styles.css':
    reqResp(uri,'css')  
    break;
    default:
      fs.readFile('./public/error.html', (err, data) => {
        if (err) throw 'error';
        response.setHeader('Content-Type', '[text/html, utf8]')
        response.write(404, 'ERROR')
        response.write(data)
        response.end();
      })
      break;
  }
  // const clientRequest = http.ClientRequest((request, response) => {
  // response.setHeader(name, value),
  // response.
  // })
})

server.listen(PORT, () => {
  console.log(`Server is listening in on ${PORT}.`)
});




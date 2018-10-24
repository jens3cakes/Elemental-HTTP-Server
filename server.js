const http = require('http');
const fs = require('fs');
//const public = require('./public')

const PORT = process.env.PORT || 3000;

const server = http.createServer((request, response) => {
  const uri = request.url;
  const reqMeth = request.method;
  function reqHtmlResp(uri) {
    fs.readFile(`./public${uri}.html`, (err, data) => {
      if (err) throw err;
      response.setHeader('Content-Type', 'text/html')
      response.writeHead('200', 'OK')
      response.write(data)
      response.end();
    })
  }

  switch (uri) {
    case '/hydrogen':
    case '/hydrogen.html':
reqHtmlResp(uri)
      break;







    //   if (err){console.log("error");
    // }response.setHeader('Content-Type', `text/${contentType}`);
    //   //response.setHeader('Content-Length', data.length);
    //   response.writeHead(statusCode, statusStr)
    //   response.write(data)
    //   response.end();
    // })
    // };

    // fs.readFile('public/hydrogen.html', (err, data) => {
    //   if (err) throw 'error';
    //   response.setHeader('Content-Type', '[text/html, utf8]')
    //   response.writeHead(200, 'OK')
    //   response.write(data)
    //   response.end()
    // })
    // 
    //reqResponse(`public${uri}`,'html',200,'OK')
    case '/helium':
    case '/helium.html':
      fs.readFile('public/helium.html', (err, data) => {
        if (err) throw 'error';
        response.setHeader('Content-Type', '[text/html, utf8]')
        response.writeHead(200, 'OK')
        response.write(data)
        response.end();
      })
      break;
    case '/':
    case '/index.html':
    case '/index':
      fs.readFile('public/index.html', (err, data) => {
        if (err) throw 'error';
        reqResponse(data)
        response.setHeader('Content-Type', '[text/html, utf8]')
        response.writeHead(200, 'OK')
        response.write(data)
        response.end();
      })
      break;
    case '/css/styles.css':
      fs.readFile('public/css/styles.css', (err, data) => {
        if (err) throw 'error';
        response.setHeader('Content-Type', '[text/css, utf8]')
        response.writeHead(200, 'OK')
        response.write(data)
        response.end();
      })
      break;
    default:
      fs.readFile('public/error.html', (err, data) => {
        if (err) throw 'error'
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




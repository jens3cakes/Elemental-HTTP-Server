const http = require('http');
const fs = require('fs');
const qs = require('querystring');

const PORT = process.env.PORT || 3001;

function reqResp(uri, res) {
  fs.readFile(`./public${uri}`, (err, data) => {
    if (err) {
      fs.readFile('./public/error.html', (err, data) => {
        if (err) throw 'error';
        res.setHeader('Content-Type', '[text/html, utf8]');
        res.writeHead(404, 'ERROR');
        res.write(data);
        res.end();
      }
      )
    } else {
      res.setHeader('Content-Type', contType(uri));
      res.writeHead('200', 'OK');
      res.write(data);
      res.end();
    }
  })
}
function contType(uri) {
  const type = uri.split('.');
  return 'text/' + type[type.length - 1];
};

function postHandler(request,res,uri) {
  request.on('data', (chunk) => {
    const bodyDataObj = qs.parse(chunk.toString());
    const elemName = bodyDataObj.elementName;
    const elemSym = bodyDataObj.elementSymbol;
    const elemAtomNum = bodyDataObj.elementAtomicNumber;
    const elemDesc = bodyDataObj.elementDescription;
    const dataStr = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>The Elements - ${elemName}</title><link rel="stylesheet" href="/css/styles.css"></head><body><h1>${elemName}</h1><h2>${elemSym}</h2><h3>Atomic number ${elemAtomNum}</h3><p>${elemDesc}</p><p><a href="/">back</a></p></body></html>`
    
    fs.writeFile(`./public/${elemName}.html`, dataStr, (err) => {
      if (err) throw 'err';
      res.setHeader('Content-Type', contType(uri));
      res.writeHead('200', 'OK');
      res.end();
    });
  })
};

const server = http.createServer((request, response) => {
  const uri = request.url;
  const reqMeth = request.method;
  const res = response;
  
  switch (reqMeth) {
    case 'GET':
    reqResp(uri, res);
    break;
    case 'POST':
    postHandler(request,response,uri);
      break;
    default:
      break;
  }
})

server.listen(PORT, () => {
  console.log(`Listening in on ${PORT}` )
});


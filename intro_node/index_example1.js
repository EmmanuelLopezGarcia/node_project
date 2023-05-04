// 1- Importando el modulo de Node
// http

import http from 'http';

// Biblioteca path

import path from 'path';

// Recreando Built-in variables

global["__dirname"] = path.dirname(new URL(import.meta.url).pathname);
global["__filename"] = path.join(__dirname, path.basename(new URL(import.meta.url).pathname));

// 2- Crear el servidor
//
const server = http.createServer((req, response)=>{

    // Logica del servidor

    // 1- Respondiendo al cliente
    
    // Creando un logger de peticiones
    
    console.log(`CLIENT-REQUEST: ${req.method} ${req.url}`);

    // MIME TYPES --> INVESTIGATE THEM
    // txt this time
    response.setHeader('Content-Type', 'text/html');
    
    
    response.write("<html>");
    response.write("<head>");
    response.write("<title>My App</title>");
    response.write("</head>");
    response.write("<body>");

    response.write("<h1>Hello from my server .. </h1>")

    response.write("</body>");
    response.write("</html>");
    
    console.log(`Contestando recurso ${req.method} ${req.url}`);
    
    
    //response.write(`
    //    __dirname: ${__dirname}
    //    __filename: ${__filename}
    //`);

    //console.log(req);

    // 2. Cerrar al cliente

    response.end();

});

// 3. Arrancar el servidor

server.listen(3000, "0.0.0.0", ()=>{

    console.log("Servidor escuchando en http://localhost:3000");

    
});
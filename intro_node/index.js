import http from "http";
// Importaciones para acceder al directorio de archivos actual
import path from "path";
import { promises as fs} from 'fs';
import { URLSearchParams } from "url";

// Se declara la variable global "__dirname"
global["__dirname"] = path.dirname(new URL(import.meta.url).pathname);


// La funcion se declara asyncrona
const server = http.createServer( async (req, res) => {
  // Desestructurando de "req"
  let { url, method } = req;

  console.log(`📣 CLIENT-REQUEST: ${req.url} ${req.method}`);

  // Enrutando peticiones
  switch (url) {
    case '/':
      // Peticion raiz
      // Estableciendo cabeceras
      res.setHeader('Content-Type', 'text/html');
      // Escribiendo la respuesta
      res.write(`
        <html>
        <head>
          <link rel="icon" type="image/x-icon" sizes="32x32" href="/favicon.ico">
          <title>My App</title>
          <style>
            body {
              background-color: #ECF0F1;
              font-family: Arial, sans-serif;
            }
            h1, h2 {
              color: #3498DB;
              text-align: center;
              margin-top: 50px;
            }
            form {
              margin-top: 30px;
              text-align: center;
            }
            input[type="text"] {
              width: 300px;
              padding: 10px;
              border: none;
              border-radius: 5px;
              box-shadow: 0px 0px 5px #3498DB;
              outline: none;
            }
            button[type="submit"] {
              background-color: #3498DB;
              color: #fff;
              border: none;
              border-radius: 5px;
              padding: 10px 20px;
              cursor: pointer;
              box-shadow: 0px 0px 5px #3498DB;
              outline: none;
            }
            button[type="submit"]:hover {
              background-color: #2980B9;
            }
          </style>
        </head>
        <body> 
          <h1>Hello from my server</h1>
          <h2>Ingresa un mensaje</h2>
          <div>
            <form action="/message" method="POST">
              <input type="text" name="message">
              <button type="submit">Send</button>
            </form>
          </div>
        </body>
        </html>
      `);
      console.log(`📣 Respondiendo: 200 ${req.url} ${req.method}`);
      // Estableciendo codigo de respuesta
      res.statusCode = 200;
      // Cerrando la comunicacion
      res.end();
      break;

    // ACTIVIDAD ENRUTADO

    case '/author':

    // Peticion autor
    // Estableciendo cabeceras
    res.setHeader('Content-Type', 'text/html');
    // Escribiendo la respuesta
    res.write(`
    <html>
        <head>
          <link rel="icon" type="image/x-icon" sizes="32x32" href="/favicon.ico">
          <title>My App</title>
        </head>
        <body> 
          <center>
          <h1 style="color: #386">Informacion del autor</h1>
          <p style="color: #34495E">Alumno: Lopez Garcia Emmanuel</p>
          <p style="color: #34495E">Num. Control: 191130283</p>
          <p style="color: #34495E">Carrera: Ingenieria en TIC's</p>
          <p style="color: #34495E">Materia: Desarrollo web en pila completa</p>
          <p style="color: #34495E">Profesor: Rivalcoba Rivas Jorge Ivan</p>
          <p style="color: #34495E">Grupo: 8TA</p>
          </center>
        </body>
      </html>`
    );

    console.log(`📣 Respondiendo: 200 ${req.url} ${req.method}`);

    // Se establece el codigo de respuesta

    res.statusCode = 200;

    // Cerrando la comunicacion

    res.end();

    break;

    // FIN ACTIVIDAD ENRUTADO

    // ACTIVIDAD FAVICON

    case "/favicon.ico":

        // Se especifica la ubicacion del archivo de icono

        const faviconPath = path.join(__dirname, 'favicon.ico');

        // Se evalua la consulta con un try catch

        try{

            const data = await fs.readFile(faviconPath);
    
            res.writeHead(200, {'Content-Type': 'image/x-icon'});
    
            res.end(data);

        } catch (err){

            console.error(err);

            // Se establece peticion raiz

            res.setHeader('Content-Type', 'text/html');

            res.write(`

              <html>
              <head>
                <link rel="icon" type="image/x-icon" sizes="32x32" href="/favicon.ico">
                <title>My App</title>
              </head>
              <body> 
                <h1>&#128534; 500 El server esta fuera de servicio</h1>
                <p>Lo sentimos pero hubo un error en nuestro server...</p>
                <p> ${err.message}</p>
              </body>
              </html>
            
            `);

            console.log(`📣 Respondiendo: 500 ${req.url} ${req.method}`);

            res.statusCode = 500;

            res.end();

        };

        break;

    // FIN ACTIVIDAD FAVICON

    // ACTIVIDAD METODO POST

    case "/message":

      // ACTIVIDAD PROCESANDO UN FORMULARIO

      // Verificando si es post

      if (method === "POST") {

        // Se crea una variable para almacenar los
		    // Datos entrantes del cliente

        let body = "";

        // Se registra un manejador de eventos
        // Para la recepción de datos

        req.on("data", (data => {

          body += data;

          if (body.length > 1e6) return req.socket.destroy();

        }));

        // Se registra una manejador de eventos
		    // para el termino de recepción de datos

        req.on("end", () => {

          // Procesa el formulario

          res.statusCode = 200;

          res.setHeader("Content-Type", "text/html");

          // Mediante URLSearchParams se extraen
			    // los campos del formulario

          const params = new URLSearchParams(body);

          // Se construye un objeto a partir de los datos
			    // en la variable params

          const parsedParams = Object.fromEntries(params);

          res.write(`
          <html>
            <head>
              <link rel="icon" type="image/x-icon" sizes="32x32" href="/favicon.ico">
              <title>My App</title>
              <style>
                body {
                  background-color: #f9f9f9;
                  font-family: Arial, sans-serif;
                }
                h1 {
                  color: #e74c3c;
                  font-size: 48px;
                  margin-top: 50px;
                  text-align: center;
                }
                p {
                  font-size: 24px;
                  color: #7f8c8d;
                  text-align: center;
                  margin-top: 20px;
                }
                .error-message {
                  font-size: 18px;
                  color: #95a5a6;
                  text-align: center;
                  margin-top: 20px;
                }
              </style>
            </head>
            <body> 
              <h1 style="color: #333">SERVER MESSAGE RECIEVED &#128172</h1>
              <p>${parsedParams.message}</p>
            </body>
          </html>
          `);

          // Se finaliza la conexion

          return res.end();

        });

      } else {
        res.statusCode = 404;

        res.write("404: Endpoint no encontrado")

        res.end();

      }

      // FIN ACTIVIDAD PROCESANDO UN FORMULARIO


      // CLASE REDIRECCIONAMIENTO

      /*   

      // Se verifica si es post

      if(method === "POST"){

        // Se crea una variable para almacnar los datos
        // entrantes del cliente
        
        let body = "";

        // Se registra un manejador de eventos
        // para la recepcion de datos

        req.on("data", (data =>{

          body += data;

          if(body.length > 1e6) return req.socket.destroy();

        }));

        // Se registra un manejador de eventos
        // para el termino de recepcion de datos

        req.on("end",  () => {

          // Procesa el formulario

          res.statusCode = 200;

          res.setHeader("Content-Type", "text/html");

          // Mediante URLSeearchParams se extraen

          // los campos del formulario

          const params = new URLSearchParams(body);

          // Se construye un objeto a partir de los datos
          // en la variable params

          const parsedParams = Object.fromEntries(params);

          // Almacenar el mensaje en un archivo REDIRECCIONAMIENTO

          fs.writeFile('message.txt', parsedParams.message);

          // Establecer un codigo de respuesta para
          // redireccionamiento

        });
        
        res.statusCode = 302;

        // Estableciendo el redireccionamiento (siempre Location)

        res.setHeader('Location', '/');

        // Se termina la conexion

        return res.end();

      }else{

        res.statusCode = 404;

        res.write("404: Endpoint no encontrado");

        res.end();

      }

      */

      // FIN TEMA REDIRECCIONAMIENTO CLASE
    
      break;

    // FIN ACTIVIDAD METODO POST

    default:
      // Peticion raiz
      // Estableciendo cabeceras
      res.setHeader('Content-Type', 'text/html');
      // Escribiendo la respuesta
      res.write(`
      <html>
        <head>
          <link rel="icon" type="image/x-icon" sizes="32x32" href="/favicon.ico">
          <title>My App</title>
        </head>
        <body> 
          <h1>&#128534; 404 Recurso no encontrado</h1>
          <p>Lo sentimos pero no tenemos lo que buscas...</p>
        </body>
      </html>
      `);
      console.log(`📣 Respondiendo: 404 ${req.url} ${req.method}`);
      // Estableciendo codigo de respuesta
      res.statusCode = 404;
      // Cerrando la comunicacion
      res.end();
      break;
  }
}); 

server.listen(3000, "0.0.0.0", () => {
  console.log("👩‍🍳 Servidor escuchando en http://localhost:3000"); 
});
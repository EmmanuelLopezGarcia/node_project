// Importaciones para acceder al directorio de archivos actual
import path from "path";
import { promises as fs} from 'fs';
import { URLSearchParams } from "url";

// Se declara la variable global "__dirname"
global["__dirname"] = path.dirname(new URL(import.meta.url).pathname);

const html_500 = path.join(__dirname, 'views/500.html');
const html_404 = path.join(__dirname, 'views/404_error.jpeg');


// La funcion se declara asyncrona
export default async (req, res) => {
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

      // Se especifica la ubicacion del archivo de icono
      const index_html_path = path.join(__dirname, 'views/index.html');
      
      // Se evalua la consulta con un try catch

      try{

        const data = await fs.readFile(index_html_path);
        
        res.setHeader('Content-Type', 'text/html');
        
        res.end(data);
        
      } catch (err){
        
        const error_500 = await fs.readFile(html_500);
        
        console.error(err);

        // Se establece peticion raiz

        res.setHeader('Content-Type', 'text/html');

        res.end(error_500);

        console.log(`📣 Respondiendo: 500 ${req.url} ${req.method}`);
        console.log(`📣 Error: 500 ${err.message}`);

        res.statusCode = 500;

        res.end();

      };
  
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
    
    const index_author_path = path.join(__dirname, 'views/author1.html');

    // Se evalua la consulta con un try catch

    try{

      const data = await fs.readFile(index_author_path);
      
      res.setHeader('Content-Type', 'text/html');

      res.end(data);

    } catch (err){

      const error_500 = await fs.readFile(html_500);

      console.error(error_500);

      // Se establece peticion raiz

      res.setHeader('Content-Type', 'text/html');

      res.end(error_500);

      //res.end(error_500);

      console.log(`📣 Respondiendo: 500 ${req.url} ${req.method}`);
      console.log(`📣 Error: 500 ${err.message}`);

      res.statusCode = 500;

      res.end();

    };

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

            const error_500 = await fs.readFile(html_500);

            console.error(err);

            // Se establece peticion raiz

            res.setHeader('Content-Type', 'text/html');

            res.end(error_500)

            console.log(`📣 Respondiendo: 500 ${req.url} ${req.method}`);
            console.log(`📣 Error: 500 ${err.message}`);

            res.statusCode = 500;

            res.end();

        };

        break;

    // FIN ACTIVIDAD FAVICON

    // ACTIVIDAD METODO POST

    case "/message":

      // CLASE REDIRECCIONAMIENTO

      // Se verifica si es post

      if(method === "POST"){

        // Se crea una variable para almacnar los datos
        // entrantes del cliente
        
        let body = "";

        // Se registra un manejador de eventos
        // para la recepcion de datos

        req.on("data", (data) =>{

          body += data;

          if(body.length > 1e6) return req.socket.destroy();

        });

        // Se registra un manejador de eventos
        // para el termino de recepcion de datos

        req.on("end",  () => {

          // Procesa el formulario

          //res.statusCode = 200;

          //res.setHeader("Content-Type", "text/html");

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

        const error_404 = await fs.readFile(html_404);

        res.writeHead(200, {'Content-Type': 'image/jpeg'});

        res.statusCode = 404;

        console.log("404: Endpoint no encontrado");

        res.end(error_404);

      }

      // FIN TEMA REDIRECCIONAMIENTO CLASE
    
      break;

    // FIN ACTIVIDAD METODO POST

    default:

      // Peticion raiz
      // Estableciendo cabeceras
      //res.setHeader('Content-Type', 'text/html');
      res.writeHead(200, {'Content-Type': 'image/jpeg'});
      // Escribiendo la respuesta

      const error_404 = await fs.readFile(html_404);

      console.log(`📣 Respondiendo: 404 ${req.url} ${req.method}`);
      // Estableciendo codigo de respuesta
      res.statusCode = 404;
      // Cerrando la comunicacion
      res.end(error_404);
      break;
  }
}; 
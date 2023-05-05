import path from "path"; 
import { promises as fs } from "fs"; 
 
global["__dirname"] = path.dirname(new URL(import.meta.url).pathname); 
 
export default async (req, res) => { 
  // Destructuring the "req" 
  let { url, method } = req; 
 
  console.log(`✅ CLIENT-REQUEST: ${req.url} ${req.method}`); 
 
  // Enrouting requests 
  switch (url) { 
    case "/": 
      // Root request 
      // Establishing headers 
      res.setHeader("Content.Type", "text/html"); 
      // Writing the answer 
      res.write(``); 
      console.log(`🟢 Answering: 200 ${req.url} ${req.method}`); 
      // Establishing the answer code 
      res.statusCode = 200; 
      // Closing the comunication 
      res.end(); 
      break; 
    case "/author": 
      // Root request 
      // Establishing headers 
      res.setHeader("Content.Type", "text/html"); 
      // Writing the answer 
      res.write(``); 
      console.log(`🟢 Answering: 200 ${req.url} ${req.method}`); 
      // Establishing the answer code 
      res.statusCode = 200; 
      // Closing the comunication 
      res.end(); 
      break; 
    case "/favicon.ico": 
      // Specifying the path to the icon file 
      const faviconPath = path.join(__dirname, "favicon.ico"); 
      try { 
        const data = await fs.readFile(faviconPath); 
        res.writeHead(200, { "Content-Type": "image/x-icon" }); 
        res.end(data); 
      } catch (err) { 
        console.error(err); 
        // Root request 
        // Stablishing headers 
        res.setHeader("Content-Type", "text/html"); 
        // Writing the answer 
        res.write(``); 
        console.log(`🔴 Answering: 500 ${req.url} ${req.method}`); 
        console.log(`🔴 Error: 500 ${err.message}`); 
        // Stablishing the answer code 
        res.statusCode = 500; 
        // Closing comunication 
        res.end(); 
      } 
      break; 
    case "/message": 
      // Verifying if it's POST 
      if (method === "POST") { 
        /* We create a variable to 
        save the client in-data*/ 
        let body = ""; 
 
        /* We register the event manager 
        for the data reception*/ 
        req.on("data", (data) => { 
          body += data; 
          if (body.length > 1e6) return req.socket.destroy(); 
        }); 
 
        /* We register the event manager 
        to end the data reception*/ 
        req.on("end", () => { 
          // Procesing the form 
          /* By the URLSearchParams we extract 
          the inputs of the form*/ 
          const params = new URLSearchParams(body); 
          /* We build an object based on the data 
          and on the params variable*/ 
          const parsedParams = Object.fromEntries(params); 
          // Saving the message in a file 
          fs.writeFile('message.txt', parsedParams.message); 
        }); 
        /* Stablishing an answer code 
        for redirect*/ 
        res.statusCode = 302; 
        // Stablish the redirect 
        res.setHeader('Location', '/'); 
        // We finish the connectipon 
        return res.end(); 
      } else { 
        res.statusCode = 404; 
        res.write("🔴 404: Endpoint not found"); 
        res.end(); 
      } 
      break; 
    default: 
      // Root request 
      // Establishing headers 
      res.setHeader("Content.Type", "text/html"); 
      // Writing the answer 
      res.write(``); 
      console.log(`🔴 Answering: 404 ${req.url} ${req.method}`); 
      // Establishing the answer code 
      res.statusCode = 404; 
      // Closing comunication 
      res.end(); 
      break; 
  } 
}
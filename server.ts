// server.ts
import { serve } from "https://deno.land/std@0.210.0/http/server.ts";

async function handleRequest(request: Request): Promise<Response> {
  const { pathname } = new URL(request.url);

  // Serve index.html for root path
  if (pathname === "/") {
    const file = await Deno.readFile("./index.html");
    return new Response(file, {
      headers: {
        "content-type": "text/html",
      },
    });
  }

  // Serve other files (CSS, JS, images)
  try {
    const file = await Deno.readFile(`.${pathname}`);
    const contentType = getContentType(pathname);
    return new Response(file, {
      headers: {
        "content-type": contentType,
      },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}

function getContentType(path: string): string {
  if (path.endsWith(".css")) return "text/css";
  if (path.endsWith(".js")) return "application/javascript";
  if (path.endsWith(".png")) return "image/png";
  if (path.endsWith(".jpg") || path.endsWith(".jpeg")) return "image/jpeg";
  return "text/plain";
}

serve(handleRequest, { port: 8080 });

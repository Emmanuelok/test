import { NextRequest } from "next/server";
import { respond, type Msg } from "@/lib/ai/concierge-brain";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const { messages } = (await req.json()) as { messages: Msg[] };
  if (!Array.isArray(messages)) {
    return new Response(JSON.stringify({ error: "bad input" }), { status: 400 });
  }

  const stream = new ReadableStream({
    async start(controller) {
      const enc = new TextEncoder();
      try {
        for await (const evt of respond(messages)) {
          controller.enqueue(enc.encode(JSON.stringify(evt) + "\n"));
        }
      } catch (err) {
        controller.enqueue(
          enc.encode(
            JSON.stringify({
              t: "text",
              v: "Sorry — something went wrong on our end. Try again?",
            }) + "\n",
          ),
        );
        console.error(err);
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "application/x-ndjson; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}

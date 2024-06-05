import { NextResponse } from "next/server";
import ytdl from "ytdl-core";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get("url");

  if (!url) {
    return NextResponse.json({ error: "URL is required" }, { status: 400 });
  }

  if (!ytdl.validateURL(url)) {
    return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
  }

  try {
    const info = await ytdl.getInfo(url);
    const title = info.videoDetails.title;
    const headers = new Headers({
      "Content-Disposition": `attachment; filename="${title}.mp4"`,
    });

    const stream = ytdl(url, {
      filter: "audioandvideo",
      format: "mp4",
    });

    return new Response(stream, { headers });
  } catch (error) {
    console.error("Error downloading video:", error);
    return NextResponse.json(
      { error: "Failed to download video" },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import ytdl from "ytdl-core";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get("url");
  const format = searchParams.get("format");

  if (!url) {
    return NextResponse.json({ error: "URL is required" }, { status: 400 });
  }

  if (!ytdl.validateURL(url)) {
    return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
  }

  try {
    const info = await ytdl.getInfo(url);
    const title = info.videoDetails.title;

    let contentType = "video/mp4";
    let fileExtension = "mp4";
    let ytdlOptions = { filter: "audioandvideo", format: "mp4" };

    if (format === "mp3") {
      contentType = "audio/mpeg";
      fileExtension = "mp3";
      ytdlOptions = { filter: "audioonly", format: "mp3" };
    }

    const headers = new Headers({
      "Content-Disposition": `attachment; filename="${title}.${fileExtension}"`,
      "Content-Type": contentType,
    });

    const stream = ytdl(url, ytdlOptions);

    return new Response(stream, { headers });
  } catch (error) {
    console.error("Error downloading video:", error);
    return NextResponse.json(
      { error: "Failed to download video" },
      { status: 500 }
    );
  }
}

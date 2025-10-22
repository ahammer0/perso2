import { NextRequest, NextResponse } from "next/server";
import fs from 'fs';
import path from 'path';

const pathEnv = process.env.UPLOADS_DIR_PATH
if (!path) throw new Error("UPLOADS_DIR_PATH envvar unset")
const uploadsDirPath = process.cwd() + "/" + pathEnv;


export async function GET(req: NextRequest, { params }: { params: { filename: string } }) {
  const awaitedParams = await params;
  const filePath = path.join(uploadsDirPath, awaitedParams.filename);

  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ error: 'Fichier non trouvé' }, { status: 404 });
  }

  const fileBuffer = fs.readFileSync(filePath);
  const ext = path.extname(filePath).toLowerCase();

  const mimeTypes: Record<string, string> = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.gif': 'image/gif',
    '.webp': 'image/webp',
  };

  const contentType = mimeTypes[ext] || 'application/octet-stream';

  return new NextResponse(fileBuffer, {
    status: 200,
    headers: {
      'Content-Type': contentType,
    },
  });
}

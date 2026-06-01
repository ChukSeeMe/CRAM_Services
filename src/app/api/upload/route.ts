import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const AZURE_CONNECTION = process.env.AZURE_STORAGE_CONNECTION_STRING;
const AZURE_CONTAINER = 'cram-uploads';

export async function POST(request: Request) {
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.ADMIN_PASSWORD}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file received.' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = `${Date.now()}_${file.name.replace(/\s+/g, '_')}`;

    if (AZURE_CONNECTION) {
      // Upload to Azure Blob Storage
      const { BlobServiceClient } = await import('@azure/storage-blob');
      const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_CONNECTION);
      const containerClient = blobServiceClient.getContainerClient(AZURE_CONTAINER);

      // Ensure container exists with public access
      await containerClient.createIfNotExists({ access: 'blob' });

      const blockBlobClient = containerClient.getBlockBlobClient(filename);
      await blockBlobClient.uploadData(buffer, {
        blobHTTPHeaders: { blobContentType: file.type }
      });

      return NextResponse.json({ url: blockBlobClient.url });
    }

    // Local fallback for development without Azure storage
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    try {
      await fs.access(uploadDir);
    } catch {
      await fs.mkdir(uploadDir, { recursive: true });
    }
    const filePath = path.join(uploadDir, filename);
    await fs.writeFile(filePath, buffer);
    return NextResponse.json({ url: `/uploads/${filename}` });
  } catch (error) {
    console.error('Upload Error:', error);
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
  }
}

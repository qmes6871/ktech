import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const UPLOAD_BASE_DIR = path.join(process.cwd(), 'public/ktech/downloads');
// Allow all file types - no restriction
const MAX_SIZE = 100 * 1024 * 1024; // 100MB

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const category = formData.get('category') as string || 'catalog';

    if (!file) {
      return NextResponse.json(
        { error: '파일이 없습니다.' },
        { status: 400 }
      );
    }

    // Validate file size
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: '파일 크기는 100MB를 초과할 수 없습니다.' },
        { status: 400 }
      );
    }

    // Determine upload directory based on category
    const uploadDir = path.join(UPLOAD_BASE_DIR, category);

    // Ensure upload directory exists
    await fs.mkdir(uploadDir, { recursive: true });

    // Generate unique filename
    const timestamp = Date.now();
    const originalName = file.name.replace(/[^a-zA-Z0-9가-힣.-]/g, '_');
    const ext = path.extname(originalName);
    const baseName = path.basename(originalName, ext);
    const fileName = `${timestamp}-${baseName}${ext}`;
    const filePath = path.join(uploadDir, fileName);

    // Save file
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await fs.writeFile(filePath, buffer);

    // Calculate file size string
    const fileSizeBytes = file.size;
    let fileSize: string;
    if (fileSizeBytes >= 1024 * 1024) {
      fileSize = `${(fileSizeBytes / (1024 * 1024)).toFixed(1)}MB`;
    } else {
      fileSize = `${(fileSizeBytes / 1024).toFixed(0)}KB`;
    }

    // Return the URL path
    const fileUrl = `/ktech/downloads/${category}/${fileName}`;

    return NextResponse.json({
      success: true,
      url: fileUrl,
      fileName: fileName,
      originalName: file.name,
      fileSize: fileSize,
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: '파일 업로드에 실패했습니다.' },
      { status: 500 }
    );
  }
}

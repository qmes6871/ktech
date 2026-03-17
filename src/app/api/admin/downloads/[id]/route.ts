import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import type { Download } from '../route';

const DOWNLOADS_FILE = path.join(process.cwd(), 'src/data/downloads.json');

async function getDownloads(): Promise<Download[]> {
  try {
    const data = await fs.readFile(DOWNLOADS_FILE, 'utf-8');
    return JSON.parse(data) as Download[];
  } catch {
    return [];
  }
}

async function saveDownloads(downloads: Download[]): Promise<void> {
  await fs.writeFile(DOWNLOADS_FILE, JSON.stringify(downloads, null, 2), 'utf-8');
}

// GET: 단일 자료 조회
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const downloads = await getDownloads();
    const download = downloads.find((d) => d.id === id);

    if (!download) {
      return NextResponse.json(
        { error: '자료를 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    return NextResponse.json(download);
  } catch (error) {
    console.error('Error fetching download:', error);
    return NextResponse.json(
      { error: '자료를 불러오는데 실패했습니다.' },
      { status: 500 }
    );
  }
}

// PUT: 자료 수정
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const downloads = await getDownloads();
    const index = downloads.findIndex((d) => d.id === id);

    if (index === -1) {
      return NextResponse.json(
        { error: '자료를 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    const updatedDownload: Download = {
      ...downloads[index],
      category: body.category || downloads[index].category,
      name: body.name || downloads[index].name,
      description: body.description || downloads[index].description,
      fileName: body.fileName || downloads[index].fileName,
      fileUrl: body.fileUrl || downloads[index].fileUrl,
      fileSize: body.fileSize || downloads[index].fileSize,
      isActive: body.isActive !== undefined ? body.isActive : downloads[index].isActive,
    };

    downloads[index] = updatedDownload;
    await saveDownloads(downloads);

    return NextResponse.json(updatedDownload);
  } catch (error) {
    console.error('Error updating download:', error);
    return NextResponse.json(
      { error: '자료 수정에 실패했습니다.' },
      { status: 500 }
    );
  }
}

// DELETE: 자료 삭제
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const downloads = await getDownloads();
    const index = downloads.findIndex((d) => d.id === id);

    if (index === -1) {
      return NextResponse.json(
        { error: '자료를 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    downloads.splice(index, 1);
    await saveDownloads(downloads);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting download:', error);
    return NextResponse.json(
      { error: '자료 삭제에 실패했습니다.' },
      { status: 500 }
    );
  }
}

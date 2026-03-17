import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export interface Download {
  id: string;
  category: 'catalog' | 'specs' | 'certification';
  name: {
    ko: string;
    en: string;
    zh: string;
  };
  description: {
    ko: string;
    en: string;
    zh: string;
  };
  fileName: string;
  fileUrl: string;
  fileSize: string;
  uploadDate: string;
  isActive: boolean;
}

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

// GET: 자료 목록 조회
export async function GET(request: NextRequest) {
  try {
    const downloads = await getDownloads();
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const activeOnly = searchParams.get('activeOnly') === 'true';

    let filteredDownloads = downloads;

    if (category) {
      filteredDownloads = filteredDownloads.filter((d) => d.category === category);
    }

    if (activeOnly) {
      filteredDownloads = filteredDownloads.filter((d) => d.isActive);
    }

    return NextResponse.json(filteredDownloads);
  } catch (error) {
    console.error('Error fetching downloads:', error);
    return NextResponse.json(
      { error: '자료 목록을 불러오는데 실패했습니다.' },
      { status: 500 }
    );
  }
}

// POST: 자료 생성
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const downloads = await getDownloads();

    // Generate new ID
    const maxId = downloads.reduce(
      (max, d) => Math.max(max, parseInt(d.id, 10)),
      0
    );
    const newId = (maxId + 1).toString();

    const newDownload: Download = {
      id: newId,
      category: body.category || 'catalog',
      name: body.name || { ko: '', en: '', zh: '' },
      description: body.description || { ko: '', en: '', zh: '' },
      fileName: body.fileName || '',
      fileUrl: body.fileUrl || '',
      fileSize: body.fileSize || '',
      uploadDate: new Date().toISOString().split('T')[0],
      isActive: body.isActive !== false,
    };

    downloads.push(newDownload);
    await saveDownloads(downloads);

    return NextResponse.json(newDownload, { status: 201 });
  } catch (error) {
    console.error('Error creating download:', error);
    return NextResponse.json(
      { error: '자료 생성에 실패했습니다.' },
      { status: 500 }
    );
  }
}

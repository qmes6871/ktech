import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const INQUIRIES_FILE = path.join(process.cwd(), 'src/data/inquiries.json');

interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  category: string;
  message: string;
  createdAt: string;
  isRead: boolean;
}

async function getInquiries(): Promise<Inquiry[]> {
  try {
    const data = await fs.readFile(INQUIRIES_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function saveInquiries(inquiries: Inquiry[]): Promise<void> {
  await fs.writeFile(INQUIRIES_FILE, JSON.stringify(inquiries, null, 2), 'utf-8');
}

// GET: 문의 목록 조회
export async function GET() {
  try {
    const inquiries = await getInquiries();
    return NextResponse.json(inquiries);
  } catch (error) {
    console.error('Error fetching inquiries:', error);
    return NextResponse.json(
      { error: '문의 목록을 불러오는데 실패했습니다.' },
      { status: 500 }
    );
  }
}

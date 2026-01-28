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

// PUT: 문의 읽음 상태 변경
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const inquiries = await getInquiries();
    const index = inquiries.findIndex((inq) => inq.id === id);

    if (index === -1) {
      return NextResponse.json(
        { error: '문의를 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    inquiries[index] = {
      ...inquiries[index],
      isRead: body.isRead !== undefined ? body.isRead : inquiries[index].isRead,
    };

    await saveInquiries(inquiries);

    return NextResponse.json(inquiries[index]);
  } catch (error) {
    console.error('Error updating inquiry:', error);
    return NextResponse.json(
      { error: '문의 수정에 실패했습니다.' },
      { status: 500 }
    );
  }
}

// DELETE: 문의 삭제
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const inquiries = await getInquiries();
    const index = inquiries.findIndex((inq) => inq.id === id);

    if (index === -1) {
      return NextResponse.json(
        { error: '문의를 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    inquiries.splice(index, 1);
    await saveInquiries(inquiries);

    return NextResponse.json({ success: true, message: '문의가 삭제되었습니다.' });
  } catch (error) {
    console.error('Error deleting inquiry:', error);
    return NextResponse.json(
      { error: '문의 삭제에 실패했습니다.' },
      { status: 500 }
    );
  }
}

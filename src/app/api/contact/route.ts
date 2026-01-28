import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, company, category, productInterest, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: '필수 항목을 입력해주세요.' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: '올바른 이메일 주소를 입력해주세요.' },
        { status: 400 }
      );
    }

    // Save inquiry to JSON file
    const inquiries = await getInquiries();
    const maxId = inquiries.reduce((max, inq) => Math.max(max, parseInt(inq.id, 10) || 0), 0);
    const newInquiry: Inquiry = {
      id: (maxId + 1).toString(),
      name,
      email,
      phone: phone || '',
      company: company || '',
      category: category || productInterest || '',
      message,
      createdAt: new Date().toISOString(),
      isRead: false,
    };
    inquiries.unshift(newInquiry);
    await saveInquiries(inquiries);

    // Log the inquiry
    console.log('=== New Contact Form Submission ===');
    console.log('ID:', newInquiry.id);
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Phone:', phone || 'N/A');
    console.log('Company:', company || 'N/A');
    console.log('Category:', category || productInterest || 'N/A');
    console.log('Message:', message);
    console.log('================================');

    // Try to send email notification (optional, don't block on failure)
    if (process.env.SMTP_HOST && process.env.SMTP_USER && !process.env.SMTP_HOST.includes('example')) {
      try {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: parseInt(process.env.SMTP_PORT || '587'),
          secure: process.env.SMTP_SECURE === 'true',
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        });

        const mailOptions = {
          from: process.env.SMTP_FROM || process.env.SMTP_USER,
          to: process.env.CONTACT_EMAIL || process.env.SMTP_USER,
          replyTo: email,
          subject: `[케이텍 문의] ${category || productInterest ? `${category || productInterest} - ` : ''}${name}님의 문의`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #1d4ed8; border-bottom: 2px solid #1d4ed8; padding-bottom: 10px;">
                새로운 문의가 접수되었습니다
              </h2>
              <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                <tr>
                  <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold; width: 120px;">성명</td>
                  <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold;">이메일</td>
                  <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;"><a href="mailto:${email}">${email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold;">연락처</td>
                  <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">${phone || '-'}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold;">회사명</td>
                  <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">${company || '-'}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold;">문의 유형</td>
                  <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">${category || productInterest || '-'}</td>
                </tr>
              </table>
              <div style="margin-top: 20px;">
                <h3 style="color: #374151;">문의 내용</h3>
                <div style="background-color: #f3f4f6; padding: 15px; border-radius: 8px; white-space: pre-wrap;">${message}</div>
              </div>
              <p style="color: #6b7280; font-size: 12px; margin-top: 30px;">
                이 메일은 케이텍 웹사이트 문의 양식을 통해 자동 발송되었습니다.
              </p>
            </div>
          `,
        };

        await transporter.sendMail(mailOptions);
        console.log('Email notification sent successfully');
      } catch (emailError) {
        console.error('Failed to send email notification:', emailError);
        // Don't fail the request, inquiry is already saved
      }
    }

    return NextResponse.json({
      success: true,
      message: '문의가 접수되었습니다.'
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: '전송 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.' },
      { status: 500 }
    );
  }
}

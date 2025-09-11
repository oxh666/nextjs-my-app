import { NextRequest, NextResponse } from 'next/server';
import { signOut } from '@/lib/supabase/auth';

// 登出用户
export async function POST(request: NextRequest) {
  try {
    await signOut();
    
    return NextResponse.json({
      message: '登出成功'
    });
    
  } catch (error) {
    console.error('登出错误:', error);
    return NextResponse.json(
      { error: '服务器内部错误' },
      { status: 500 }
    );
  }
}

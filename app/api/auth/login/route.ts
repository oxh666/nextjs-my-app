import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { signIn } from '@/lib/supabase/auth';

// 数据验证模式
const loginSchema = z.object({
  email: z.string().email('邮箱格式不正确'),
  password: z.string().min(6, '密码至少6位')
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // 数据验证
    const validatedData = loginSchema.parse(body);
    
    // 使用 Supabase 认证登录
    const { user, session } = await signIn(validatedData.email, validatedData.password);
    
    if (!user || !session) {
      return NextResponse.json(
        { error: '邮箱或密码错误' },
        { status: 401 }
      );
    }
    
    return NextResponse.json({
      message: '登录成功',
      user: {
        id: user.id,
        email: user.email,
        name: user.user_metadata?.name || user.email
      },
      session: {
        access_token: session.access_token,
        refresh_token: session.refresh_token,
        expires_at: session.expires_at
      }
    });
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: '数据验证失败', details: error.issues },
        { status: 400 }
      );
    }
    if (error instanceof Error) {
      if (error.message.includes('Invalid login credentials')) {
        return NextResponse.json(
          { error: '邮箱或密码错误' },
          { status: 401 }
        );
      }
    }
    
    console.error('登录错误:', error);
    return NextResponse.json(
      { error: '服务器内部错误' },
      { status: 500 }
    );
  }
}

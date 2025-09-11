import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { signUp } from '@/lib/supabase/auth';

// 数据验证模式
const registerSchema = z.object({
  name: z.string().min(2, '姓名至少2个字符'),
  email: z.string().email('邮箱格式不正确'),
  password: z.string().min(6, '密码至少6位')
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // 数据验证
    const validatedData = registerSchema.parse(body);
    
    // 使用 Supabase 认证注册
    const { user, session } = await signUp(
      validatedData.email,
      validatedData.password,
      validatedData.name
    );
    
    if (!user) {
      return NextResponse.json(
        { error: '注册失败' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({
      message: '注册成功',
      user: {
        id: user.id,
        name: user.user_metadata?.name || validatedData.name,
        email: user.email
      },
      session: session ? {
        access_token: session.access_token,
        refresh_token: session.refresh_token,
        expires_at: session.expires_at
      } : null
    }, { status: 201 });
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: '数据验证失败', details: error.issues },
        { status: 400 }
      );
    }
    if (error instanceof Error) {
      if (error.message.includes('User already registered')) {
        return NextResponse.json(
          { error: '邮箱已被注册' },
          { status: 409 }
        );
      }
    }
    
    console.error('注册错误:', error);
    return NextResponse.json(
      { error: '服务器内部错误' },
      { status: 500 }
    );
  }
}

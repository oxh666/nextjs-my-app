import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { UserService } from '@/lib/database/userService';

// 数据验证模式
const loginSchema = z.object({
  username: z.string().min(1, '用户名不能为空'),
  password: z.string().min(6, '密码至少6位')
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // 数据验证
    const validatedData = loginSchema.parse(body);
    
    // 使用 SQLite 验证用户登录并生成TOKEN
    const loginResult = await UserService.validateUserAndCreateSession({
      username: validatedData.username,
      password: validatedData.password
    });
    
    if (!loginResult) {
      return NextResponse.json(
        { error: '用户名或密码错误' },
        { status: 401 }
      );
    }
    
    return NextResponse.json({
      message: '登录成功',
      user: {
        id: loginResult.user.id,
        email: loginResult.user.email,
        name: loginResult.user.name,
        role: loginResult.user.role
      },
      token: loginResult.token,
      expiresAt: loginResult.expiresAt
    });
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: '数据验证失败', details: error.issues },
        { status: 400 }
      );
    }
    if (error instanceof Error) {
      if (error.message.includes('用户名或密码错误')) {
        return NextResponse.json(
          { error: '用户名或密码错误' },
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

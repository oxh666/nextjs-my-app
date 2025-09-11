import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { UserService } from '@/lib/database/userService';

// 数据验证模式
const registerSchema = z.object({
  name: z.string().min(2, '用户名至少2个字符'),
  password: z.string().min(6, '密码至少6位')
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // 数据验证
    const validatedData = registerSchema.parse(body);
    
    // 使用 SQLite 注册用户
    const user = await UserService.createUser({
      password: validatedData.password,
      name: validatedData.name
    });
    
    return NextResponse.json({
      message: '注册成功',
      user: {
        id: user.id,
        name: user.name
      }
    }, { status: 201 });
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: '数据验证失败', details: error.issues },
        { status: 400 }
      );
    }
    if (error instanceof Error) {
      if (error.message.includes('用户名已被注册')) {
        return NextResponse.json(
          { error: '用户名已被注册' },
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

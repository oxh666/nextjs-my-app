import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { UserService } from '@/lib/supabase/database';
import { verifyToken } from '@/lib/supabase/auth';

// 创建用户的数据验证模式
const createUserSchema = z.object({
  name: z.string().min(2, '姓名至少2个字符'),
  email: z.string().email('邮箱格式不正确'),
  role: z.enum(['admin', 'user'], { message: '角色必须是 admin 或 user' })
});

// 验证用户权限的中间件函数
async function verifyUser(request: NextRequest) {
  const token = request.headers.get('authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return null;
  }
  
  try {
    const user = await verifyToken(token);
    return user;
  } catch (error) {
    return null;
  }
}

// 获取所有用户
export async function GET(request: NextRequest) {
  try {
    // 验证用户权限
    const user = await verifyUser(request);
    if (!user) {
      return NextResponse.json(
        { error: '未授权访问' },
        { status: 401 }
      );
    }
    
    // 从 Supabase 获取用户列表
    const users = await UserService.getAllUsers();
    
    return NextResponse.json({
      message: '获取用户列表成功',
      data: users
    });
    
  } catch (error) {
    console.error('获取用户列表错误:', error);
    return NextResponse.json(
      { error: '服务器内部错误' },
      { status: 500 }
    );
  }
}

// 创建新用户
export async function POST(request: NextRequest) {
  try {
    // 验证用户权限
    const user = await verifyUser(request);
    if (!user) {
      return NextResponse.json(
        { error: '未授权访问' },
        { status: 401 }
      );
    }
    
    const body = await request.json();
    
    // 数据验证
    const validatedData = createUserSchema.parse(body);
    
    // 检查邮箱是否已存在
    const existingUser = await UserService.getUserByEmail(validatedData.email);
    if (existingUser) {
      return NextResponse.json(
        { error: '邮箱已被使用' },
        { status: 409 }
      );
    }
    
    // 创建新用户
    const newUser = await UserService.createUser({
      id: crypto.randomUUID(),
      ...validatedData
    });
    
    return NextResponse.json({
      message: '创建用户成功',
      data: newUser
    }, { status: 201 });
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: '数据验证失败', details: error.errors },
        { status: 400 }
      );
    }
    
    if (error instanceof Error && error.message.includes('duplicate key')) {
      return NextResponse.json(
        { error: '邮箱已被使用' },
        { status: 409 }
      );
    }
    
    console.error('创建用户错误:', error);
    return NextResponse.json(
      { error: '服务器内部错误' },
      { status: 500 }
    );
  }
}

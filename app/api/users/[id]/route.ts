import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { UserService } from '@/lib/supabase/database';
import { verifyToken } from '@/lib/supabase/auth';

// 更新用户的数据验证模式
const updateUserSchema = z.object({
  name: z.string().min(2, '姓名至少2个字符').optional(),
  email: z.string().email('邮箱格式不正确').optional(),
  role: z.enum(['admin', 'user'], { message: '角色必须是 admin 或 user' }).optional()
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

// 获取单个用户
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // 验证用户权限
    const user = await verifyUser(request);
    if (!user) {
      return NextResponse.json(
        { error: '未授权访问' },
        { status: 401 }
      );
    }
    
    const userId = params.id;
    const targetUser = await UserService.getUserById(userId);
    
    if (!targetUser) {
      return NextResponse.json(
        { error: '用户不存在' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      message: '获取用户成功',
      data: targetUser
    });
    
  } catch (error) {
    console.error('获取用户错误:', error);
    return NextResponse.json(
      { error: '服务器内部错误' },
      { status: 500 }
    );
  }
}

// 更新用户
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // 验证用户权限
    const user = await verifyUser(request);
    if (!user) {
      return NextResponse.json(
        { error: '未授权访问' },
        { status: 401 }
      );
    }
    
    const userId = params.id;
    
    // 检查用户是否存在
    const existingUser = await UserService.getUserById(userId);
    if (!existingUser) {
      return NextResponse.json(
        { error: '用户不存在' },
        { status: 404 }
      );
    }
    
    const body = await request.json();
    
    // 数据验证
    const validatedData = updateUserSchema.parse(body);
    
    // 检查邮箱是否被其他用户使用
    if (validatedData.email) {
      const emailUser = await UserService.getUserByEmail(validatedData.email);
      if (emailUser && emailUser.id !== userId) {
        return NextResponse.json(
          { error: '邮箱已被其他用户使用' },
          { status: 409 }
        );
      }
    }
    
    // 更新用户信息
    const updatedUser = await UserService.updateUser(userId, validatedData);
    
    return NextResponse.json({
      message: '更新用户成功',
      data: updatedUser
    });
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: '数据验证失败', details: error.errors },
        { status: 400 }
      );
    }
    
    console.error('更新用户错误:', error);
    return NextResponse.json(
      { error: '服务器内部错误' },
      { status: 500 }
    );
  }
}

// 删除用户
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // 验证用户权限
    const user = await verifyUser(request);
    if (!user) {
      return NextResponse.json(
        { error: '未授权访问' },
        { status: 401 }
      );
    }
    
    const userId = params.id;
    
    // 检查用户是否存在
    const existingUser = await UserService.getUserById(userId);
    if (!existingUser) {
      return NextResponse.json(
        { error: '用户不存在' },
        { status: 404 }
      );
    }
    
    // 删除用户
    await UserService.deleteUser(userId);
    
    return NextResponse.json({
      message: '删除用户成功',
      data: existingUser
    });
    
  } catch (error) {
    console.error('删除用户错误:', error);
    return NextResponse.json(
      { error: '服务器内部错误' },
      { status: 500 }
    );
  }
}

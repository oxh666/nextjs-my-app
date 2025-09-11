import { NextRequest, NextResponse } from 'next/server';
import { UserService } from '@/lib/database/userService';

// 获取当前用户信息
export async function GET(request: NextRequest) {
  try {
    // 从请求头获取TOKEN
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: '缺少认证TOKEN' },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7); // 移除 "Bearer " 前缀
    
    // 验证TOKEN并获取用户信息
    const user = await UserService.validateToken(token);
    
    if (!user) {
      return NextResponse.json(
        { error: 'TOKEN无效或已过期' },
        { status: 401 }
      );
    }
    
    return NextResponse.json({
      message: '获取用户信息成功',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        created_at: user.created_at
      }
    });
    
  } catch (error) {
    console.error('获取用户信息错误:', error);
    return NextResponse.json(
      { error: '服务器内部错误' },
      { status: 500 }
    );
  }
}

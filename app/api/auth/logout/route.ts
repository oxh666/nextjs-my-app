import { NextRequest, NextResponse } from 'next/server';
import { UserService } from '@/lib/database/userService';

// 登出用户
export async function POST(request: NextRequest) {
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

    // 删除会话
    const success = await UserService.logout(token);
    
    if (!success) {
      return NextResponse.json(
        { error: 'TOKEN无效或已过期' },
        { status: 401 }
      );
    }
    
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

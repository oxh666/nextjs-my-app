import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser, getUserProfile } from '@/lib/supabase/auth';

// 获取当前用户信息
export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    
    if (!user) {
      return NextResponse.json(
        { error: '未登录' },
        { status: 401 }
      );
    }
    
    // 获取用户详细信息
    const userProfile = await getUserProfile(user.id);
    
    return NextResponse.json({
      message: '获取用户信息成功',
      user: {
        id: user.id,
        email: user.email,
        name: userProfile?.name || user.user_metadata?.name,
        role: userProfile?.role || 'user',
        created_at: userProfile?.created_at
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

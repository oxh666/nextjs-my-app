import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';
import { UserService } from '@/lib/supabase/database';

// 测试 Supabase 连接
export async function GET() {
  try {
    console.log('🔄 正在测试 Supabase 连接...');
    
    // 测试基本连接
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    // 测试数据库连接
    const users = await UserService.getAllUsers();
    
    return NextResponse.json({
      success: true,
      message: 'Supabase 连接成功！',
      data: {
        auth: {
          status: authError ? 'error' : 'connected',
          error: authError?.message || null,
          user: user ? 'authenticated' : 'anonymous'
        },
        database: {
          status: 'connected',
          usersCount: users.length,
          sampleUsers: users.slice(0, 3)
        }
      }
    });
    
  } catch (error) {
    console.error('❌ Supabase 连接测试失败:', error);
    
    return NextResponse.json({
      success: false,
      message: 'Supabase 连接失败',
      error: error instanceof Error ? error.message : '未知错误'
    }, { status: 500 });
  }
}

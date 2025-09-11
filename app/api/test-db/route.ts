import { NextResponse } from 'next/server';
import { UserService } from '@/lib/database/userService';

// 测试数据库连接
export async function GET() {
  try {
    console.log('🔄 正在测试 SQLite 数据库连接...');
    
    // 测试获取用户列表
    const users = await UserService.getAllUsers();
    
    return NextResponse.json({
      success: true,
      message: 'SQLite 数据库连接成功！',
      data: {
        database: {
          status: 'connected',
          usersCount: users.length,
          sampleUsers: users.slice(0, 3)
        }
      }
    });
    
  } catch (error) {
    console.error('❌ SQLite 数据库连接测试失败:', error);
    
    return NextResponse.json({
      success: false,
      message: 'SQLite 数据库连接失败',
      error: error instanceof Error ? error.message : '未知错误'
    }, { status: 500 });
  }
}


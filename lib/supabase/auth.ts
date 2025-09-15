import { supabase, supabaseAdmin } from './client';
import { User } from '@supabase/supabase-js';

// 认证相关类型
export interface AuthUser {
  id: string;
  email: string;
  name?: string;
  role?: 'admin' | 'user';
}

// 注册用户
export async function signUp(email: string, password: string, name: string) {
  try {
    // 使用 Supabase 认证注册
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          role: 'user'
        }
      }
    });

    if (authError) {
      throw new Error(authError.message);
    }

    // 在用户表中创建记录
    if (authData.user) {
      const { error: dbError } = await supabaseAdmin
        .from('users')
        .insert({
          id: authData.user.id,
          name,
          email,
          role: 'user'
        });

      if (dbError) {
        console.error('创建用户记录失败:', dbError);
        // 不抛出错误，因为认证已经成功
      }
    }

    return {
      user: authData.user,
      session: authData.session
    };
  } catch (error) {
    console.error('注册失败:', error);
    throw error;
  }
}

// 登录用户
export async function signIn(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error('登录失败:', error);
    throw error;
  }
}

// 登出用户
export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw new Error(error.message);
    }
    return true;
  } catch (error) {
    console.error('登出失败:', error);
    throw error;
  }
}

// 获取当前用户
export async function getCurrentUser(): Promise<User | null> {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) {
      console.error('获取用户失败:', error);
      return null;
    }
    return user;
  } catch (error) {
    console.error('获取用户失败:', error);
    return null;
  }
}

// 获取用户会话
export async function getSession() {
  try {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) {
      console.error('获取会话失败:', error);
      return null;
    }
    return session;
  } catch (error) {
    console.error('获取会话失败:', error);
    return null;
  }
}

// 验证 JWT Token（服务端使用）
export async function verifyToken(token: string) {
  try {
    const { data: { user }, error } = await supabaseAdmin.auth.getUser(token);
    if (error) {
      return null;
    }
    return user;
  } catch (error) {
    console.error('验证 Token 失败:', error);
    return null;
  }
}

// 获取用户详细信息
export async function getUserProfile(userId: string) {
  try {
    const { data, error } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error('获取用户信息失败:', error);
    throw error;
  }
}

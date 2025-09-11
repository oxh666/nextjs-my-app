import { supabaseAdmin } from './client';

// 用户数据操作
export class UserService {
  // 获取所有用户
  static async getAllUsers() {
    try {
      const { data, error } = await supabaseAdmin
        .from('users')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw new Error(error.message);
      }

      return data;
    } catch (error) {
      console.error('获取用户列表失败:', error);
      throw error;
    }
  }

  // 根据 ID 获取用户
  static async getUserById(id: string) {
    try {
      const { data, error } = await supabaseAdmin
        .from('users')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          return null; // 用户不存在
        }
        throw new Error(error.message);
      }

      return data;
    } catch (error) {
      console.error('获取用户失败:', error);
      throw error;
    }
  }

  // 根据邮箱获取用户
  static async getUserByEmail(email: string) {
    try {
      const { data, error } = await supabaseAdmin
        .from('users')
        .select('*')
        .eq('email', email)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          return null; // 用户不存在
        }
        throw new Error(error.message);
      }

      return data;
    } catch (error) {
      console.error('获取用户失败:', error);
      throw error;
    }
  }

  // 创建用户
  static async createUser(userData: {
    id: string;
    name: string;
    email: string;
    role?: 'admin' | 'user';
  }) {
    try {
      const { data, error } = await supabaseAdmin
        .from('users')
        .insert({
          ...userData,
          role: userData.role || 'user'
        })
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return data;
    } catch (error) {
      console.error('创建用户失败:', error);
      throw error;
    }
  }

  // 更新用户
  static async updateUser(id: string, updateData: {
    name?: string;
    email?: string;
    role?: 'admin' | 'user';
  }) {
    try {
      const { data, error } = await supabaseAdmin
        .from('users')
        .update({
          ...updateData,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return data;
    } catch (error) {
      console.error('更新用户失败:', error);
      throw error;
    }
  }

  // 删除用户
  static async deleteUser(id: string) {
    try {
      const { error } = await supabaseAdmin
        .from('users')
        .delete()
        .eq('id', id);

      if (error) {
        throw new Error(error.message);
      }

      return true;
    } catch (error) {
      console.error('删除用户失败:', error);
      throw error;
    }
  }
}

// 文章数据操作
export class PostService {
  // 获取所有文章
  static async getAllPosts() {
    try {
      const { data, error } = await supabaseAdmin
        .from('posts')
        .select(`
          *,
          users!posts_author_id_fkey (
            id,
            name,
            email
          )
        `)
        .order('created_at', { ascending: false });

      if (error) {
        throw new Error(error.message);
      }

      return data;
    } catch (error) {
      console.error('获取文章列表失败:', error);
      throw error;
    }
  }

  // 根据 ID 获取文章
  static async getPostById(id: string) {
    try {
      const { data, error } = await supabaseAdmin
        .from('posts')
        .select(`
          *,
          users!posts_author_id_fkey (
            id,
            name,
            email
          )
        `)
        .eq('id', id)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          return null; // 文章不存在
        }
        throw new Error(error.message);
      }

      return data;
    } catch (error) {
      console.error('获取文章失败:', error);
      throw error;
    }
  }

  // 创建文章
  static async createPost(postData: {
    title: string;
    content: string;
    author_id: string;
  }) {
    try {
      const { data, error } = await supabaseAdmin
        .from('posts')
        .insert(postData)
        .select(`
          *,
          users!posts_author_id_fkey (
            id,
            name,
            email
          )
        `)
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return data;
    } catch (error) {
      console.error('创建文章失败:', error);
      throw error;
    }
  }

  // 更新文章
  static async updatePost(id: string, updateData: {
    title?: string;
    content?: string;
  }) {
    try {
      const { data, error } = await supabaseAdmin
        .from('posts')
        .update({
          ...updateData,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select(`
          *,
          users!posts_author_id_fkey (
            id,
            name,
            email
          )
        `)
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return data;
    } catch (error) {
      console.error('更新文章失败:', error);
      throw error;
    }
  }

  // 删除文章
  static async deletePost(id: string) {
    try {
      const { error } = await supabaseAdmin
        .from('posts')
        .delete()
        .eq('id', id);

      if (error) {
        throw new Error(error.message);
      }

      return true;
    } catch (error) {
      console.error('删除文章失败:', error);
      throw error;
    }
  }
}

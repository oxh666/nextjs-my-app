import { db, ensureDatabaseInitialized } from './sqlite';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

export interface User {
  id: number;
  email: string;
  name: string;
  role: 'admin' | 'user';
  created_at: string;
  updated_at: string;
}

export interface CreateUserData {
  password: string;
  name: string;
  role?: 'admin' | 'user';
}

export interface LoginData {
  username: string;
  password: string;
}

export interface Session {
  id: number;
  user_id: number;
  token: string;
  expires_at: string;
  created_at: string;
}

export interface LoginResult {
  user: User;
  token: string;
  expiresAt: string;
}

export class UserService {
  // JWT密钥（生产环境应该从环境变量获取）
  private static readonly JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
  private static readonly TOKEN_EXPIRES_IN = '7d'; // 7天过期

  // 创建用户
  static async createUser(userData: CreateUserData): Promise<User> {
    try {
      ensureDatabaseInitialized();
      // 检查用户名是否已存在
      const existingUser = db.prepare('SELECT id FROM users WHERE name = ?').get(userData.name);
      if (existingUser) {
        throw new Error('用户名已被注册');
      }

      // 加密密码
      const passwordHash = await bcrypt.hash(userData.password, 12);

      // 插入用户
      const result = db.prepare(`
        INSERT INTO users (email, password_hash, name, role) 
        VALUES (?, ?, ?, ?)
      `).run(
        '', // 邮箱字段设为空字符串
        passwordHash,
        userData.name,
        userData.role || 'user'
      );

      // 获取创建的用户
      const user = db.prepare('SELECT id, email, name, role, created_at, updated_at FROM users WHERE id = ?').get(result.lastInsertRowid) as User;
      
      return user;
    } catch (error) {
      console.error('创建用户失败:', error);
      throw error;
    }
  }

  // 验证用户登录并生成TOKEN
  static async validateUserAndCreateSession(loginData: LoginData): Promise<LoginResult | null> {
    try {
      ensureDatabaseInitialized();
      
      // 获取用户信息
      const user = db.prepare(`
        SELECT id, email, password_hash, name, role, created_at, updated_at 
        FROM users WHERE name = ?
      `).get(loginData.username) as (User & { password_hash: string });

      if (!user) {
        return null;
      }

      // 验证密码
      const isValidPassword = await bcrypt.compare(loginData.password, user.password_hash);
      if (!isValidPassword) {
        return null;
      }

      // 生成JWT TOKEN
      const token = jwt.sign(
        { 
          userId: user.id, 
          email: user.email,
          role: user.role 
        },
        this.JWT_SECRET,
        { expiresIn: this.TOKEN_EXPIRES_IN }
      );

      // 计算过期时间
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 7); // 7天后过期

      // 存储会话到数据库
      db.prepare(`
        INSERT INTO sessions (user_id, token, expires_at) 
        VALUES (?, ?, ?)
      `).run(user.id, token, expiresAt.toISOString());

      // 返回用户信息（不包含密码）和TOKEN
      const { password_hash, ...userWithoutPassword } = user;
      return {
        user: userWithoutPassword,
        token,
        expiresAt: expiresAt.toISOString()
      };
    } catch (error) {
      console.error('验证用户失败:', error);
      throw error;
    }
  }

  // 验证TOKEN
  static async validateToken(token: string): Promise<User | null> {
    try {
      ensureDatabaseInitialized();
      
      // 验证JWT TOKEN
      const decoded = jwt.verify(token, this.JWT_SECRET) as any;
      
      // 检查会话是否存在于数据库且未过期
      const session = db.prepare(`
        SELECT s.*, u.id, u.email, u.name, u.role, u.created_at, u.updated_at
        FROM sessions s
        JOIN users u ON s.user_id = u.id
        WHERE s.token = ? AND s.expires_at > datetime('now')
      `).get(token) as (Session & User);

      if (!session) {
        return null;
      }

      // 返回用户信息
      return {
        id: session.id,
        email: session.email,
        name: session.name,
        role: session.role,
        created_at: session.created_at,
        updated_at: session.updated_at
      };
    } catch (error) {
      console.error('验证TOKEN失败:', error);
      return null;
    }
  }

  // 登出（删除会话）
  static async logout(token: string): Promise<boolean> {
    try {
      ensureDatabaseInitialized();
      
      const result = db.prepare('DELETE FROM sessions WHERE token = ?').run(token);
      return result.changes > 0;
    } catch (error) {
      console.error('登出失败:', error);
      throw error;
    }
  }

  // 清理过期会话
  static async cleanExpiredSessions(): Promise<number> {
    try {
      ensureDatabaseInitialized();
      
      const result = db.prepare('DELETE FROM sessions WHERE expires_at <= datetime("now")').run();
      return result.changes;
    } catch (error) {
      console.error('清理过期会话失败:', error);
      throw error;
    }
  }

  // 根据 ID 获取用户
  static async getUserById(id: number): Promise<User | null> {
    try {
      const user = db.prepare(`
        SELECT id, email, name, role, created_at, updated_at 
        FROM users WHERE id = ?
      `).get(id) as User;

      return user || null;
    } catch (error) {
      console.error('获取用户失败:', error);
      throw error;
    }
  }

  // 根据邮箱获取用户
  static async getUserByEmail(email: string): Promise<User | null> {
    try {
      const user = db.prepare(`
        SELECT id, email, name, role, created_at, updated_at 
        FROM users WHERE email = ?
      `).get(email) as User;

      return user || null;
    } catch (error) {
      console.error('获取用户失败:', error);
      throw error;
    }
  }

  // 获取所有用户
  static async getAllUsers(): Promise<User[]> {
    try {
      const users = db.prepare(`
        SELECT id, email, name, role, created_at, updated_at 
        FROM users ORDER BY created_at DESC
      `).all() as User[];

      return users;
    } catch (error) {
      console.error('获取用户列表失败:', error);
      throw error;
    }
  }

  // 更新用户信息
  static async updateUser(id: number, updates: Partial<Pick<User, 'name' | 'role'>>): Promise<User | null> {
    try {
      const setClause = Object.keys(updates).map(key => `${key} = ?`).join(', ');
      const values = Object.values(updates);

      if (setClause) {
        db.prepare(`
          UPDATE users SET ${setClause} WHERE id = ?
        `).run(...values, id);
      }

      return await this.getUserById(id);
    } catch (error) {
      console.error('更新用户失败:', error);
      throw error;
    }
  }

  // 删除用户
  static async deleteUser(id: number): Promise<boolean> {
    try {
      const result = db.prepare('DELETE FROM users WHERE id = ?').run(id);
      return result.changes > 0;
    } catch (error) {
      console.error('删除用户失败:', error);
      throw error;
    }
  }
}

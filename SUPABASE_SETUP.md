# Supabase 完整设置指南

## 🚀 为什么选择 Supabase？

- ✅ **无地区限制**：全球可访问
- ✅ **免费层**：500MB 存储，50,000 行读取/月
- ✅ **PostgreSQL**：支持 JSON 字段（类似 NoSQL）
- ✅ **内置功能**：认证、实时订阅、存储
- ✅ **与 Vercel 完美集成**

## 📋 快速设置步骤

### 1. 创建 Supabase 账户

1. 访问 [Supabase](https://supabase.com)
2. 点击 "Start your project"
3. 使用 GitHub 或邮箱注册

### 2. 创建新项目

1. 点击 "New Project"
2. 选择组织（或创建新组织）
3. 填写项目信息：
   - **Name**: `myapp-db`
   - **Database Password**: jojo0307
   - **Region**: 选择离你最近的地区
4. 点击 "Create new project"

### 3. 获取连接信息

1. 在项目仪表板中，点击 "Settings" → "API"
2. 复制以下信息：
   - **Project URL**: `https://your-project.supabase.co`
   - **anon public**: 公开密钥
   - **service_role**: 服务角色密钥（保密）

### 4. 配置环境变量

创建 `.env.local` 文件并添加：

```bash
# Supabase 配置
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# JWT 密钥（可选，Supabase 有自己的认证系统）
JWT_SECRET=your-super-secret-jwt-key-here

# 应用配置
NODE_ENV=development
```

### 5. 创建数据库表

1. 在 Supabase 仪表板中，点击 "SQL Editor"
2. 复制 `database-schema.sql` 文件中的内容
3. 粘贴到 SQL 编辑器中并执行

这将创建：
- `users` 表（用户信息）
- `posts` 表（文章数据）
- 必要的索引和安全策略
- 默认管理员用户

## 🔧 使用 Supabase 的优势

### 1. **内置认证系统**
```typescript
// 无需自己实现 JWT，Supabase 提供完整的认证
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
)

// 用户注册
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'password'
})
```

### 2. **实时数据同步**
```typescript
// 实时监听数据变化
const subscription = supabase
  .channel('users')
  .on('postgres_changes', 
    { event: '*', schema: 'public', table: 'users' },
    (payload) => console.log('数据变化:', payload)
  )
  .subscribe()
```

### 3. **存储服务**
```typescript
// 文件上传
const { data, error } = await supabase.storage
  .from('avatars')
  .upload('public/avatar1.png', file)
```

## 📊 免费层限制对比

| 服务 | 存储 | 读取/月 | 写入/月 | 地区限制 |
|------|------|---------|---------|----------|
| Supabase | 500MB | 50,000 | 50,000 | 无 |
| MongoDB Atlas | 512MB | 1B | 无限制 | 有 |
| PlanetScale | 5GB | 1B | 无限制 | 无 |

## 🚀 快速开始

1. **安装 Supabase 客户端**：
   ```bash
   npm install @supabase/supabase-js
   ```

2. **创建 Supabase 客户端**：
   ```typescript
   // lib/supabase.ts
   import { createClient } from '@supabase/supabase-js'
   
   export const supabase = createClient(
     process.env.SUPABASE_URL!,
     process.env.SUPABASE_ANON_KEY!
   )
   ```

3. **创建数据表**：
   ```sql
   -- 在 Supabase SQL 编辑器中执行
   CREATE TABLE users (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     name TEXT NOT NULL,
     email TEXT UNIQUE NOT NULL,
     role TEXT DEFAULT 'user',
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );
   ```

## 🔄 从 MongoDB 迁移到 Supabase

如果你已经有 MongoDB 代码，可以这样迁移：

```typescript
// 原来的 MongoDB 代码
const user = await UserModel.findById(id);

// 迁移到 Supabase
const { data: user, error } = await supabase
  .from('users')
  .select('*')
  .eq('id', id)
  .single();
```

## 🧪 测试 Supabase 集成

### 1. 启动开发服务器

```bash
npm run dev
```

### 2. 测试连接

访问测试接口：
- **连接测试**: `http://localhost:3000/api/test-supabase`
- **健康检查**: `http://localhost:3000/api/health`

### 3. 测试认证功能

```bash
# 注册用户
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "测试用户",
    "email": "test@example.com",
    "password": "password123"
  }'

# 登录用户
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### 4. 测试用户管理

```bash
# 获取用户列表（需要认证）
curl -X GET http://localhost:3000/api/users \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

## 🚀 部署到 Vercel

### 1. 配置 Vercel 环境变量

在 Vercel 项目设置中添加：
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `JWT_SECRET`

### 2. 部署

```bash
# 推送到 GitHub
git add .
git commit -m "Add Supabase integration"
git push origin main

# Vercel 会自动部署
```

## 📊 API 路由总览

| 路由 | 方法 | 功能 | 认证 |
|------|------|------|------|
| `/api/auth/register` | POST | 用户注册 | 否 |
| `/api/auth/login` | POST | 用户登录 | 否 |
| `/api/auth/logout` | POST | 用户登出 | 是 |
| `/api/auth/me` | GET | 获取当前用户 | 是 |
| `/api/users` | GET | 获取用户列表 | 是 |
| `/api/users` | POST | 创建用户 | 是 |
| `/api/users/[id]` | GET | 获取单个用户 | 是 |
| `/api/users/[id]` | PUT | 更新用户 | 是 |
| `/api/users/[id]` | DELETE | 删除用户 | 是 |
| `/api/test-supabase` | GET | 测试连接 | 否 |

## 🔒 安全特性

1. **行级安全策略 (RLS)**：数据库级别的访问控制
2. **JWT 认证**：安全的用户认证
3. **角色权限**：管理员和普通用户权限分离
4. **数据验证**：使用 Zod 进行输入验证

## 📞 支持资源

- [Supabase 文档](https://supabase.com/docs)
- [Supabase 社区](https://github.com/supabase/supabase/discussions)
- [Vercel + Supabase 集成](https://vercel.com/integrations/supabase)

## 🎯 总结

✅ **已完成的功能**：
- Supabase 数据库集成
- 用户认证系统
- 用户管理 API
- 安全策略配置
- 测试接口

✅ **优势**：
- 无地区限制
- 内置认证系统
- 实时数据同步
- 免费层足够使用
- 与 Vercel 完美集成

现在你的项目已经完全迁移到 Supabase！🎉

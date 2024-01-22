This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## 目录详解
```text
|-- app 包含应用程序的所有路由、组件和逻辑，这是您主要工作的地方。
    |   |-- favicon.ico
    |   |-- globals.css
    |   |-- layout.tsx
    |   |-- page.tsx
    |   |-- lib 包含应用程序中使用的函数，例如可重用的实用函数和数据获取函数。
    |   |-- ui包含应用程序的所有 UI 组件，例如卡片、表格和表单。为了节省时间，我们为您预先设计了这些组件的样式。
|-- public 包含应用程序的所有静态资源，例如图像。
|-- scripts 包含一个播种脚本，您将在后面的章节中使用它来填充数据库。
```

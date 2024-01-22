"use client";
import { inter } from '@/app/ui/fonts';
import "./globals.css";

export default function RootLayout( {
                                      children,
                                    }: Readonly<{
  children: React.ReactNode;
}> ) {
  return (
    <html lang="en">
    {/*<body className={inter.className}>{children}</body>*/ }
    <body  className={ `${ inter.className } antialiased` }>{ children }</body>
    </html>
  );
}

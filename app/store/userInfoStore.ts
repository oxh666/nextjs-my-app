import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserInfoStore {
  isVisitor: boolean;
  userInfo: any;
  token: string | null;
  setUserInfo: (userInfo: any) => void;
  setIsVisitor: (isVisitor: boolean) => void;
  setToken: (token: string | null) => void;
  checkTokenAndSetVisitor: () => void;
  logout: () => void;
}

export const useUserInfoStore = create<UserInfoStore>()(
    persist(
      (set, get) => ({
        isVisitor: true, // 默认为访客
        userInfo: null,
        token: null,
        setUserInfo: (userInfo: any) => set({ userInfo }),
        setIsVisitor: (isVisitor: boolean) => set({ isVisitor }),
        setToken: (token: string | null) => {
          // 一次性设置 token 和 isVisitor 状态
          set({ token, isVisitor: !token });
        },
        checkTokenAndSetVisitor: () => {
          // 检查 localStorage 中的 token
          if (typeof window !== 'undefined') {
            const storedToken = localStorage.getItem('token');
            const currentState = get();
            
            // 只有当状态需要更新时才调用 set
            if (storedToken && (currentState.token !== storedToken || currentState.isVisitor !== false)) {
              set({ token: storedToken, isVisitor: false });
            } else if (!storedToken && (currentState.token !== null || currentState.isVisitor !== true)) {
              set({ token: null, isVisitor: true });
            }
          }
        },
        logout: () => {
          // 清除 token 和用户信息，设置为访客
          if (typeof window !== 'undefined') {
            localStorage.removeItem('token');
          }
          set({ token: null, userInfo: null, isVisitor: true });
        },
      }),
      {
        name: "user-info-storage",
        storage: {
          getItem: (name) => {
            const str = sessionStorage.getItem(name);
            return str ? JSON.parse(str) : null;
          },
          setItem: (name, value) => {
            sessionStorage.setItem(name, JSON.stringify(value));
          },
          removeItem: (name) => sessionStorage.removeItem(name),
        },
      }
    )
  );
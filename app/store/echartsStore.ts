import { create } from "zustand";
// 定义 store 的类型接口
interface EchartsStore {
  option: echarts.EChartsOption;
  setOption: (option: echarts.EChartsOption) => void;
  getOption: () => echarts.EChartsOption;
}

export const useEchartsStore = create<EchartsStore>((set, get) => ({
  option: {} as echarts.EChartsOption,
  setOption: (option: echarts.EChartsOption) => set({ option }),
  getOption: (): echarts.EChartsOption => get().option,
}));

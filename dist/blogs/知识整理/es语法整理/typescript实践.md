## typescript 实践

#### 基础使用

```typescript
// 基本数据类型
const result: boolean = false;
const width: number = 100;
const name: string = "张三";

// 数组表示方法
const ages: number[] = [1, 2, 3];
const widths: Array<number> = [1, 2, 3];
const readonlys: ReadonlyArray<number> = [1, 2, 3]; //只读数组

// 接口 对象表示
interface Props {
  readonly width: number; // 只读类型
  label: string;
  color?: string; // 可选类型
  doSomething(name: string): string; // 方法类型
  [propName: string]: any; // 索引签名
}

// 接口 函数表示
interface Fun {
  (source: string, subString: string): boolean;
}

// 接口 扩展
interface IProps extends Props, BProps {
  extralName: string;
}
```

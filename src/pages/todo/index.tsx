import { useState, useCallback } from 'react'
type Item = {
    name: string,
    id: number,
}
type Itemarr = Item[];
// type A1 = Omit<Item, 'name'>;
// type A2 = Exclude<'name', Item>;
// type A3 = Pick<Item, 'name'>;
// type A6 = "a" | "b" | "c";
// type A4 = Partial<Record<A6, Itemarr>>;
// const a: A4 = {
//     b: [{
//         name: "111",
//         id: 111,
//     }]
// };
// type A = number | string | boolean;
// type B = number

// type Foo = Exclude<A, B>;
// // 相当于
// type A7 = ReturnType<() => boolean>;
// type A8 = Parameters<(a: string, id: number) => {}>;
// // 高级类型
// // keyof 返回key的联合
// type A9 = keyof Item;
// const keys: A9 = "name" || "id"
// // T[K]
// type A10 = Item['name'];
// // & 同key不同类型 never
// // type A =B&C&D
// // extends 接口继承和条件判断 
// type A12 = 'x' | 'y' extends 'x' ? 1 : 2;
// type P<T>= T extends 'x'?1:2;
// // 泛型会进行分发
// type A13=P<'x'|"y">;
// // 中括号会去代表整体不分发
// type K<T>= [T] extends ['x']?1:2;
// type A14=K<'x'|"y">;
// // infer 用于extend 条件判断子句中 如果R，U都是U ，协变返回联合类型 逆变位置返回&类型
// type PropertyType<T>=T extends {id:infer U,name: infer R}?[U,R]:T;
// type User={
//     id:number,
//     name:string,
// }
// type A15 =PropertyType<User>;

export default function MYdoto() {
    const [search, setSearch] = useState<string>('');
    const [todolist, setLodoList] = useState<Itemarr>([]);
    const add = useCallback(
        () => {
            setLodoList(todolist.concat({
                name: search,
                id: new Date().getTime() + 1,
            }))
        },
        [search, todolist]
    );
    const mySearchChange = useCallback(
        (e) => {
            const { value } = e.target;
            console.log(value);
            setSearch(value);
        },
        [search],
    );
    const mydelet = (i: Item) => {
        const data = todolist.filter((j) => {
            return j.id !== i.id;
        })
        setLodoList(data);
    }

    return (
        <div>
            <input value={search} onChange={mySearchChange}></input>
            <button onClick={add}>tianjia</button>
            <div>
                {todolist.map((i, index) => {
                    return (
                        <>
                            <div key={index} >
                                {i.name}
                                <span onClick={() => mydelet(i)}>删除</span>
                            </div>
                        </>)
                })}
            </div>
        </div>
    )
}

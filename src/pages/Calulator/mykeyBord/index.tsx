import {useState,useEffect} from 'react';
import './index.css';
type Iprops = {
    visibile: boolean,
    // 键盘点击数字
    keybordMOneyChange: Function,
    // 倒退清除一位
    setClearInputValue: Function,
    // 输入框的钱
    inputValue: string,
    // 提现
    drawMoney: Function,
    resMoney:number
}

// 键盘
export default function KeyBord({ visibile, keybordMOneyChange, setClearInputValue, inputValue, resMoney, drawMoney }: Iprops) {
       // 单次超过3000 控制按钮
    const [controMax, setControMax] = useState<boolean>(false);
    const canDarwMoneyStyle=()=>{
        return {
            backgroundColor: controMax  ? '#f7f8fa': '#1678ff' ,
            color: controMax ?  'black': '#fff' ,
        }
    };
    useEffect(() => {
        if (Number(inputValue) > resMoney) {
            setControMax(true);
        } else {
            setControMax(false);
        }
    }, [inputValue]);
    return (
        <div>
            {
                visibile && <div className="keybord">
                    <div className="number">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '.'].map((i: number | string, index: number) => {
                            return <div key={index} onClick={() => keybordMOneyChange(i)} className={index === 10 ? 'lastDot' : index === 9 ? 'zero' : ""}>{i}</ div>
                        })}
                    </div>
                    <div className="getMoney">
                        <div className="clearTop" onClick={() => setClearInputValue(`${inputValue.slice(0, -1)}`)}>X</div>
                        <div className="button"
                            style={canDarwMoneyStyle()}
                            onClick={() => drawMoney()}>
                            提现
                        </div>
                    </div>
                </div>
            }

        </div>
    )
}

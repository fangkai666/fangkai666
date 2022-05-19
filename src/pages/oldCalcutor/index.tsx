import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import './index.css'

export enum RangeMoneyTText {
    default = "",
    thousand = '千',
    tenThousand = "万",
    oneHundredThousand = '十万',
    million = '百万',
    tenMillion = "千万",
}
// 弹窗
type Iprops = {
    setShow: Function,
    inputValue: string,
    resMoney: number,
};
const DialogModal = ({ setShow, inputValue, resMoney }: Iprops) => {
    const Wrap = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.7);
  `;

    const Center = styled.div`
    width: 400px;
    height: 500px;
    background-color: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  `;
    const wrap = (ev: any) => {
        ev.stopPropagation();
    };
    const text = "账号余额已经不足，请充值";
    return <Wrap>
        <Center onClick={wrap} >
            <span onClick={() => setShow(false)}>X</span>
            {resMoney >= 0 ? <h2>{`提现成功${inputValue}元`}</h2> : <div>{text}</div>}
        </Center>
    </Wrap>
};
export type PayedListType = {
    get: number,
    tip: number
}[];
var timer;
/***
 * @description 单次最大输入3000 && 控制透支不超过(3000-1000)*0.001元
 */
const Mycalculator: React.FC<{}> = ({ }) => {
    // 输入框内容
    const [inputValue, setInputValue] = useState<string>('');
    // 剩余额度
    const [freeTip, setFreeTip] = useState<number>(1000);
    // 可用额度
    const [resMoney, setResMoney] = useState<number>(3000);
    // 键盘的
    const [visibile, setVisibile] = useState<boolean>(false);
    // payedList 支付记录 
    const [payedList, setPayedList] = useState<PayedListType>([]);
    // 头部文案
    const [myRangeMoneyTText, setRangeMoneyTText] = useState<RangeMoneyTText>(RangeMoneyTText.default);
    // 弹窗的
    const [show, setShow] = useState<boolean>(false);
    // 单次超过3000 控制按钮
    const [controMax, setControMax] = useState<boolean>(false);
    const dealMoney = (e: any) => {
        const { value } = e.target;
        setInputValue(value);
    }
    const dealRangeMoneyText = () => {
        const lengthFlag = Number(inputValue).toFixed(0).length;
        switch (true) {
            case (lengthFlag === 4):
                setRangeMoneyTText(RangeMoneyTText.thousand);
                break;
            case (lengthFlag === 5):
                setRangeMoneyTText(RangeMoneyTText.tenThousand);
                break;
            case (lengthFlag === 6):
                setRangeMoneyTText(RangeMoneyTText.oneHundredThousand);
                break;
            case (lengthFlag === 7):
                setRangeMoneyTText(RangeMoneyTText.million);
                break;
            case (lengthFlag === 8):
                setRangeMoneyTText(RangeMoneyTText.tenMillion);
                break;
            default:
                setRangeMoneyTText(RangeMoneyTText.default);
                break;
        }
    }
    // 数字键盘
    const keybordMOneyChange = (i: any) => {
        setInputValue(`${inputValue}${i}`);
    };
    const showFooter = () => {
        if (+Number(inputValue).toFixed(0) <= resMoney) {
            if (freeTip === 0) {
                return (<div>{`预计收取${(Number(inputValue)) * 0.001}元`}</div>);
            }
            if (freeTip >= 0 && freeTip > Number(inputValue)) {
                return (<div>{`免费额度剩余${freeTip}，超出收0.1%服务费 ！`}</div>);
            } else if (freeTip > 0 && freeTip < Number(inputValue)) {
                return (<div>{`预计收取${(Number(inputValue) - freeTip) * 0.001}元`}</div>);
            }
        } else {
            let tooltip = resMoney
            if (resMoney === 3000) {
                tooltip = 3000
            } else {
                tooltip = Number(inputValue) - resMoney;
            }
            return (<>{!show && <div style={{ color: 'red' }}>{` 超出可用余额度(￥${tooltip})`}</div>}</>)
        }
    }

    useEffect(() => {
        // 展示头部 百,千,万
        dealRangeMoneyText();
        // 展示底部
        if (Number(inputValue) > 3000) {
            setControMax(true);
        } else {
            setControMax(false);
        }
        if (resMoney + 2 < +inputValue) {
            console.log("金额超出");
            setControMax(true);
            return;
        } else {
            setControMax(false);
        }
    }, [inputValue, freeTip]);
    // 提现
    const drawMoney = (val = 0) => {
        if (resMoney <= 0) {
            console.log("账户余额不足");
            setShow(true);
            return;
        };
        if (resMoney + 2 < +inputValue) {
            console.log("金额超出");
            return;
        }
        setShow(true);
        let money = Number(inputValue);
        if (val !== 0) {
            money = resMoney;
        }
        const myDeal = () => {
            if (freeTip > 0) {
                if (money <= freeTip) {
                    setFreeTip(freeTip - money);
                    setResMoney(resMoney - money);
                    if (payedList.length === 3) {
                        setPayedList(payedList.slice(1, 3).concat({
                            get: money,
                            tip: 0,
                        }));
                    } else {
                        setPayedList(payedList.concat({
                            get: money,
                            tip: 0,
                        }));
                    }
                } else {
                    // 有免费额度但是不足
                    // console.log(freeTip,Number(inputValue),resMoney-Number(inputValue)-(Number(inputValue)-freeTip)*0.001);   
                    setResMoney(resMoney - money - (money - freeTip) * 0.001);
                    setFreeTip(0);
                    if (payedList.length === 3) {
                        setPayedList(payedList.slice(1, 3).concat({
                            get: money,
                            tip: (money - freeTip) * 0.001,
                        }));
                    } else {
                        setPayedList(payedList.concat({
                            get: money,
                            tip: (money - freeTip) * 0.001,
                        }));
                    }
                }
            } else {
                setResMoney(resMoney - money - (money) * 0.001);
                if (payedList.length === 3) {
                    setPayedList(payedList.slice(1, 3).concat({
                        get: money,
                        tip: (money) * 0.001,
                    }));
                } else {
                    setPayedList(payedList.concat({
                        get: money,
                        tip: (money) * 0.001,
                    }));
                }
            }
        }
        myDeal();
        timer = setTimeout(() => {
            setInputValue('');
            setShow(false);
            timer = null;
        }, 1000);
    }
    // 视图逻辑抽离  class方式写方法
    return (
        <>
            {
                show && <DialogModal setShow={setShow} inputValue={inputValue} resMoney={resMoney} />

            }
            {/* 订单 */}
            <div style={{ marginBottom: '100px' }}>
                <div >我是订单(最近3次)</div><ul>
                    {payedList.map((i: any, index: number) => {
                        return (
                            <li key={index}>{`第${index + 1}次 取钱：${i.get}元,服务费：${i.tip}元`}</li>
                        )
                    })
                    }
                </ul>
            </div>
            {/* 输入框 */}
            <div className='onuter'>
                <div className='title'>提取金额</div>
                <div style={{ height: '20px' }}>{myRangeMoneyTText}</div>
                <div className="userInput">
                    <div className='pre'>￥</div>
                    <input
                        // onBlur={()=> setVisibile(false)}
                        onFocus={() => setVisibile(true)}
                        value={inputValue === '' ? '' : inputValue} onChange={dealMoney} />
                    {inputValue === '' ?
                        <div className='hasClear'>
                            <div onClick={() => drawMoney(resMoney)} >全部提现</div>
                            <div style={{
                                color: '#8b8c8e',
                                fontSize: '16px'
                            }}> {'￥' + resMoney}</ div>
                        </div>
                        : <div onClick={() => setInputValue('')} className='clear'>x</div>}
                </div>
                <div className="footer">{showFooter()}</div>
            </div>
            {/* 键盘 */}
            {
                visibile && <div className="keybord">
                    <div className="number">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '.'].map((i: number | string, index: number) => {
                            return <div key={index} onClick={() => keybordMOneyChange(i)} className={index === 10 ? 'lastDot' : index === 9 ? 'zero' : ""}>{i}</ div>
                        })}
                    </div>
                    <div className="getMoney">
                        <div className="clearTop" onClick={() => setInputValue(`${inputValue.slice(0, -1)}`)}>X</div>
                        <div className="button"
                            style={{
                                backgroundColor: !controMax && resMoney >= 0 ? '#1678ff' : '#f7f8fa',
                                color: !controMax && resMoney >= 0 ? '#fff' : 'black',
                            }}
                            onClick={() => drawMoney()}>
                            提现
                        </div>
                    </div>
                </div>
            }
        </>
    )
}
export default Mycalculator;
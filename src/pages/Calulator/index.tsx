import React, { useState } from 'react';
import './index.css';

import KeyBord from './mykeyBord';
import Modal from './Modal';
import MyPayedList from './PayedList';
import UserInput from './Input';

export type payListItem = {
  get: number;
  tip: number;
};
import tradeControl from '../../util/calculatorUtils';
export type PayedListType = payListItem[];
/***
 * @description 提现计算器
 */
const Mycalculator: React.FC<{}> = ({}) => {
  // 输入框内容
  const [inputValue, setInputValue] = useState<string>('');
  // 剩余免费额度
  const [freeTip, setFreeTip] = useState<number>(1000);
  // 可用额度
  const [restMoney, setRestMoney] = useState<number>(3000);
  // 实际提现额度 用于弹窗告知
  const [realMoney, setRealMoney] = useState<number>(0);
  // payedList 支付记录
  const [payedList, setPayedList] = useState<PayedListType>([]);

  // 弹窗的
  const [show, setShow] = useState<boolean>(false);
  // 键盘的
  const [visibile, setVisibile] = useState<boolean>(false);

  // 数字键盘
  const keybordMOneyChange = (i: string | number) => {
    setInputValue(`${inputValue}${i}`);
  };
  // 存进订单
  const getIntoPayedList = (getIn: number, tip: number) => {
    if (payedList.length === 3) {
      setPayedList(
        payedList.slice(1, 3).concat({
          get: getIn,
          tip: tip,
        }),
      );
    } else {
      setPayedList(
        payedList.concat({
          get: getIn,
          tip: tip,
        }),
      );
    }
  };
  // 提现( 能否交易 =》 进行交易会把免额用完？ =》 存入交易订单 )
  const drawMoney = (drawAllMoney: boolean = false) => {
    let manage = new tradeControl(
      restMoney,
      +inputValue,
      freeTip,
      drawAllMoney,
    );
    if (manage.canNotTrade) {
      alert('余额不足 无法完成交易');
      return;
    }
    let money = manage.IwantDraw();

    if (manage.useNotAllFreeTip()) {
      setFreeTip(freeTip - money);
      setRealMoney(money);
      getIntoPayedList(money, 0);
    } else {
      // 用完免费额度
      setFreeTip(0);
      const realGet = manage.returnReal();
      setRealMoney(realGet);
      getIntoPayedList(realGet, manage.returnConstTip());
    }

    setRestMoney(restMoney - money);
    // 打开弹窗 1s关闭
    setShow(true);
    setVisibile(false);
    let timer: NodeJS.Timeout | undefined;
    timer = setTimeout(() => {
      setShow(false);
      setInputValue('');
      clearTimeout(timer);
    }, 1000);
  };
  // 视图逻辑抽离  class方式写方法 设计模式
  return (
    <div>
      {/* 弹窗 */}
      <Modal show={show} setShow={setShow} realMoney={realMoney} />
      {/* 订单 */}
      <MyPayedList payedList={payedList} />
      {/* 输入框 */}
      <UserInput
        freeTip={freeTip}
        setVisibile={setVisibile}
        inputValue={inputValue}
        resMoney={restMoney}
        drawMoney={drawMoney}
        setInputValue={setInputValue}
      />
      {/* 键盘 */}
      <KeyBord
        visibile={visibile}
        keybordMOneyChange={keybordMOneyChange}
        setClearInputValue={setInputValue}
        inputValue={inputValue}
        resMoney={restMoney}
        drawMoney={drawMoney}
      />
    </div>
  );
};
export default Mycalculator;

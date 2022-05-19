import { useEffect, useState } from 'react';
import './index.css';

enum RangeMoneyTextType {
  default = '',
  thousand = '千',
  tenThousand = '万',
  oneHundredThousand = '十万',
  million = '百万',
  tenMillion = '千万',
}
type Iprops = {
  setVisibile: Function;
  inputValue: string;
  resMoney: number;
  drawMoney: Function;
  setInputValue: Function;
  freeTip: number;
};
const strategies = {
  overCanUse: function (inputValue: number, canUse: number) {
    if (inputValue > canUse) {
      return (
        <div style={{ color: 'red' }}>{` 超出可用余额度(￥${
          inputValue - canUse
        })`}</div>
      );
    }
  },
  overFreeTip: function (inputValue: number, freeTip: number) {
    if (freeTip >= 0 && freeTip > inputValue) {
      return (
        <div>{`免费额度剩余${freeTip - inputValue}，超出收0.1%服务费 ！`}</div>
      );
    }
  },
  hasFreeTip: function (inputValue: number, freeTip: number, resMoney: number) {
    if (freeTip <= inputValue && inputValue <= resMoney) {
      return <div>{`预计收取${(inputValue - freeTip) * 0.001}元`}</div>;
    }
  },
};
const UserInput: React.FC<Iprops> = ({
  freeTip,
  setVisibile,
  inputValue,
  resMoney,
  setInputValue,
  drawMoney,
}) => {
  // 头部文案
  const [myRangeMoneyTText, setRangeMoneyTText] = useState<RangeMoneyTextType>(
    RangeMoneyTextType.default,
  );
  const dealRangeMoneyText = () => {
    const lengthFlag = Number(inputValue).toFixed(0).length;
    switch (true) {
      case lengthFlag === 4:
        setRangeMoneyTText(RangeMoneyTextType.thousand);
        break;
      case lengthFlag === 5:
        setRangeMoneyTText(RangeMoneyTextType.tenThousand);
        break;
      case lengthFlag === 6:
        setRangeMoneyTText(RangeMoneyTextType.oneHundredThousand);
        break;
      case lengthFlag === 7:
        setRangeMoneyTText(RangeMoneyTextType.million);
        break;
      case lengthFlag === 8:
        setRangeMoneyTText(RangeMoneyTextType.tenMillion);
        break;
      default:
        setRangeMoneyTText(RangeMoneyTextType.default);
        break;
    }
  };
  // 底部文案  提前return 分析较为合理条件 策略模式
  const showFooter = () => {
    var conditonOne = strategies.hasFreeTip(+inputValue, freeTip, resMoney);
    var conditionTwo = strategies.overFreeTip(+inputValue, freeTip);
    var conditionThree = strategies.overCanUse(+inputValue, resMoney);
    return conditonOne || conditionTwo || conditionThree;
  };
  useEffect(() => {
    dealRangeMoneyText();
  }, [inputValue]);
  return (
    <div>
      <div className="onuter">
        <div className="title">提取金额</div>
        <div style={{ height: '20px' }}>{myRangeMoneyTText}</div>
        <div className="userInput">
          <div className="pre">￥</div>
          <input
            readOnly
            onFocus={() => setVisibile(true)}
            value={inputValue === '' ? '' : inputValue}
          />
          {inputValue === '' ? (
            <div className="hasClear">
              <div onClick={() => drawMoney(true)}>全部提现</div>
              <div
                style={{
                  color: '#8b8c8e',
                  fontSize: '16px',
                }}
              >
                {' '}
                {'￥' + resMoney}
              </div>
            </div>
          ) : (
            <div onClick={() => setInputValue('')} className="clear">
              x
            </div>
          )}
        </div>
        <div className="footer">{showFooter()}</div>
      </div>
    </div>
  );
};
export default UserInput;

import { useState, useEffect } from 'react';
import './index.css';
import logo from '../../../assets/键盘删除.png';
type Iprops = {
  visibile: boolean;
  // 键盘点击数字
  keybordMOneyChange: Function;
  // 倒退清除一位
  setClearInputValue: Function;
  // 输入框的钱
  inputValue: string;
  // 提现
  drawMoney: Function;
  resMoney: number;
};

// 键盘 React.FC<IModalprops>
const KeyBord: React.FC<Iprops> = ({
  visibile,
  keybordMOneyChange,
  setClearInputValue,
  inputValue,
  resMoney,
  drawMoney,
}) => {
  // 单次超过可用额度 控制按钮
  const [controMax, setControMax] = useState<boolean>(false);
  const canDarwMoneyStyle = () => {
    return {
      backgroundColor: controMax ? '#f7f8fa' : '#1678ff',
      color: controMax ? 'black' : '#fff',
    };
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
        // visibile &&
        <div
          className={visibile ? 'keybord showKeybord' : 'keybord hideKeybord'}
        >
          <div className="number">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '.'].map(
              (i: number | string, index: number) => {
                return (
                  <div
                    key={index}
                    onClick={() => keybordMOneyChange(i)}
                    className={
                      index === 10 ? 'lastDot' : index === 9 ? 'zero' : ''
                    }
                  >
                    {i}
                  </div>
                );
              },
            )}
          </div>
          <div className="getMoney">
            <div
              className="clearTop"
              onClick={() => setClearInputValue(`${inputValue.slice(0, -1)}`)}
            >
              <img src={logo} />{' '}
            </div>
            <div
              className="button"
              style={canDarwMoneyStyle()}
              onClick={() => drawMoney()}
            >
              提现
            </div>
          </div>
        </div>
      }
    </div>
  );
};
export default KeyBord;

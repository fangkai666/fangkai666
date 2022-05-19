import React from 'react';
import styled from 'styled-components';
// 弹窗
type Iprops = {
    setShow: Function,
    realMoney: number
};
const DialogModal = ({ setShow, realMoney }: Iprops) => {
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
   const Text=styled.div`
   text-align: center;
   font-size:24px;
   `

    const wrap = (ev: any) => {
        ev.stopPropagation();
    };
    const text = "账号余额已经不足，请充值";
    return <Wrap>
        <Center onClick={wrap} >
            <div style={{
                textAlign:'right',
                fontSize:'24px',
                fontWeight:500
            }} onClick={() => setShow(false)}>X</div>
            {/* {resMoney >= 0 ? <h2>{`提现成功${inputValue}元`}</h2> : <div>{text}</div>} */}
            <Text> {`提现成功${realMoney}元`}</Text>
        </Center>
    </Wrap>
};

// 弹窗
type IModalprops = {
    show: boolean,
    setShow: Function,
    realMoney: number,
}
const Modal: React.FC<IModalprops>  = ({ show, setShow, realMoney }) => {
    return (
        <>
            {
                show && <DialogModal setShow={setShow} realMoney={realMoney} />

            }
        </>
    )
}
export default Modal;
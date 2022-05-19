import { PayedListType, payListItem } from '../index'

const MyPayedList = ({ payedList }: { payedList: PayedListType }) => {
  return (
    <div>
      <div style={{ marginBottom: '100px' }}>
        <div >我是订单(最近3次)</div>
        <ul>
          {payedList.map((i: payListItem, index: number) => {
            return (
              <li key={index}>{`第${index + 1}次 取钱：${i.get}元,服务费：${i.tip}元`}</li>
            )
          })
          }
        </ul>
      </div>
    </div>
  )
}
export default MyPayedList;
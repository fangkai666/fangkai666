class tradeControl {
  // 能否交易
  canNotTrade: boolean;
  restMoney;
  input;
  freeTip;
  isdrawAllMoney;
  constructor(
    restMoney: number,
    input: number,
    freeTip: number,
    isdrawAllMoney = false,
  ) {
    this.canNotTrade = input > restMoney ? true : false;
    this.restMoney = restMoney;
    this.input = input;
    this.freeTip = freeTip;
    this.isdrawAllMoney = isdrawAllMoney;
  }
  // 想取钱多少
  IwantDraw(): number {
    return this.isdrawAllMoney ? this.restMoney : this.input;
  }
  // 能否用完免额
  useNotAllFreeTip(): boolean {
    return this.freeTip >= this.IwantDraw();
  }
  // 真实获得金额
  returnReal(): number {
    return this.IwantDraw() - (this.IwantDraw() - this.freeTip) * 0.001;
  }
  // 服务费
  returnConstTip(): number {
    return (this.IwantDraw() - this.freeTip) * 0.001;
  }
}
export default tradeControl;

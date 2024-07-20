export default class ModalErrorMessage {
  readonly timeStamp: number;
  constructor(readonly message: string) {
    this.timeStamp = Date.now();
  }
}

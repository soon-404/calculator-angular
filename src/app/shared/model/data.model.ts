export class Data {
  public userName: string;
  public typeName: string;
  public calculateValue: number;
  
  constructor(userName: string, typeName: string, calculateValue: number) {
    this.userName = userName
    this.typeName = typeName
    this.calculateValue = calculateValue
  } 
}

export type UserData = {
  userName: string;
  typeName: string;
  calculateValue: number;
}

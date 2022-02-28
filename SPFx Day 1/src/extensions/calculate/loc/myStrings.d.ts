declare interface ICalculateCommandSetStrings {
  Command1: string;
  Command2: string;
}

declare module 'CalculateCommandSetStrings' {
  const strings: ICalculateCommandSetStrings;
  export = strings;
}

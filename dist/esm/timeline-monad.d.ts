interface timeline {
    type: string;
    now: any;
    sync: Function;
}
declare const T: (timeFunction?: Function) => timeline;
export { T };

export interface MyWorker {
  id?: number;
  name: string;
  surname: string;
  phone: string;
  type: number;
}

export enum MyWorkerType {
  programmer,
  designer,
  copywriter,
  manager,
}

// export let MyWorkersDatabase: MyWorker[] = [
//   { id: 1, name: 'Иван', surname: 'Иванов', phone: "+7 (916) 721-56-20", type: 0 },
//   { id: 2, name: 'Петр', surname: 'Петров', phone: "+7 (825) 781-44-66", type: 1 },
//   { id: 3, name: 'Сидор', surname: 'Сидоров', phone: "+7 (925) 720-22-17", type: 2 },
//   { id: 4, name: 'Василий', surname: 'Васильев', phone: "+7 (919) 740-75-16", type: 3 },
// ];
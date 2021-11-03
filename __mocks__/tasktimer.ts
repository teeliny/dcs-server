console.log('crazy  ioooiooi')
export class TaskTimer {
  time: number;
  scheduler: Record<string, any> = []
  constructor(time: number) {
    console.log('omo as if e reach here')
    // throw new Error()
    this.time = time
  }

  start() {
    const scheduler = this.scheduler
    setTimeout(scheduler.callback, scheduler.tickInterval * 1000)
  }
  
  add(val: Record<string, any>[]) {
    this.scheduler = val[0]
  }
}
 


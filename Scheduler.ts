class Scheduler_ {
	tasks: any[];
	timeouts: any[];
    constructor() {
        this.tasks = [];
        this.timeouts = [];
    }
    every(ms: any, callback: any) {
        this.tasks.push([ms, Date.now(), callback]);
    }
    after(ms: number, callback: any) {
        const handle = [Date.now() + ms, callback, false];
        this.timeouts.push(handle);
        return handle;
    }
    clear(handle: boolean[]) {
        if (handle) handle[2] = true;
    }
    update() {
        const now = Date.now();
        for (const task of this.tasks) {
            if (now - task[1] >= task[0]) {
                try {
                    task[2]();
                } catch (e) {
                    api.log("Error in scheduled task: " + e);
                }
                task[1] = now;
            }
        }

        if (this.timeouts.length > 0) {
            const remaining: any[] = [];
            for (const timeout of this.timeouts) {
                if (timeout[2]) continue;
                if (now >= timeout[0]) {
                    try {
                        timeout[1]();
                    } catch (e) {
						console.error(e);
                    }
                } else {
                    remaining.push(timeout);
                }
            }
            this.timeouts = remaining;
        }
    }
}

export const scheduler = new Scheduler_();

tick = (_ms: any) => {
  // scheduler.update();
}

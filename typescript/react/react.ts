
const callbacks: (() => void)[] = [];
const computed: ([() => number, number | undefined, boolean | undefined])[] = [];
export function createInput(init: number) {
    callbacks.length = 0;
    computed.length = 0;
    let curr = init;
    return [
        () => curr,
        (next: number): number | undefined => {
            const eqCompute = computed.find(([, , eq]) => eq);
            const predRes = () => eqCompute?.[0]?.();
            const currEq = predRes();
            curr = next;
            const nextEq = predRes();
            if (currEq && nextEq && currEq === nextEq) {
                return eqCompute![1];
            } else {
                return callbacks.reduce((acc, currPredicate) => {
                    currPredicate();
                    return acc;
                }, curr);
            }
        }
    ] as const;
}
export function createComputed(val: () => number, init?: number, eq?: boolean): () => number {
    computed.push([val, init, eq]);
    return val;
}
export function createCallback(val: () => void): () => void {
    callbacks.push(val);
    return () => {
        let valPos = callbacks.indexOf(val);
        if (valPos !== -1) {
            callbacks.splice(valPos, 1);
        }
    }
}
export function Timeout(milliseconds: number = 0) {

    return (targetComponent: Object, methodName: string, descriptor: TypedPropertyDescriptor<any>) => {

        let originalMethod = descriptor.value;

        descriptor.value = function (...args) {

            setTimeout(() => {
                originalMethod.apply(this, args);
            }, milliseconds);

        };

        return descriptor;
    }
}
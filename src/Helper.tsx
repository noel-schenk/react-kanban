import { useEffect, useState } from "react";
import { BehaviorSubject } from "rxjs";

const BehaviorSubjectToHook: <T>(behaviorSubject: BehaviorSubject<any>) => [T, React.Dispatch<React.SetStateAction<T>>] = (behaviorSubject: BehaviorSubject<any>) => {
    const [subject, setSubject] = useState(behaviorSubject.getValue());
    
    useEffect(() => {
        behaviorSubject.subscribe(val => {
            setSubject(val);
        });
    }, []);
    return [subject, setSubject];
};

const OnBehaviorSubjectHook: <T>(behaviorSubject: BehaviorSubject<any>, valReq: () => any) => [T,  React.Dispatch<React.SetStateAction<T>>] =  (behaviorSubject: BehaviorSubject<any>, valReq: () => any) => {
    const [subject, setSubject] = useState(valReq());

    useEffect(() => {
        behaviorSubject.subscribe(() => {
            console.log('subscribe trigger', behaviorSubject, valReq());
            setSubject(valReq());
        });
    }, []);
    return [subject, setSubject];
};

class BetterBehaviorSubject<T> extends BehaviorSubject<T> {
    trigger() {
        const value = this.getValue();
        if (value instanceof Array) {
            this.next([...(value as any)] as any);
        }        
    }
}

export {BehaviorSubjectToHook, OnBehaviorSubjectHook, BetterBehaviorSubject};

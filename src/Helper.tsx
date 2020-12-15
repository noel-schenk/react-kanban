import { useEffect, useState } from "react";
import { BehaviorSubject } from "rxjs";

const BehaviorSubjectToHook: <T>(behaviorSubject: BehaviorSubject<any>) => T = (behaviorSubject: BehaviorSubject<any>) => {
    const [subject, setSubject] = useState(behaviorSubject.getValue());
    
    useEffect(() => {
        behaviorSubject.subscribe(val => {
            setSubject(val);
        });
    }, []);
    return subject;
};

const OnBehaviorSubjectHook: <T>(behaviorSubject: BehaviorSubject<any>, valReq: () => any) => T =  (behaviorSubject: BehaviorSubject<any>, valReq: () => any) => {
    const [subject, setSubject] = useState(valReq());

    useEffect(() => {
        behaviorSubject.subscribe(() => {
            console.log('subscribe trigger');
            setSubject(valReq());
        });
    }, []);
    return subject;
};

export {BehaviorSubjectToHook, OnBehaviorSubjectHook};

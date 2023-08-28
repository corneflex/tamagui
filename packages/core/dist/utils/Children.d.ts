import React from 'react';
export declare class Children {
    static getSubComponents: <T, K extends keyof T>(children: React.ReactNode | React.ReactNode[], component: React.FC<any> & T) => { [key in K]: React.ReactElement<any, string | React.JSXElementConstructor<any>>; };
}

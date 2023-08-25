import React from 'react';
class Children {
    static getSubComponents = (children, component) => {
        const subComponentList = Object.keys(component);
        const subComponents = {};
        React.Children.forEach(children, (child) => {
            if (React.isValidElement(child) &&
                typeof child.type !== 'string' &&
                subComponentList.includes(child.type.name)) {
                subComponents[child.type.name] = child;
            }
        });
        return subComponents;
    };
}
export { Children };

import React from 'react'

export class Children {
  static getSubComponents = <T>(
    children: React.ReactNode | React.ReactNode[],
    component: React.FC<any> & T
  ): T => {
    const subComponentList = Object.keys(component)
    const subComponents = {} as T
    React.Children.forEach(children, (child) => {
      if (
        React.isValidElement(child) &&
        typeof child.type !== 'string' &&
        subComponentList.includes(child.type.name)
      ) {
        subComponents[child.type.name] = child
      }
    })
    return subComponents
  }
}

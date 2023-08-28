import React from 'react'

export class Children {
  static getSubComponents = <T, K extends keyof T>(
    children: React.ReactNode | React.ReactNode[],
    component: React.FC<any> & T
  ): { [key in K]: React.ReactElement } => {
    const subComponentList = Object.keys(component)
    const subComponents = {} as { [key in K]: React.ReactElement }
    React.Children.forEach(children, (child) => {
      if (
        React.isValidElement(child) &&
        typeof child.type !== 'string' &&
        subComponentList.includes(child.type.name)
      ) {
        subComponents[child.type.name] = child as React.ReactElement
      }
    })
    return subComponents
  }
}

/**
 * Copyright (c) CookieX.
 *  
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import System, { Units, Unit } from './System'

class SystemUnit<U extends Units> {
  public parser!: SystemUnit.Parser<U>

  constructor(
    public unit: Unit<U>,
    public system: System<U>,
    public singular: string,
    public plural: string
  ) {}

  public convert = ( parser: SystemUnit.Parser<U> ) => {
    this.parser = parser
    return this
  }
}

namespace SystemUnit {
  export interface Parser<U extends Units> {
    ( value: number, from: Unit<U>, to: Unit<U> ): number
  }
}

export = SystemUnit

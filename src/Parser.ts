import { Units, Unit } from './System'
import SystemUnit from './SystemUnit'

class Parser<U extends Units> {
  private __units: { [K in Unit<U>]: Parser.Calc } = {} as any

  constructor( private base: Unit<U> ) { this.add( base, value => value ) }

  public add: {
    ( unit: Unit<U>, calc: Parser.Calc ): Parser<U>
    ( unit: Unit<U>, op: Parser.Operators, value: number ): Parser<U>
  } = ( unit: Unit<U>, opOrCalc: Parser.Operators | Parser.Calc, value?: number ) => {
    if ( typeof opOrCalc === 'function' ) this.__units[unit] = opOrCalc
    else if ( value ) this.__units[unit] = from => {
      switch ( opOrCalc ) {
        case 'divide': return from / value
        case 'multiply': return from * value
        case 'subtraction': return from - value
        case 'sum': return from + value
        default: throw new Error( `unknown operator ${opOrCalc}` )
      }
    }
    else throw new Error( `Expect receive value to use operator ${opOrCalc}` )
    
    return this
  }

  public execute: SystemUnit.Parser<U> = ( value, from, to ) => {
    const baseValue = this.__units[from]( value )
    if ( !this.__units[to] ) throw new Error( `not find unit ${from}` )
    return this.__units[to]( baseValue )
  }

  public compile = () => this.execute
}

namespace Parser {
  export type Calc = ( value: number ) => number
  export type Operators = 'divide' | 'multiply' | 'sum' | 'subtraction'
}

export = Parser

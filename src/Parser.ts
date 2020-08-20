import { Units, Unit } from './System'
import SystemUnit from './SystemUnit'

class Parser<U extends Units> {
  private __units: { [K in Unit<U>]: {
    operator: Parser.Operators
    value: number
    unreverse: boolean
  } } = {} as any

  private static signal = ( operator: Parser.Operators, reverse = false ) => {
    switch ( operator ) {
      case 'multiply': return reverse ? '/' : '*'
      case 'divide': return !reverse ? '/' : '*'
      case 'sum': return reverse ? '-' : '+'
      case 'subtraction': return !reverse ? '-' : '+'
      default: throw new Error( '' )
      
    }
  }

  private static calc = ( x: number, operator: Parser.Operators, y: number, reverse = false ) => {
    switch ( operator ) {
      case 'divide':
        if ( reverse ) return x * y
        else return x / y
      case 'multiply':
        if ( reverse ) return x / y
        else return x * y
      case 'subtraction':
        if ( reverse ) return x + y
        else return x - y
      case 'sum':
        if ( reverse ) return x - y
        else return x + y
      default: throw new Error( '' )
      
    }
  }

  constructor( private base: Unit<U> ) { this.add( base, 'sum', 0 ) }

  public add = ( unit: Unit<U>, operator: Parser.Operators, value: number, unreverse = false ) => {
    this.__units[unit] = { operator, value, unreverse }

    return this
  }

  public execute: SystemUnit.Parser<U> = ( value, from, to ) => {
    const fromInfo = this.__units[from]
    const toInfo = this.__units[to]
    const fromCalc = Parser.calc( value, fromInfo.operator, fromInfo.value )
    const toCalc = Parser.calc( fromCalc, toInfo.operator, toInfo.value, true && !toInfo.unreverse )

    /*
    console.log( `1${this.base} ${Parser.signal( fromInfo.operator )} ${fromInfo.value} = 1${from}` )
    console.log( `1${this.base} ${Parser.signal( toInfo.operator )} ${toInfo.value} = 1${to}` )
    console.log(
      `${fromCalc}${this.base} ${Parser.signal( toInfo.operator, true && !toInfo.unreverse )} ${toInfo.value} = x`
    )
    console.log( `${value}${from} = ${fromCalc}${this.base}` )
    console.log( `${fromCalc}${this.base} = ${value}${from} = ${toCalc}${to}` )
    */
  
    return toCalc
  }

  public compile = () => this.execute
}

namespace Parser {
  export type Calc = ( value: number ) => number
  export type Operators = 'divide' | 'multiply' | 'sum' | 'subtraction'
}

export = Parser

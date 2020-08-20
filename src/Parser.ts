import { Units, Unit } from './System'
import SystemUnit from './SystemUnit'

class Parser<U extends Units> {
  private __units: { [K in Unit<U>]: {
    operator: Parser.Operators
    value: number
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

  public add = ( unit: Unit<U>, operator: Parser.Operators, value: number ) => {
    this.__units[unit] = { operator, value }

    return this
  }

  public execute: SystemUnit.Parser<U> = ( value, fromUnit, toUnit ) => {
    const from = Object.assign( this.__units[fromUnit], { unit: fromUnit, current: value } )
    const to = Object.assign( this.__units[toUnit], { unit: toUnit } )

    const fromCalc = Parser.calc( value, from.operator, from.value, true )
    const toCalc = Parser.calc( fromCalc, to.operator, to.value )

    // console.log( `${value}${from.unit} = ${fromCalc}${this.base} = ${toCalc}${to.unit}` )

    return toCalc
  }

  public compile = () => this.execute
}

namespace Parser {
  export type Calc = ( value: number ) => number
  export type Operators = 'divide' | 'multiply' | 'sum' | 'subtraction'
}

export = Parser

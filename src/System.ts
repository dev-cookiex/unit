import Parser from './Parser'
import SystemUnit from './SystemUnit'

class System<U extends System.Units> {
  private static __systems: System<any>[] = []

  public static findBySystemName = ( name: string ) =>
    System.__systems.find( system => system.name === name )

  public static findByUnit = ( unit: string ) =>
    System.__systems.find( system => system.has( unit ) )

  private __units: SystemUnit<U>[] = []
  private __parser: Parser<U> | null = null

  constructor( public name: string, public base: System.Unit<U> ) {
    if ( System.__systems.some( system => system.name === this.name ) ) throw new Error( '' )
    System.__systems.push( this )
  }

  public units = (): System.Unit<U>[] => this.__units.map( unit => unit.unit )

  public has = ( name: string ): name is System.Unit<U> =>
    this.__units.some( unit => unit.unit === name )

  public get = <N extends System.Unit<U>>( name: N ): System.Info<U> =>
    this.__units.map( ( { unit, singular, plural } ) => ( { unit, singular, plural } ) ).find(
      unit => [ unit.unit, unit.plural, unit.singular ].includes( name )
    ) as System.Info<U>

  public get parser() {
    if ( this.__parser ) return this.__parser
    return this.__parser = new Parser<U>( this.base )
  }

  public add = (
    unit: System.Unit<U>,
    singular: string,
    plural: string,
    operator: Parser.Operators,
    value: number
  ) => this.unit( unit, singular, plural, this.parser.add( unit, operator, value ).execute ) // eslint-disable-line

  public unit = (
    unit: System.Unit<U>,
    singular: string,
    plural: string,
    parser = this.parser.execute ) => {
    this.__units.push(
      new SystemUnit( unit, this, singular, plural ).convert( parser )
    )
    return this
  }

  public convert = <T extends System.Unit<U>>( value: number, to: T, unit = this.base ): number => {
    const systemUnit = this.__units.find( unit => unit.unit === to )
    if ( !systemUnit ) throw new Error( `not find unit ${to}` )
    return systemUnit.parser( value, unit, to )
  }
}

namespace System {
  export interface Info<U extends string[]> {
    unit: Unit<U>
    plural: string
    singular: string
  }
  export type Unit<Units extends string[]> = Units extends ( infer U )[] ? U : never
  export interface Units extends Array<string> {}
}

export = System

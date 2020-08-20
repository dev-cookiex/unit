/* eslint-disable prefer-arrow/prefer-arrow-functions */
import System from './System'

import './systems/digital'
import './systems/length'

declare global {
  interface Unit {}
  namespace Unit {
    export interface UnitWithSystem<S extends System<any>> {
      convert( to: S extends System<infer U> ? System.Unit<U> : never ): UnitWithSystem<S>
      unit: S extends System<infer U> ? System.Unit<U> : never
      info: S extends System<infer U> ? System.Info<U> : never
      value: number
    }
    export interface UnitWithoutSystem {}
  }
}

const Unit: Unit = ( value: number, unit?: any ) => {
  const _: any = {
    convert( unit: any ) {
      const system = System.findByUnit( unit )
      if ( !system ) throw new Error( '' )
  
      if ( !this.unit ) this.unit = system.base
  
      if ( !system.has( this.unit ) ) throw new Error( '' )
  
      return Unit( system.convert( this.value, unit, this.unit ), unit )
    },
    toString( verbose = true ) {
      if ( verbose )
        if ( this.value % 1 !== 0 ) return `${this.value} ${this.unit}`
        else if ( this.value === 1 ) return `${this.value} ${this.singular}`
        else return `${this.value} ${this.plural}`
      return `${this.value}${this.unit}`
    },
    value,
  }
  if ( unit ) {
    const system = System.findByUnit( unit )
    if ( !system ) throw new Error( '' )
    Object.assign( _, system.get( unit ) )
  }
  return _
}

interface Unit extends globalThis.Unit {
  ( value: number ): Unit.UnitWithoutSystem
}

namespace Unit {
  export interface UnitWithoutSystem extends globalThis.Unit.UnitWithoutSystem, Partial<System.Info<any>> {
    value: number
  }
  export interface UnitWithSystem<S extends System<any>> extends System.Info<S extends System<infer U> ? U : never> {
    convert( to: S extends System<infer U> ? System.Unit<U> : never ): UnitWithSystem<S>
    value: number
  }
}

export = Unit

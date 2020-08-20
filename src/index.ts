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

const Unit: Unit = ( value: number, unit?: any, __system?: System<any> ) => {
  const _: any = {
    convert( unit: any ) {
      if ( !this.__system ) this.__system = System.findByUnit( unit )
      if ( !this.__system ) throw new Error( '' )
  
      if ( !this.unit ) this.unit = this.__system
  
      if ( !this.__system.has( this.unit ) ) throw new Error( '' )
  
      return Unit(
        this.__system.convert( this.value, unit, this.unit ),
        unit,
        // @ts-ignore
        this.__system
      )
    },
    value,
    __system,
  }
  if ( unit && !_.__system ) {
    _.__system = System.findByUnit( unit )
    if ( !_.__system ) throw new Error( '' )
    Object.assign( _, _.__system.get( unit ) )
  } else if ( unit.__system )
    Object.assign( _, _.__system.get( unit ) )

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

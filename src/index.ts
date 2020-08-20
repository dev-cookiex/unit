/**
 * Copyright (c) CookieX.
 *  
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import System from './System'

export { default as System } from './System'
namespace Base {
  export interface Unit {
    value: number
  }
  export interface WithSystem<S extends System<any>> extends
    Base.Unit,
    System.Info<S extends System<infer U> ? U : never> {
      to( to: S extends System<infer U> ? System.Unit<U> : never ): WithSystem<S>
    }
  export interface WithoutSystem extends Base.Unit, Partial<System.Info<any>> {}
}

declare global {
  namespace Unit {
    export namespace Polymorphism {
      export interface UnitFunction {}
      export interface WithSystem<S extends System<any>> {}
      export interface WithoutSystem {}
    }
    export interface WithSystem<S extends System<any>> extends Polymorphism.WithSystem<S>, Base.WithSystem<S> {}

    export interface WithoutSystem extends Polymorphism.WithoutSystem, Base.WithoutSystem {}
  }
}

interface Unit extends globalThis.Unit.Polymorphism.UnitFunction {
  ( value: number ): globalThis.Unit.WithoutSystem
  <S extends System<any>>(
    value: number,
    unit: ( S extends System<infer U> ? System.Unit<U> : never ) | undefined | null,
    system: S
  ): globalThis.Unit.WithSystem<S>
  load( ...systems: ( 'digital' | 'length' )[] ): void
  use<S extends System<any>>( system: S ): (
    value: number,
    unit?: S extends System<infer U> ? System.Unit<U> : never
  ) => globalThis.Unit.WithSystem<S>
}

const Unit: Unit = ( value: number, unit?: any, __system?: System<any> ) => {
  const _: any = {
    to( unit: any ) {
      if ( !this.__system ) this.__system = System.findByUnit( unit )
      if ( !this.__system ) throw new Error( '' )
  
      if ( !this.unit ) this.unit = this.__system.base
  
      if ( !this.__system.has( this.unit ) ) throw new Error( '' )
  
      return Unit(
        this.__system.convert( this.value, unit, this.unit ),
        unit,
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
  } else if ( unit.__system && unit )
    Object.assign( _, _.__system.get( unit ) )

  return _
}

Unit.load = ( ...systems: ( 'digital' | 'length' )[] ) =>
  systems.forEach( system => require( `./systems/${system}` ) )

Unit.use = <S extends System<any>>( system: S ) =>
  ( value: number, unit?: S extends System<infer U> ? System.Unit<U> : never ) =>
    Unit( value, unit, system )

export default Unit

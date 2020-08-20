/* eslint-disable prefer-arrow/prefer-arrow-functions */
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
  load(): void
}

const Unit: Unit = ( value: number, unit?: any, __system?: System<any> ) => {
  const _: any = {
    to( unit: any ) {
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

Unit.load = ( ...systems: ( 'digital' | 'length' )[] ) =>
  systems.forEach( system => require( `./systems/${system}` ) )

export default Unit

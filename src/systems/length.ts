/**
 * Copyright (c) CookieX.
 *  
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import System from '../System'

const length = new System<length.Units>( 'length', 'm' )
  .add( 'nm', 'Nanometer', 'Nanometers', 'multiply', 1e+9 )
  .add( 'μm', 'Micrometer', 'Micrometers', 'multiply', 1e+6 )
  .add( 'mm', 'Millimeter', 'Millimeters', 'multiply', 1000 )
  .add( 'cm', 'Centimeter', 'Centimeters', 'multiply', 100 )
  .add( 'in', 'Inch', 'Inches', 'multiply', 39.37 )
  .add( 'ft', 'Foot', 'Foots', 'multiply', 3.28084 )
  .add( 'yd', 'Yard', 'Yards', 'multiply', 1.094 )
  .unit( 'm', 'Meter', 'Meters' )
  .add( 'km', 'Kilometer', 'Kilometers', 'divide', 1000 )
  .add( 'mi', 'Mile', 'Miles', 'divide', 1609 )
  .add( 'nMi', 'Nautical mile', 'Nautical miles', 'divide', 1852 )
  .add( 'fathom', 'Fathom', 'Fathoms', 'divide', 1.829 )

namespace length {
  export type Units = [
    'nm',
    'μm',
    'mm',
    'cm',
    'in',
    'ft',
    'yd',
    'm',
    'km',
    'mi',
    'nMi',
    'fathom',
  ]
}

declare global {
  namespace Unit {
    export namespace Polymorphism {
      export interface UnitFunction {
        ( value: number, unity: System.Unit<length.Units> ): Unit.WithSystem<System<length.Units>>
      }
      export interface WithoutSystem {
        to( unity: System.Unit<length.Units> ): Unit.WithSystem<System<length.Units>>
      }
    }
  }
}

export = length

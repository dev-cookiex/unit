import System from '../System'

const length = new System<length.Units>( 'length', 'm' )
  .add( 'ft', 'Foot', 'Foot', 'multiply', 0.3048 )
  .add( 'ft-us', 'Foot', 'Foot', 'multiply', 0.3048006096 )
  .add( 'km', 'Kilometer', 'Kilometers', 'divide', 1000 )
  .add( 'mi', 'Mile', 'Miles', 'divide', 1609 )
  .add( 'nMi', 'Nautical mile', 'Nautical miles', 'divide', 1852 )
  .add( 'fathom', 'Fathom', 'Fathoms', 'divide', 1.829 )
  .add( 'mm', 'Millimeter', 'Millimeters', 'multiply', 1000 )
  .add( 'cm', 'Centimeter', 'Centimeters', 'multiply', 100 )
  .add( 'in', 'Inch', 'Inches', 'multiply', 39.37 )
  .unit( 'm', 'Meter', 'Meters' )

namespace length {
  export type Units = [ 'nMi', 'mi', 'fathom', 'in', 'ft', 'ft-us', 'mm', 'cm', 'm', 'km' ]
}

declare global {
  namespace Unit {
    export interface UnitWithoutSystem {
      convert( to: System.Unit<length.Units> ): Unit.UnitWithSystem<System<length.Units>>
    }
  }
}

export = length

import System from '../System'

const digital = new System<digital.Units>( 'digital', 'B' )
  .add( 'b', 'Bit', 'Bits', 'multiply', 8, true )
  .add( 'kb', 'Kilobit', 'Kilobits', 'divide', 125, true )
  .add( 'kib', 'Kibibit', 'Kibibits', 'divide', 128, true )
  .add( 'Mb', 'Megabit', 'Megabits', 'divide', 125000, true )
  .add( 'Mib', 'Mebibit', 'Mebibits', 'divide', 131072, true )
  .add( 'Gb', 'Gigabit', 'Gigabits', 'divide', 1.25e+8, true )
  .add( 'Gib', 'Gibibit', 'Gibibits', 'divide', 1.342e+8, true )
  .add( 'Tb', 'Terabit', 'Terabits', 'divide', 1.25e+11, true )
  .add( 'Tib', 'Tebibit', 'Tebibits', 'divide', 1.374e+11, true )
  .add( 'Pb', 'Petabit', 'Petabit', 'divide', 1.25e+14, true )
  .add( 'Pib', 'Pebibit', 'Pebibit', 'divide', 1.407e+14, true )

  .unit( 'B', 'Byte', 'Bytes' )
  .add( 'kB', 'Kilobyte', 'Kilobytes', 'multiply', 1000 )
  .add( 'MB', 'Megabyte', 'Megabytes', 'multiply', 1e+6 )
  .add( 'MiB', 'Mebibyte', 'Mebibytes', 'multiply', 1.049e+6 )
  .add( 'GB', 'Gigabyte', 'Gigabytes', 'multiply', 1e+9 )
  .add( 'GiB', 'Gibibyte', 'Gibibytes', 'multiply', 1.074e+9 )
  .add( 'TB', 'Terabyte', 'Terabytes', 'multiply', 1e+12 )
  .add( 'TiB', 'Tebibyte', 'Tebibytes', 'multiply', 1.1e+12 )
  .add( 'PB', 'Petabyte', 'Petabyte', 'multiply', 1e+15 )
  .add( 'PiB', 'Pebibyte', 'Pebibyte', 'multiply', 1.126e+15 )

namespace digital {
  export type Units = [ 'b', 'B', 'kB', 'MB', 'MiB', 'GB', 'GiB', 'TB', 'TiB', 'PB', 'PiB' ]
}

declare global {
  export interface Unit {
    ( value: number, unity: System.Unit<digital.Units> ): Unit.UnitWithSystem<System<digital.Units>>
  }
  namespace Unit {
    export interface UnitWithoutSystem {
      convert( to: System.Unit<digital.Units> ): Unit.UnitWithSystem<System<digital.Units>>
    }
  }
}

export = digital

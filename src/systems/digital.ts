import System from '../System'

const digital = new System<digital.Units>( 'digital', 'B' )
  .add( 'b', 'Bit', 'Bits', 'multiply', 8 )
  .add( 'kb', 'Kilobit', 'Kilobits', 'divide', 125 )
  .add( 'kib', 'Kibibit', 'Kibibits', 'divide', 128 )
  .add( 'Mb', 'Megabit', 'Megabits', 'divide', 125000 )
  .add( 'Mib', 'Mebibit', 'Mebibits', 'divide', 131072 )
  .add( 'Gb', 'Gigabit', 'Gigabits', 'divide', 1.25e+8 )
  .add( 'Gib', 'Gibibit', 'Gibibits', 'divide', 1.342e+8 )
  .add( 'Tb', 'Terabit', 'Terabits', 'divide', 1.25e+11 )
  .add( 'Tib', 'Tebibit', 'Tebibits', 'divide', 1.374e+11 )
  .add( 'Pb', 'Petabit', 'Petabit', 'divide', 1.25e+14 )
  .add( 'Pib', 'Pebibit', 'Pebibit', 'divide', 1.407e+14 )

  .unit( 'B', 'Byte', 'Bytes' )
  .add( 'kB', 'Kilobyte', 'Kilobytes', 'divide', 1000 )
  .add( 'kiB', 'Kibibyte', 'Kibibytes', 'divide', 1024 )
  .add( 'MB', 'Megabyte', 'Megabytes', 'divide', 1e+6 )
  .add( 'MiB', 'Mebibyte', 'Mebibytes', 'divide', 1.049e+6 )
  .add( 'GB', 'Gigabyte', 'Gigabytes', 'divide', 1e+9 )
  .add( 'GiB', 'Gibibyte', 'Gibibytes', 'divide', 1.074e+9 )
  .add( 'TB', 'Terabyte', 'Terabytes', 'divide', 1e+12 )
  .add( 'TiB', 'Tebibyte', 'Tebibytes', 'divide', 1.1e+12 )
  .add( 'PB', 'Petabyte', 'Petabyte', 'divide', 1e+15 )
  .add( 'PiB', 'Pebibyte', 'Pebibyte', 'divide', 1.126e+15 )

namespace digital {
  export type Units = [
    'b',
    'kb', 'kib',
    'Mb', 'Mib',
    'Gb', 'Gib',
    'Tb', 'Tib',
    'Pb', 'Pib',
    
    // 'Eb', 'Eib',
    // 'Zb', 'Zib',
    // 'Yb', 'Yib',

    'B',
    'kB', 'kiB',
    'MB', 'MiB',
    'GB', 'GiB',
    'TB', 'TiB',
    'PB', 'PiB',

    // 'EB', 'EiB',
    // 'ZB', 'ZiB',
    // 'YB', 'YiB',
  ]
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

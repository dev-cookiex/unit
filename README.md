# CookieX Unit

## Install
---
```
yarn add @cookiex/unit
```

## Usage
---
Easy conversion of units.
```ts
import Unit from '@cookiex/unit'

Unit.load( 'digital', 'length' )

// default unit for digital system is Byte
Unit( 1024 ).to( 'KiB' ) === Unit( 1024, 'B' ).to( 'KiB' )
// --> true

// default unit for length system is meters
Unit( 1000 ).to( 'km' ) === Unit( 1000, 'm' ).to( 'km' )
// --> true

Unit( 28, 'B' ).to( 'km' )
// throw Error for incompatibility of systems
```

### Custom System:
```ts
import Unit, { System } from '@cookiex/unit'

const custom = new System( 'unique name', 'default' )

custom.unit( 'default', 'singular', 'plural' )
custom.add( 'one', 'one', 'ones', 'multiply', 10 )
custom.add( 'two', 'two', 'twos', 'divide', 5 )

Unit( 10, 'two' ).to( 'one' ).value
// --> 500 one's
```

### Unregistred system:
```ts
import Unit, { System } from '@cookiex/unit'
const unregistredSystem = new System( 'some system', 'default', false )

// ...system units sets

const unit = Unit.use( unregistredSystem )
unit( 10, 'one' ).to( 'two' ).value
// --> 5 two's
```

### Typescript:
```ts
const custom = new System<custom.Units>( 'unique name', 'default' )

// ...system units sets

namespace custom {
  export type Units = [ 'default', 'one', 'two' ]
}

declare global {
  namespace Unit {
    export namespace Polymorphism {
      export interface UnitFunction {
        ( value: number, unit: System.Unit<custom.Units> ):
          Unit.WithSystem<System<custom.Units>>
      }
      export interface WithoutSystem {
        to( unit: System.Unit<custom.Units> ):
          Unit.WithSystem<System<custom.Units>>
      }
    }
  }
}
```

## License
---
CookieX Unit is [MIT Licensed](https://github.com/dev-cookiex/unit/blob/main/LICENSE)
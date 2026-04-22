import * as migration_20260210_010436 from './20260210_010436';
import * as migration_20260210_014300 from './20260210_014300';
import * as migration_20260210_020951 from './20260210_020951';
import * as migration_20260226_002903 from './20260226_002903';
import * as migration_20260303_235430 from './20260303_235430';
import * as migration_20260308_040338 from './20260308_040338';
import * as migration_20260309_024810 from './20260309_024810';
import * as migration_20260310_021147 from './20260310_021147';
import * as migration_20260310_022314 from './20260310_022314';
import * as migration_20260405_002252 from './20260405_002252';
import * as migration_20260407_001946 from './20260407_001946';
import * as migration_20260407_215602 from './20260407_215602';

export const migrations = [
  {
    up: migration_20260210_010436.up,
    down: migration_20260210_010436.down,
    name: '20260210_010436',
  },
  {
    up: migration_20260210_014300.up,
    down: migration_20260210_014300.down,
    name: '20260210_014300',
  },
  {
    up: migration_20260210_020951.up,
    down: migration_20260210_020951.down,
    name: '20260210_020951',
  },
  {
    up: migration_20260226_002903.up,
    down: migration_20260226_002903.down,
    name: '20260226_002903',
  },
  {
    up: migration_20260303_235430.up,
    down: migration_20260303_235430.down,
    name: '20260303_235430',
  },
  {
    up: migration_20260308_040338.up,
    down: migration_20260308_040338.down,
    name: '20260308_040338',
  },
  {
    up: migration_20260309_024810.up,
    down: migration_20260309_024810.down,
    name: '20260309_024810',
  },
  {
    up: migration_20260310_021147.up,
    down: migration_20260310_021147.down,
    name: '20260310_021147',
  },
  {
    up: migration_20260310_022314.up,
    down: migration_20260310_022314.down,
    name: '20260310_022314',
  },
  {
    up: migration_20260405_002252.up,
    down: migration_20260405_002252.down,
    name: '20260405_002252',
  },
  {
    up: migration_20260407_001946.up,
    down: migration_20260407_001946.down,
    name: '20260407_001946',
  },
  {
    up: migration_20260407_215602.up,
    down: migration_20260407_215602.down,
    name: '20260407_215602'
  },
];

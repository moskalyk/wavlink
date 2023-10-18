# xlink
xlink is a multi-chain random ttl oracle sourced from a list of networks from sequence. you input your specs for number of things to choose from and network composition, and it returns a sequence of random by space numbers.

### To install dependencies:

```bash
bun i
```

To run:

```bash
bun start
```

### to run

```ts
import { Xlink } from './index';

(async () => {
    const xlink = new Xlink({env: 'standard'})
    console.log(await xlink.sequence({count: 10, memeCount: 39}))
    /* results on repeat runs -> differentenough
        [
            30, 5, 26, 36, 20,
            11, 0, 20, 12,  0
        ]
        ...
        [
            17, 36, 28, 25, 33,
            36, 24, 14, 23, 13
        ]
        ...
        [
            6, 26, 36, 16, 32,
            38, 17, 27,  4,  3
        ]
    */
})()
```

### mixes
* `standard`: 19 
* `*`: 1

### future
add networks, protocols, & mixes
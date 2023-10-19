# wavlink
xlink is a multi-chain random ttl oracle sourced from a list of networks from sequence. you input your specs for number of things to choose from and network composition, and it returns a sequence of random by space numbers.

# audio variant randomness
has the ability to inter-weave audio spacing of volume peaks in audio when conducting ttls

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
import { Wavlink } from './index';

(async () => {
    const wavlink = new Wavlink({env: 'standard'})
    console.log(await wavlink.sequence({ length: 10, memeCount: 39, audio: false }))
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
* `standard`: 15 
* `*`: 1
* `alphanumeric`: 15
* `ratchet`: 6
* `surfer`: 2
* `goerli`: 3
* `L1`: 5
* `L2`: 5
* `mecha`: 4

### example entropies on 100 runs each
```
┌──────────────────────────────┬──────────────────────────────┐
│ Mix                          │ Entropy (ms)                 │
├──────────────────────────────┼──────────────────────────────┤
│ standard                     │ 3.315219573767596            │
├──────────────────────────────┼──────────────────────────────┤
│ goerli                       │ 3.281590777009415            │
├──────────────────────────────┼──────────────────────────────┤
│ *                            │ 3.2809089066934245           │
├──────────────────────────────┼──────────────────────────────┤
│ alphanumeric                 │ 3.2802335380594907           │
├──────────────────────────────┼──────────────────────────────┤
│ ratchet                      │ 3.213081203439246            │
├──────────────────────────────┼──────────────────────────────┤
│ surfer                       │ 3.1775001052048713           │
├──────────────────────────────┼──────────────────────────────┤
│ L2                           │ 3.17056474381591             │
├──────────────────────────────┼──────────────────────────────┤
│ mecha                        │ 3.123446839461508            │
├──────────────────────────────┼──────────────────────────────┤
│ L1                           │ 3.118829415571001            │
└──────────────────────────────┴──────────────────────────────┘
```
### future
add networks, protocols, & mixes
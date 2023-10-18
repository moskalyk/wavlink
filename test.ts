import { Wavlink } from './index';

(async () => {
    // test: standard
    // const xlink_1 = new Xlink({env: 'standard'})
    // console.log(await xlink_1.sequence({length: 10, memeCount: 39}))
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

    // test: using custom network sequence
    // const xlink_2 = new Xlink({custom: ['polygon','arbitrum','base']})
    // console.log(await xlink_2.sequence({length: 5, memeCount: 20}))

    // test: with audio
    console.log(await ( new Wavlink({ env: 'mecha' }))
        .sequence({ 
            length: 12, 
            memeCount: 22, 
            audio: true 
        })
    )
})()
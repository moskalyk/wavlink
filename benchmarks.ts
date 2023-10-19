import { Wavlink } from './index';
import Table from 'cli-table';

(async () => {
    // test: with audio
    var balanceTable = new Table({
        head: ['Mix', 'Entropy (ms)']
        , colWidths: [30, 30]
    });

    const mixes = [
        'standard',
        '*', 
        'alphanumeric', 
        'ratchet',
        'surfer', 
        'goerli', 
        'L1',
        'L2',
        'mecha',
    ];

    const cycles = mixes.length
    const entropies: any = []
    for(let i = 0; i < cycles; i++){
        const wl = new Wavlink({ env: mixes[i] })
        let entropy = 0
        let j = 0;
        while(j < 10){
            entropy +=
                wl.entropy(
                    await wl.sequence({ 
                        length: 9, 
                        memeCount: 22, 
                        audio: false 
                    })
                )
            j++
        }
        entropies.push(entropy / 10)
    }

    // Pair each mix with its corresponding entropy
    const pairedArray = mixes.map((mix, index) => ({
        mix,
        entropy: entropies[index]
    }));

    // Sort the paired array based on entropy values
    pairedArray.sort((a, b) => b.entropy - a.entropy);

    // Extract the sorted mixes
    const sortedMixes = pairedArray.map(item => item.mix);
    const sortedEntropies = pairedArray.map(item => item.entropy);


    for(let i = 0; i < cycles; i++){
        balanceTable.push([sortedMixes[i], `${sortedEntropies[i]}`])
    }
    console.log(balanceTable.toString());
})()
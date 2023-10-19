import { ethers } from 'ethers';
import * as fs from 'fs';
import { WaveFile } from 'wavefile';

class Wavlink {
    networks: any;
    peaks: any;

    constructor({ env, custom } : any = { env: 'standard', custom: []}) {
        this.peaks = []
        if(custom) { this.networks = custom }
        else if(env == 'standard') {
            this.networks = [ 
                'mainnet', 
                'polygon', 
                'polygon-zkevm', 
                'arbitrum', 
                'arbitrum-nova', 
                'optimism', 
                'bsc', 
                'avalanche', 
                'base', 
                'goerli', 
                'sepolia', 
                'mumbai', 
                'arbitrum-goerli', 
                'base-goerli', 
                'bsc-testnet'
            ]
        } 
        else if(env == 'alphanumeric'){
            this.networks = ([ 
                'mainnet', 
                'polygon', 
                'polygon-zkevm', 
                'arbitrum', 
                'arbitrum-nova', 
                'optimism', 
                'bsc', 
                'avalanche', 
                'base', 
                'goerli', 
                'sepolia', 
                'mumbai', 
                'arbitrum-goerli', 
                'base-goerli', 
                'bsc-testnet'
            ]).sort()
        }
        else if(env == 'ratchet'){
            this.networks = [ 
                'goerli', 
                'sepolia', 
                'mumbai', 
                'arbitrum-goerli', 
                'base-goerli', 
                'bsc-testnet'
            ]
        }
        else if(env == 'surfer'){
            this.networks = [ 
                'avalanche', 
                'base', 
            ]
        }
        else if(env == 'goerli'){
            this.networks = [ 
                'goerli', 
                'arbitrum-goerli', 
                'base-goerli', 
            ]
        }
        else if(env == 'L1'){
            this.networks = [
                'mainnet',
                'bsc', 
                'avalanche', 
                'base',
                'goerli'
            ]
        }
        else if(env == 'L2'){
            this.networks = [ 
                'polygon', 
                'polygon-zkevm', 
                'arbitrum', 
                'arbitrum-nova',
                'optimism', 
            ]
        }
        else if(env == 'mecha'){
            this.networks = [ 
                'polygon-zkevm', 
                'arbitrum-nova', 
                'base', 
                'bsc'
            ]
        }
        // recipes!
        else {
            this.networks = [
                'mainnet'
            ]
        }
    }

    private async getLatestBlockNumber(chain: string, memeCount: number) {
        const provider = new ethers.providers.JsonRpcProvider(`https://nodes.sequence.app/${chain}`); // Replace with your Infura project ID or your own Ethereum node URL
        let startTime: any, endTime: any;
        
        try {
            startTime = new Date();
            const blockNumber = await provider.getBlockNumber();
            endTime = new Date();
            return Math.round(endTime - startTime) % memeCount;
        } catch (error) {
            console.error('Error getting block number:', error);
        }
    }

    private extractPeaks(waveFile: any, n = 10, neighborhood = 5) {
        console.log('parsing audio file...')
        const samples = waveFile.getSamples(true, Int16Array);
        const peaks = [];

        for (let i = neighborhood; i < samples.length - neighborhood; i++) {
            const before = samples.slice(i - neighborhood, i);
            const after = samples.slice(i + 1, i + 1 + neighborhood);

            const isPeak = samples[i] > Math.max(...before) && samples[i] > Math.max(...after);

            if (isPeak) {
                peaks.push({ index: i, amplitude: samples[i] });
                i += neighborhood;  // Skip the neighborhood after detecting a peak
            }
        }

        const topPeaks = peaks.sort((a, b) => b.amplitude - a.amplitude).slice(0, n);
    
        // Extracting valleys (lowest volumes) between peaks
        // for (let i = 0; i < topPeaks.length - 1; i++) {
        //     const currentPeak = topPeaks[i];
        //     const nextPeak = topPeaks[i + 1];
        //     // console.log(currentPeak)
        //     // console.log(nextPeak)
        //     const sliceBetweenPeaks = samples.slice(currentPeak.index, nextPeak.index);
        //     // console.log(sliceBetweenPeaks)
        //     const minValue = Math.min(...sliceBetweenPeaks); // res <- Breaks.min()
        //     const relativeIndex = sliceBetweenPeaks.indexOf(minValue);
        //     const valleyIndex = currentPeak.index + relativeIndex;
        //     // console.log(valleyIndex)
        //     valleyIndices.push(valleyIndex);
        //     // valleyValues.push(minValue);
        // }

        const sampleRate = waveFile.fmt.sampleRate;
        const timestamps = topPeaks.map(peak => peak.index / sampleRate);
        const lazywave = [...timestamps]; 
        const timeDifferences = []
        for (let i = 0; i < timestamps.length - 1; i++) {
            timeDifferences.push(lazywave[i + 1] - lazywave[i]);
        }

        return timeDifferences;
    }

    private async wait(ms: number) {
        return new Promise((res: any) => {setTimeout(res, ms)})
    }

    isRandom(numbers: any, tolerance = 0.05) {
        let counts: any = {};
        let uniqueNumbers = [...new Set(numbers)];
    
        for (let num of numbers) {
            if (counts[num]) {
                counts[num]++;
            } else {
                counts[num] = 1;
            }
        }
    
        let avgCount = numbers.length / uniqueNumbers.length;
        for (let num of uniqueNumbers) {
            if (Math.abs(counts[num as any] - avgCount) > tolerance * avgCount) {
                return false; // Too much deviation from expected average count
            }
        }
    
        return true;
    }

    entropy(sequence: any) {
        let frequency: any = {};
        let len = sequence.length;
    
        for (let num of sequence) {
            if (frequency[num]) {
                frequency[num]++;
            } else {
                frequency[num] = 1;
            }
        }
    
        let entropy = 0;
        for (let freq in frequency) {
            let p = frequency[freq] / len;
            entropy -= p * Math.log2(p);
        }
    
        return entropy;
    }

    async sequence({ length, memeCount, audio } : any) {
        if(audio){
            if(this.peaks.length == 0) {
                const wavBuffer = fs.readFileSync('./adaptive_biotechnology.wav');
                const waveFile = new WaveFile(wavBuffer);
                this.peaks = this.extractPeaks(waveFile, memeCount)
            }
            const intelligence = []
            let indexComplete = true
            let startTime: any, endTime: any;
            let i = 0;
            while(indexComplete){
                const time = await this.getLatestBlockNumber(this.networks[i % this.networks.length], memeCount);
                intelligence.push(time)
                await this.wait(this.peaks[i]*10)
                i++
                if(i >= length) indexComplete = false
            }
            return intelligence
        }else {
            let intelligence = []
            let indexComplete = true
            let startTime: any, endTime: any;
            let i = 0;
                const promises: any= []
                while(indexComplete){
                    promises.push(this.getLatestBlockNumber(this.networks[i % this.networks.length], memeCount))
                    i++
                    if(i >= length) indexComplete = false
                }
                const results = await Promise.all(promises);
                intelligence = results
            return intelligence
        }
    }
}

export {
    Wavlink
}
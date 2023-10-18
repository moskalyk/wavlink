import { ethers } from 'ethers';
import * as fs from 'fs';
import { WaveFile } from 'wavefile';

class Wavlink {
    networks;

    constructor({ env, custom } : any = { env: 'standard', custom: []}) {
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

    private async getLatestBlockNumber(chain: string) {
        const provider = new ethers.providers.JsonRpcProvider(`https://nodes.sequence.app/${chain}`); // Replace with your Infura project ID or your own Ethereum node URL
        try {
            const blockNumber = await provider.getBlockNumber();
            return blockNumber;
        } catch (error) {
            console.error('Error getting block number:', error);
        }
    }

    private extractPeaks(waveFile: any, n = 10, neighborhood = 5) {
        const samples = waveFile.getSamples(true, Int16Array);
        const peakIndices = [];
    
        for (let i = neighborhood; i < samples.length - neighborhood; i++) {
            const before = samples.slice(i - neighborhood, i);
            const after = samples.slice(i + 1, i + 1 + neighborhood);
    
            const isPeak = samples[i] > Math.max(...before) && samples[i] > Math.max(...after);
    
            if (isPeak) {
                peakIndices.push(i);
                i += neighborhood;  // Skip the neighborhood after detecting a peak
            }
        }
    
        // Sort and retrieve timestamps similarly as before
        const topPeaks = peakIndices.sort((a, b) => samples[b] - samples[a]).slice(0, n);
        const sampleRate = waveFile.fmt.sampleRate;
        const timestamps = topPeaks.map(index => index / sampleRate);
        
        const timeDifferences = [];

        for (let i = 0; i < timestamps.length - 1; i++) {
            timeDifferences.push(timestamps[i + 1] - timestamps[i]);
        }

        return timeDifferences;
    }

    private async wait(ms: number) {
        return new Promise((res: any) => {setTimeout(res, ms)})
    }

    async sequence({ length, memeCount, audio } : any) {
        if(audio){
            const wavBuffer = fs.readFileSync('./adaptive_biotechnology.wav');
            const waveFile = new WaveFile(wavBuffer);
            const peaks = this.extractPeaks(waveFile, memeCount);
            const intelligence = []
            let indexComplete = true
            let startTime: any, endTime: any;
            let i = 0;
            while(indexComplete){
                startTime = new Date();
                const blockNumber = await this.getLatestBlockNumber(this.networks[i % this.networks.length]);
                endTime = new Date();
                intelligence.push(Math.round(endTime - startTime) % memeCount)
                await this.wait(peaks[i]*100)
                i++
                if(i >= length) indexComplete = false
            }
            return intelligence
        }else {
            const intelligence = []
            let indexComplete = true
            let startTime: any, endTime: any;
            let i = 0;
            while(indexComplete){
                startTime = new Date();
                const blockNumber = await this.getLatestBlockNumber(this.networks[i % this.networks.length]);
                endTime = new Date();
                intelligence.push(Math.round(endTime - startTime) % memeCount)
                i++
                if(i >= length) indexComplete = false
            }
            return intelligence
        }
    }
}

export {
    Wavlink
}
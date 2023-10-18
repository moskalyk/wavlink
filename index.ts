import { ethers } from 'ethers';
    
class Xlink {
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

    async sequence({ length, memeCount } : any) {
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

export {
    Xlink
}
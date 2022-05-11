import '@typechain/hardhat'
import '@nomiclabs/hardhat-ethers'
import '@nomiclabs/hardhat-waffle'
import '@nomiclabs/hardhat-etherscan'
import * as dotenv from 'dotenv'

dotenv.config()

const privateKey =
	typeof process.env.PRIVATE_KEY === 'undefined' ? '' : process.env.PRIVATE_KEY

const config = {
	solidity: {
		version: '0.8.9',
		settings: {
			optimizer: {
				enabled: true,
				runs: 200,
			},
		},
	},
	networks: {
		shibuya: {
			url: `https://evm.shibuya.astar.network`,
			accounts: [privateKey],
		},
		astar: {
			url: `https://rpc.astar.network:8545`,
			accounts: [privateKey],
		},
	},
}

export default config

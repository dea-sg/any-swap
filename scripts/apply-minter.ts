/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { ethers } from 'hardhat'
import { AnyswapV6ERC20__factory } from '../typechain-types'

const proxyAddress =
	typeof process.env.PROXY_ADDRESS === 'undefined'
		? ''
		: process.env.PROXY_ADDRESS
const router =
	typeof process.env.ANY_SWAP_ROUTER === 'undefined'
		? ''
		: process.env.ANY_SWAP_ROUTER

async function main() {
	console.log('start')
	const tokenFactory = (await ethers.getContractFactory(
		'AnyswapV6ERC20'
	)) as AnyswapV6ERC20__factory
	const token = tokenFactory.attach(proxyAddress)
	console.log(`token address:${token.address}`)
	await token.applyMinter()
	console.log(`finish to applyMinter`)
	const isMinter = await token.isMinter(router)
	console.log(`isMinter:${isMinter}`)
	const allMinters = await token.getAllMinters()
	console.log(`all minters:${allMinters}`)
}

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error)
		process.exit(1)
	})

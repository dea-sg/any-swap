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
	const [wallet] = await ethers.getSigners()

	console.log('start')
	const tokenFactory = (await ethers.getContractFactory(
		'AnyswapV6ERC20'
	)) as AnyswapV6ERC20__factory
	const token = tokenFactory.attach(proxyAddress)
	console.log(`token address:${token.address}`)
	await token.initialize(
		'DEAPCOIN',
		'DEP',
		18,
		ethers.constants.AddressZero,
		wallet.address
	)
	console.log(`finish to initialize`)
	const name = await token.name()
	console.log(`token name:${name}`)
	const symbol = await token.symbol()
	console.log(`symbol name:${symbol}`)
	const decimals = await token.decimals()
	console.log(`decimals:${decimals}`)
	const vault = await token.vault()
	console.log(`vault:${vault}`)

	await token.initVault(wallet.address)
	console.log(`finish to initVault`)
	const isMinter = await token.isMinter(wallet.address)
	console.log(`isMinter:${isMinter}`)
	const allMinters = await token.getAllMinters()
	console.log(`all minters:${allMinters}`)

	await token.setMinter(router)
	console.log(`finish to setMinter`)
	const pendingMinter = await token.pendingMinter()
	console.log(`pendingMinter:${pendingMinter}`)
	const delayMinter = await token.delayMinter()
	console.log(`delayMinter:${delayMinter.toString()}`)
}

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error)
		process.exit(1)
	})

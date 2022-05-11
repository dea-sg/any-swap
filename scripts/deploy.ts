import { ethers } from 'hardhat'
import {
	Admin__factory,
	UpgradeableProxy__factory,
	AnyswapV6ERC20__factory,
} from '../typechain-types'

async function main() {
	console.log('start')
	const tokenFactory = (await ethers.getContractFactory(
		'AnyswapV6ERC20'
	)) as AnyswapV6ERC20__factory
	const token = await tokenFactory.deploy()
	const adminFactory = (await ethers.getContractFactory(
		'Admin'
	)) as Admin__factory
	const admin = await adminFactory.deploy()
	await admin.deployed()

	const upgradeableProxyFactory = (await ethers.getContractFactory(
		'UpgradeableProxy'
	)) as UpgradeableProxy__factory
	const upgradeableProxy = await upgradeableProxyFactory.deploy(
		token.address,
		admin.address,
		ethers.utils.arrayify('0x')
	)
	await upgradeableProxy.deployed()

	console.log('token address:', token.address)
	console.log('Admin address:', admin.address)
	console.log('UpgradeableProxy address:', upgradeableProxy.address)
}

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error)
		process.exit(1)
	})

// Memo
// npx hardhat run dist/scripts/deploy.js --network shibuya
// token address: 0x630E203C603374675314CcFAF1931Cb507A31F20
// Admin address: 0x08A92A99D993F06161B24C2C192E540DC545464b
// UpgradeableProxy address: 0x673f96F43c0555E21bD3Ac28566298F66264210a

// npx hardhat flatten contracts/AnyswapV6ERC20.sol  > cache/AnyswapV6ERC20.sol
// npx hardhat flatten contracts/Admin.sol  > cache/Admin.sol
// npx hardhat flatten contracts/UpgradeableProxy.sol  > cache/UpgradeableProxy.sol

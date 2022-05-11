/* eslint-disable new-cap */
import { expect, use } from 'chai'
import { solidity } from 'ethereum-waffle'
import { Signer } from 'ethers'
import { deploy, deployProxy, makeSnapshot, resetChain } from './utils'
import { Admin, AnyswapV6ERC20 } from '../typechain-types'
import { ethers } from 'hardhat'

use(solidity)

describe('GuildToken', () => {
	let deployer: Signer
	let token: AnyswapV6ERC20
	let snapshot: string

	before(async () => {
		;[deployer] = await ethers.getSigners()
		const admin = await deploy<Admin>('Admin')
		const tokenInstance = await deploy<AnyswapV6ERC20>('AnyswapV6ERC20')
		const proxy = await deployProxy(
			tokenInstance.address,
			admin.address,
			ethers.utils.arrayify('0x')
		)
		token = tokenInstance.attach(proxy.address)

		await token.initialize(
			'DEAPCOIN',
			'DEP',
			18,
			ethers.constants.AddressZero,
			await deployer.getAddress()
		)
	})
	beforeEach(async () => {
		snapshot = await makeSnapshot()
	})
	afterEach(async () => {
		await resetChain(snapshot)
	})

	describe('name', () => {
		it('name is DEAPCOIN', async () => {
			const tmp = await token.name()
			expect(tmp).to.equal('DEAPCOIN')
		})
	})

	describe('symbol', () => {
		it('name is DEP', async () => {
			const tmp = await token.symbol()
			expect(tmp).to.equal('DEP')
		})
	})

	describe('decimals', () => {
		it('decimals is 18', async () => {
			const tmp = await token.decimals()
			expect(tmp).to.equal(18)
		})
	})

	describe('vault', () => {
		it('vault is deployer', async () => {
			const tmp = await token.vault()
			expect(tmp).to.equal(await deployer.getAddress())
		})
	})

	describe('pendingVault', () => {
		it('pendingVault is deployer', async () => {
			const tmp = await token.pendingVault()
			expect(tmp).to.equal(await deployer.getAddress())
		})
	})

	describe('pendingVault', () => {
		it('pendingVault is deployer', async () => {
			const tmp = await token.pendingVault()
			expect(tmp).to.equal(await deployer.getAddress())
		})
	})

	describe('DOMAIN_SEPARATOR', () => {
		it('check DOMAIN_SEPARATOR', async () => {
			const tmp = await token.DOMAIN_SEPARATOR()
			expect(tmp).to.equal(
				'0xad0161393daeb6d3bc6af607f7862814f8ac2d112c219e2dc79a5e21ddfcdc01'
			)
		})
	})
})

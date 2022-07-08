import * as fs from "fs-extra"
import "dotenv/config"
import { ethers } from "ethers"
;(async function main() {
	//CONSTANTS
	const RPC_URL = process.env.RPC_URL
	const PRIVATE_KEY = process.env.PRIVATE_KEY

	//CONNECTION
	const provider = new ethers.providers.JsonRpcProvider(RPC_URL)
	const signer = new ethers.Wallet(PRIVATE_KEY!, provider)

	//CONTRACT ABI - BYTECODE
	const abi = fs.readFileSync(
		"./SimpleStorage_sol_SimpleStorage.abi",
		"utf-8"
	)
	const bytecode = fs.readFileSync(
		"./SimpleStorage_sol_SimpleStorage.bin",
		"utf-8"
	)

	//DEPLOY CONTRACT
	const contractFactory = new ethers.ContractFactory(abi, bytecode, signer)
	console.log("Deploying, please wait...")
	const contract = await contractFactory.deploy()
	await contract.deployTransaction.wait(1)
	console.log("Contract Address: ", contract.address)

	//INTERACT WITH THE CONTRACT DEPLOYED
	//Get the favorite number calling retrieve function
	const currentFavoriteNumber = await contract.retrieve()
	console.log(`Current Favorite Number: ${currentFavoriteNumber.toString()}`)

	//Update the favorite number calling store function
	const transactionResponse = await contract.store("7")
	await transactionResponse.wait(1)

	//Get the favorite number UPDATED calling retrieve function
	const updatedFavoriteNumber = await contract.retrieve()
	console.log(
		`Current Favorite Number UPDATED: ${updatedFavoriteNumber.toString()}`
	)
})()

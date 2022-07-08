import * as fs from "fs-extra"
import "dotenv/config"
import { ethers } from "ethers"
;(async function main() {
	const signer = new ethers.Wallet(process.env.PRIVATE_KEY!)
	const encryptedJsonKey = await signer.encrypt(
		process.env.PRIVATE_KEY_PASSWORD!,
		process.env.PRIVATE_KEY
	)
	console.log(encryptedJsonKey)
	fs.writeFileSync("./.encryptedKey.json", encryptedJsonKey)
})()

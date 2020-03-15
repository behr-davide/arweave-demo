require("dotenv").config();
const jwk = require(process.env.JWKPATH);
const Arweave = require("arweave/node");
const fs = require("fs");
const mp3File = fs.readFileSync("./assets/mpthreetest.mp3");

const instance = Arweave.init({
  host: "arweave.net",
  protocol: "https"
});

async function submitSongToArweave() {
  let trx = await instance.createTransaction(
    {
      data: Buffer.from(mp3File)
    },
    jwk
  );

  trx.addTag("Content-Type", "audio/mpeg");
  trx.addTag("song", "mpthreetest");

  await instance.transactions.sign(trx, jwk);
  console.log(trx);

  const response = await instance.transactions.post(trx);
  console.log(response.status);
}

submitSongToArweave();

const { getOutboundBlobClient } = require('../storage')
const createFilename = require('./create-filename')

const publish = (pdfDoc, statement, timestamp, type) => {
  const filename = createFilename(statement, timestamp, type)
  return new Promise((resolve, reject) => {
    const chunks = []
    pdfDoc.on('data', chunk => chunks.push(chunk))
    pdfDoc.on('end', async () => {
      try {
        await uploadToStorage(chunks, filename)
        resolve(filename)
      } catch (err) {
        reject(err instanceof Error ? err : new Error(err))
      }
    })
    pdfDoc.on('error', (err) => reject(err instanceof Error ? err : new Error(err)))
    pdfDoc.end()
  })
}

const uploadToStorage = async (chunks, filename) => {
  const result = Buffer.concat(chunks)
  const blobClient = await getOutboundBlobClient(filename)
  await blobClient.upload(result, result.length)
  console.log(`Generated document: ${filename}`)
  return blobClient
}

module.exports = publish

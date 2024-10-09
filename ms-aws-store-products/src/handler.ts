'use strict'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

require('dotenv').config()

const { MongoClient } = require('mongodb')
const uri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PW}@cluster0.qtzr3.mongodb.net/?retryWrites=true&w=majority`
const client = new MongoClient(uri)

console.log('process.env.MONGO_USERNAME', process.env.MONGO_USERNAME)

if (!process.env.MONGO_USERNAME) {
  console.log('process.env.MONGO_USERNAME is not defined')
}

console.log('process.env.MONGO_PW', process.env.MONGO_PW)

if (!process.env.MONGO_PW) {
  console.log('process.env.MONGO_PW is not defined')
}

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    await client.connect()

    const db = client.db(process.env.MONG_DB_NAME)
    const collection = db.collection('products')
    const products = await collection.find({}).toArray()

    return {
      statusCode: 200,
      body: `products: ${products.length}`
    }
  } catch (error) {
    console.log(error)
    return {
      statusCode: 400,
      body: JSON.stringify(error)
    }
  } finally {
    await client.close()
  }
}

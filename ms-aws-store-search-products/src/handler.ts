'use strict'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

require('dotenv').config()

const { MongoClient } = require('mongodb')
const uri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PW}@cluster0.qtzr3.mongodb.net/?retryWrites=true&w=majority`
const client = new MongoClient(uri)

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    await client.connect()

    const { prices } = event.queryStringParameters || {}

    let query = {}

    if (prices && prices.length) {
      const params = prices.replace(/ /g, '').replace('$', '').replace('$', '').split('-')

      if (params.length === 2) {
        const [min, max] = params
        Object.assign(query, {
          prices: {
            $gte: parseInt(min),
            $lte: parseInt(max)
          }
        })
      }

      if (params.length === 1) {
        const [min] = params
        Object.assign(query, {
          prices: {
            $gte: parseInt(min)
          }
        })
      }
    }

    const db = client.db(process.env.MONG_DB_NAME)
    const collection = db.collection('products')
    const products = await collection.find(query).toArray()

    return {
      statusCode: 200,
      body: products
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

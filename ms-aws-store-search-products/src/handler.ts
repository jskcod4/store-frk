'use strict'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

require('dotenv').config()

const { MongoClient } = require('mongodb')
const uri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PW}@cluster0.qtzr3.mongodb.net/?retryWrites=true&w=majority`
const client = new MongoClient(uri)

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    await client.connect()

    console.log('event', event)

    const { prices } = event.queryStringParameters || {}

    let query = {}

    console.log('prices', prices)

    if (prices && prices.length) {
      const params = prices.replace(/ /g, '').replace('$', '').replace('$', '').split('-')

      console.log('params', params)
      if (params.length === 2) {
        const [min, max] = params
        Object.assign(query, {
          price: {
            $gte: parseInt(min, 10),
            $lte: parseInt(max, 10)
          }
        })
      }

      if (params.length === 1) {
        const [min] = params
        Object.assign(query, {
          price: {
            $gte: parseInt(min, 10)
          }
        })
      }
    }

    console.log('query', query)
    const db = client.db(process.env.MONG_DB_NAME)
    const collection = db.collection('products')
    const products = await collection.find(query).toArray()

    return {
      statusCode: 200,
      body: JSON.stringify(products)
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

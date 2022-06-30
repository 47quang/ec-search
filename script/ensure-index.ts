import dotenv from 'dotenv';
import _ from 'lodash';
dotenv.config();

import { recipeIndexMapping } from './indexes/recipe.constant';
import { Client } from '@elastic/elasticsearch';

const elasticsearch = new Client({
  node: process.env.ELASTICSEARCH_ENDPOINT || 'http://localhost:9200',
});

const indices = [recipeIndexMapping];

const main = async () => {
  for (const indexMapping of indices) {
    const index = _.get(indexMapping, 'index', '');
    const response = elasticsearch.indices.exists({ index });
    const statusCode = _.get(response, 'statusCode');

    // validate index and create if not any
    if (statusCode !== 404) {
      console.log(`--${index} INDEX IS CREATED--`);
    }

    await elasticsearch.indices.create(indexMapping);
    console.log('--CREATE ${index} INDEX--');
  }
};

main().catch((error) => console.log(error.stack));

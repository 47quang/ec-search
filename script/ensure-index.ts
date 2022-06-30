import * as dotenv from 'dotenv';
import * as _ from 'lodash';
import { recipeIndexMapping } from './indexes/recipe.constant';
import { Client } from '@elastic/elasticsearch';

dotenv.config({ path: __dirname + '/.env.development' });
const endpoint = process.env.ELASTICSEARCH_ENDPOINT || 'http://localhost:9200';
const elasticsearch = new Client({ node: endpoint, auth: null });

const indices = [recipeIndexMapping];

const main = async () => {
  for (const indexMapping of indices) {
    const index = _.get(indexMapping, 'index', '');
    const response = await elasticsearch.indices.exists({ index });
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

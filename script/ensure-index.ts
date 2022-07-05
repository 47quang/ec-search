import * as dotenv from 'dotenv';
import * as fs from 'fs';
dotenv.config({ path: __dirname + '/.env.development' });

import * as _ from 'lodash';
import * as yargs from 'yargs';
import { recipeIndexMapping } from './indexes/recipe.constant';
import { tagIndexMapping } from './indexes/tag.constant';
import { Client } from '@elastic/elasticsearch';

const endpoint = process.env.ELASTICSEARCH_ENDPOINT || 'http://localhost:9200';
/**
 * we define two params, -c and -o
 * -c: clean up all index
 * -o: overwrite index if any
 */
const args = yargs.argv;
const elasticsearch = new Client({ node: endpoint, auth: null });
const recipeJSON = JSON.parse(fs.readFileSync(__dirname + '/json/recipe.json').toString());
const tagJSON = JSON.parse(fs.readFileSync(__dirname + '/json/tag.json').toString());
const indices: any = [
  { _i: recipeIndexMapping, _d: recipeJSON },
  { _i: tagIndexMapping, _d: tagJSON },
];

const main = async () => {
  const cleanup: any = args.c;
  if (cleanup) {
    let expectedIndices = [];
    if (cleanup === true) {
      // clean up all indices
      expectedIndices = _.map(indices, '_i.index');
    } else if (_.isString(cleanup)) {
      // clean up partial indices
      expectedIndices = cleanup.split(',');
    }

    await cleanupIndices(expectedIndices);
    return;
  }

  const overwrite = args.o;
  await initIndices(!!overwrite);
};

const initIndices = async (overwrite = false) => {
  for (const item of indices) {
    const { _i: indexMapping, _d: docs } = item;
    try {
      const index = _.get(indexMapping, 'index', '');
      const response = await elasticsearch.indices.exists({ index });
      const statusCode = _.get(response, 'statusCode');
      switch (statusCode) {
        case 200: // created
          if (overwrite) {
            await elasticsearch.indices.delete({ index });
            await sleep(1000);
            await elasticsearch.indices.create(indexMapping);
            console.log('Overwrite index ', index);
          } else {
            console.log(`Index ${index} is existed`);
          }
          break;
        case 404: // not existed
          await elasticsearch.indices.create(indexMapping);
          console.log('Create index ', index);
          await sleep(1000);
          if (!docs) break;
          const bulkBody = buildBulkIndex(docs, index);
          await elasticsearch.bulk({
            index,
            refresh: true,
            body: bulkBody,
          });
          break;
        default:
          break;
      }
    } catch (error) {
      console.log('err: ', error.stack);
    }
  }
};

const buildBulkIndex = (docs: any[], index: string) => {
  const bulkBody = [];
  for (const doc of docs) {
    const { id } = doc;
    bulkBody.push({ index: { _index: index, _id: id } });
    bulkBody.push(doc);
  }

  return bulkBody;
};

const cleanupIndices = async (expectedIndices: string[]) => {
  for (const indexMapping of indices) {
    try {
      const index = _.get(indexMapping, 'index', '');
      if (!expectedIndices.includes(index)) {
        continue;
      }
      const response = await elasticsearch.indices.exists({ index });
      const statusCode = _.get(response, 'statusCode');

      if (statusCode === 200) {
        const response = await elasticsearch.indices.delete({ index });
        console.log(`Delete index ${index} `, response);
      }
    } catch (error) {
      console.log('err: ', error.stack);
    }
  }
};

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

main().catch((error) => console.log(error.stack));

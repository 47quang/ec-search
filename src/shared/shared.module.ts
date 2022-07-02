import { Global, Module, Logger, HttpException } from '@nestjs/common';
import { ElasticsearchModule, ElasticsearchService } from '@nestjs/elasticsearch';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from 'src/config/configuration';

@Global()
@Module({
  imports: [
    ElasticsearchModule.registerAsync({
      useFactory: async (configService: ConfigService) => {
        return {
          nodes: configService.get('ELASTICSEARCH_ENDPOINT'),
          auth: null,
        };
      },
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({
      envFilePath: '.env.development',
      load: [configuration],
      isGlobal: true,
    }),
  ],
  exports: [ElasticsearchModule],
})
export class SharedModule {
  constructor(private es: ElasticsearchService) {
    setTimeout(() => {
      this.es
        .ping()
        .then(() => {
          console.log(`Elasticsearch's health is ok`);
        })
        .catch(() => {
          throw new HttpException('Unable to reach Elasticsearch cluster', 500);
        });
    }, 5000);
  }
}

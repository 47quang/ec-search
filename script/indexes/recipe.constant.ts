export const recipeIndexMapping = {
  index: 'ec-recipes',
  body: {
    settings: {
      analysis: {
        char_filter: {
          special_mappingv2: {
            type: 'mapping',
            mappings: [
              "' => _pfssq_",
              '" => _pfsdq_',
              '@ => _pfsat_',
              '# => _pfssh_',
              '$ => _pfsdl_',
              '% => _pfspc_',
              '^ => _pfsca_',
              '& => _pfsan_',
              '* => _pfsas_',
              '+ => _pfspl_',
              ': => _pfsdi_',
              '/ => _pfssl_',
              '- => _',
            ],
          },
        },
        analyzer: {
          prefix_engram_1_30: {
            filter: ['lowercase'],
            type: 'custom',
            tokenizer: 'edgengram_1_30_tokenizer',
          },
          icu_w_symbol_analyzer: {
            filter: ['lowercase'],
            char_filter: ['special_mappingv2'],
            type: 'custom',
            tokenizer: 'icu_tokenizer',
          },
          ngram_search: {
            filter: ['lowercase'],
            tokenizer: 'whitespace',
          },
        },
        tokenizer: {
          edgengram_1_30_tokenizer: {
            token_chars: ['letter', 'digit', 'punctuation', 'symbol'],
            min_gram: '1',
            type: 'edge_ngram',
            max_gram: '30',
          },
        },
      },
    },
    mappings: {
      dynamic: 'false',
      properties: {
        id: {
          type: 'keyword',
        },
        author: {
          properties: {
            id: {
              type: 'keyword',
            },
            name: {
              type: 'text',
            },
            address: {
              type: 'text',
            },
            created_at: {
              type: 'date',
              format: 'date_optional_time',
            },
            updated_at: {
              type: 'date',
              format: 'date_optional_time',
            },
          },
        },
        title: {
          type: 'text',
        },
        thumbnail: {
          type: 'keyword',
        },
        content: {
          type: 'text',
        },
        category: {
          properties: {
            id: {
              type: 'keyword',
            },
            name: {
              type: 'text',
            },
            thumbnail: {
              type: 'keyword',
            },
            created_at: {
              type: 'date',
              format: 'date_optional_time',
            },
            updated_at: {
              type: 'date',
              format: 'date_optional_time',
            },
          },
        },
        tags: {
          type: 'nested',
          properties: {
            id: {
              type: 'keyword',
            },
            name: {
              type: 'text',
              fields: {
                engram: {
                  type: 'text',
                  analyzer: 'prefix_engram_1_30',
                  search_analyzer: 'ngram_search',
                },
              },
              analyzer: 'icu_w_symbol_analyzer',
            },
            type: {
              type: 'keyword',
            },
            created_at: {
              type: 'date',
              format: 'date_optional_time',
            },
            updated_at: {
              type: 'date',
              format: 'date_optional_time',
            },
          },
        },
        nutrition: {
          type: 'text',
        },
        products: {
          type: 'nested',
          properties: {
            id: {
              type: 'keyword',
            },
            name: {
              type: 'text',
            },
            data_source: {
              type: 'keyword',
            },
            data_source_url: {
              type: 'keyword',
            },
            created_at: {
              type: 'date',
              format: 'date_optional_time',
            },
            updated_at: {
              type: 'date',
              format: 'date_optional_time',
            },
          },
        },
        views: {
          type: 'integer',
          null_value: 0,
        },
        search: {
          properties: {
            merged_search: {
              type: 'text',
              // analyzer: 'icu_w_symbol_analyzer',
            },
            tags: {
              type: 'text',
              // analyzer: 'icu_w_symbol_analyzer',
            },
            products: {
              type: 'text',
            },
            content: {
              type: 'text',
            },
            title: {
              type: 'text',
            },
          },
        },
        created_at: {
          type: 'date',
          format: 'date_optional_time',
        },
        updated_at: {
          type: 'date',
          format: 'date_optional_time',
        },
      },
    },
  },
};

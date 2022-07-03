export const recipeIndexMapping = {
  index: 'ec-recipes',
  body: {
    settings: {},
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
              type: 'keyword',
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

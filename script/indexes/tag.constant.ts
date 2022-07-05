export const tagIndexMapping = {
  index: 'ec-tags',
  body: {
    settings: {},
    mappings: {
      dynamic: 'false',
      properties: {
        id: {
          type: 'keyword',
        },
        name: {
          type: 'text',
        },
        type: {
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
  },
};

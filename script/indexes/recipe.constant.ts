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
        userId: {
          type: 'keyword',
        },
        createdAt: {
          type: 'date',
          format: 'date_optional_time',
        },
        updatedAt: {
          type: 'date',
          format: 'date_optional_time',
        },
      },
    },
  },
};

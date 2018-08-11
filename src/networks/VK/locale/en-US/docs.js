export default {
  main_config: {
    h2: 'Basic settings',
    owner_id: {
      name: 'Community ID',
      info: 'Positive number. Empty - current user.'
    },
    count: {
      name: 'Number of documents (from and to), inclusive.'
    },
    type: {
      name: 'Filter',
      items: [
        'All',
        'Text documents',
        'Archives',
        'Gif',
        'Images',
        'Audio',
        'Video',
        'E-books',
        'Unknown'
      ]
    }
  },
  additional_config: {
    h2: 'Additional settings',
    from_ids: {
      name: 'Authors ID',
      info: 'A negative value is the community ID.'
    },
    exts: {
      name: 'Extensions of documents',
      info: 'Without a dot. Example: png, jpg.'
    },
    texts: {
      name: 'Phrases in title'
    },
    indicators: {
      name: 'Indicators',
      items: [
        'File size (bytes)'
      ]
    }
  }
}

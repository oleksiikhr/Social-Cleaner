export default {
  main_config: {
    h2: 'Basic settings',
    owner_id: {
      name: 'Community ID',
      info: 'Positive number. Empty - Current User.'
    },
    count: 'Number of documents (from and to), inclusive.',
    type: {
      name: 'Filter',
      items: ['All', 'Text documents', 'Archives', 'Gif', 'Images', 'Audio', 'Video', 'E-books', 'Unknown']
    }
  },
  additional_config: {
    h2: 'Additional settings',
    from_ids: {
      name: 'Authors ID',
      info: 'Press enter to add to the list. Use a negative value to designate a community ID.'
    },
    exts: {
      name: 'Extensions of documents',
      info: 'Press enter to add to the list. Without a dot. Example: png, jpg.'
    },
    texts: {
      name: 'Phrases in title',
      info: 'After filling, press enter to add to the list.'
    },
    indicators: {
      name: 'Indicators',
      items: ['File size (bytes)']
    }
  }
}

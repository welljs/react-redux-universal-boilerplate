export function load ({limit}) {
  return new Promise (resolve => {
    resolve([
      {
        id: 111,
        name: 'Town house apartment',
        url: 'tow_house_appartment',
        author: {
          name: 'John Doe',
          id: 1
        }
      },
      {
        id: 222,
        name: 'Cottage',
        url: 'cottage',
        author: {
          name: 'Tommy Atkins',
          id: 2
        }
      }
    ]);
  });
}
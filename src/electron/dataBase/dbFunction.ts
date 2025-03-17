import Database from './dbClass.js';
// Tworzymy instancję bazy danych
const db = new Database();

// Przykład wykonania zapytania SELECT
export async function fetchDocuments()  {
  try {
    const rows = await db.all<DictionaryDocuments>('SELECT * FROM DictionaryDocuments');
    console.log("fetchDocuments()", rows);
    return rows || [];
    
  } catch (err) {
    console.error('fetchDocuments() Błąd podczas pobierania dokumentów:');
   return [];
  }

  
};


export const queryToDB = {
 firstMetod: async function fetchDocuments1(): Promise<DictionaryDocuments> {
  // Przykładowe dane dokumentu
  const document: DictionaryDocuments = {
    DocumentId: 1,
    DocumentName: 'Przykładowy dokument',
  };

  // Zwracamy obiekt opakowany w obietnicę
  return Promise.resolve(document);
  },
  secondMetod:async function fetchDocuments2(): Promise<DictionaryDocuments> {
  // Przykładowe dane dokumentu
  const document: DictionaryDocuments = {
    DocumentId: 2,
    DocumentName: 'Przykładowy dokument 2',
  };

  // Zwracamy obiekt opakowany w obietnicę
  return Promise.resolve(document);
  }
}
export async function fetchDocuments1(): Promise<DictionaryDocuments> {
  // Przykładowe dane dokumentu
  const document: DictionaryDocuments = {
    DocumentId: 1,
    DocumentName: 'Przykładowy dokument',
  };

  // Zwracamy obiekt opakowany w obietnicę
  return Promise.resolve(document);
}
export  async function getDataDocuments() {
  const documents = await fetchDocuments();
  console.dir( documents );
  return documents;
}

class CountVectorizer {
  constructor() {
    this.vocabulary = new Map();
    this.words = [];
  }

  /**
   * Simple tokenizer that converts text to lowercase, 
   * removes punctuation and splits by whitespace.
   */
  tokenize(text) {
    return text.toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter(word => word.length > 0);
  }

  /**
   * Learns the vocabulary dictionary of all tokens in the raw documents.
   */
  fit(corpus) {
    const wordSet = new Set();
    corpus.forEach(doc => {
      this.tokenize(doc).forEach(word => wordSet.add(word));
    });

    this.words = Array.from(wordSet).sort();
    this.words.forEach((word, index) => {
      this.vocabulary.set(word, index);
    });
  }

  /**
   * Transforms documents to document-term matrix.
   */
  transform(corpus) {
    return corpus.map(doc => {
      const vector = new Array(this.words.length).fill(0);
      const tokens = this.tokenize(doc);
      tokens.forEach(token => {
        if (this.vocabulary.has(token)) {
          const index = this.vocabulary.get(token);
          vector[index]++;
        }
      });
      return vector;
    });
  }

  /**
   * Learns vocabulary and returns document-term matrix.
   */
  fitTransform(corpus) {
    this.fit(corpus);
    return this.transform(corpus);
  }
}

// Example usage
const corpus = [
  'This is the first document.',
  'This document is the second document.',
  'And this is the third one.',
  'Is this the first document?',
];

const vectorizer = new CountVectorizer();
const X = vectorizer.fitTransform(corpus);

console.log('Vocabulary:', vectorizer.words);
console.log('\nEncoded Vectors:');
X.forEach((vector, i) => {
  console.log(`Doc ${i} ("${corpus[i]}"): [${vector.join(', ')}]`);
});

module.exports = CountVectorizer;
